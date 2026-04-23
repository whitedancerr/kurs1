import type { AppRole, AppUser, EnrollmentRow, RegisterPayload } from '../types/auth';
import { isSupabaseConfigured } from '../../supabase';

const USERS_KEY = 'vysshiy_local_users_v1';
const SESSION_USER_ID_KEY = 'vysshiy_local_session_uid_v1';

type LocalStoredUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  app_role: AppRole;
  enrollments: { courseSlug: string; enrolledAt: string }[];
};

function readUsers(): LocalStoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LocalStoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: LocalStoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toAppUser(u: LocalStoredUser): AppUser {
  let role: AppRole = u.app_role === 'teacher' ? 'teacher' : u.app_role === 'student' ? 'student' : 'guest';
  if (role === 'guest' && u.enrollments.length > 0) {
    role = 'student';
  }
  const enrollments: EnrollmentRow[] = u.enrollments.map((e) => ({
    courseSlug: e.courseSlug,
    enrolledAt: e.enrolledAt,
  }));
  return {
    id: u.id,
    email: u.email,
    name: u.fullName,
    phone: u.phone || null,
    role,
    enrollments,
  };
}

export function localGetSessionUser(): AppUser | null {
  const id = localStorage.getItem(SESSION_USER_ID_KEY);
  if (!id) return null;
  const u = readUsers().find((x) => x.id === id);
  if (!u) {
    localStorage.removeItem(SESSION_USER_ID_KEY);
    return null;
  }
  return toAppUser(u);
}

export function localRegister(
  payload: RegisterPayload
): { ok: true } | { ok: false; error: string } {
  const email = payload.email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { ok: false, error: 'Этот email уже зарегистрирован' };
  }
  const id = crypto.randomUUID();
  const newUser: LocalStoredUser = {
    id,
    email: payload.email.trim(),
    password: payload.password,
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    app_role: 'guest',
    enrollments: [],
  };
  users.push(newUser);
  writeUsers(users);
  localStorage.setItem(SESSION_USER_ID_KEY, id);
  return { ok: true };
}

export function localLogin(
  email: string,
  password: string
): { ok: true; user: AppUser } | { ok: false; error: string } {
  const e = email.trim().toLowerCase();
  const u = readUsers().find((x) => x.email.toLowerCase() === e);
  if (!u || u.password !== password) {
    return { ok: false, error: 'Неверный email или пароль' };
  }
  localStorage.setItem(SESSION_USER_ID_KEY, u.id);
  return { ok: true, user: toAppUser(u) };
}

export function localLogout() {
  localStorage.removeItem(SESSION_USER_ID_KEY);
}

export function localEnroll(
  userId: string,
  courseSlug: string
): { ok: true; user: AppUser } | { ok: false; error: string } {
  const users = readUsers();
  const idx = users.findIndex((x) => x.id === userId);
  if (idx === -1) {
    return { ok: false, error: 'Пользователь не найден' };
  }
  const u = users[idx];
  if (u.enrollments.some((en) => en.courseSlug === courseSlug)) {
    return { ok: false, error: 'Вы уже записаны на этот курс' };
  }
  const enrolledAt = new Date().toISOString();
  const next: LocalStoredUser = {
    ...u,
    app_role: u.app_role === 'teacher' ? 'teacher' : 'student',
    enrollments: [...u.enrollments, { courseSlug, enrolledAt }],
  };
  users[idx] = next;
  writeUsers(users);
  return { ok: true, user: toAppUser(next) };
}

/** Локальная авторизация: без валидного Supabase или при VITE_USE_LOCAL_AUTH=true */
export function resolveLocalAuthMode(): boolean {
  return import.meta.env.VITE_USE_LOCAL_AUTH === 'true' || !isSupabaseConfigured();
}
