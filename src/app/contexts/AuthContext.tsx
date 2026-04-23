import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { Session, User as SupabaseAuthUser } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../../supabase';
import type { AppRole, AppUser, EnrollmentRow, RegisterPayload } from '../types/auth';
import {
  localEnroll,
  localGetSessionUser,
  localLogin,
  localLogout,
  localRegister,
  resolveLocalAuthMode,
} from '../lib/localAuth';

export type { AppRole, AppUser, EnrollmentRow, RegisterPayload } from '../types/auth';

type AuthResult = { ok: true } | { ok: false; error: string };
type RegisterResult =
  | { ok: true; needsEmailConfirm: boolean }
  | { ok: false; error: string };

interface AuthContextType {
  user: AppUser | null;
  authReady: boolean;
  authMode: 'supabase' | 'local';
  login: (email: string, password: string) => Promise<AuthResult>;
  registerWithEmail: (data: RegisterPayload) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  enrollInCourse: (courseSlug: string) => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('load failed')) {
    return 'Нет соединения с сервером Supabase. Проверьте интернет, URL проекта в .env и что проект не на паузе. Либо удалите VITE_SUPABASE_* — тогда включится локальная регистрация в браузере.';
  }
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return 'Неверный email или пароль';
  }
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'Этот email уже зарегистрирован';
  }
  if (m.includes('password')) {
    return 'Пароль не подходит под требования сервиса';
  }
  return message || 'Произошла ошибка';
}

async function ensureProfileRow(sb: NonNullable<ReturnType<typeof getSupabase>>, sbUser: SupabaseAuthUser): Promise<void> {
  const meta = sbUser.user_metadata as Record<string, string | undefined> | undefined;
  const fullName =
    meta?.full_name ?? sbUser.email?.split('@')[0] ?? 'Пользователь';
  const phone = meta?.phone?.trim() || null;

  const { data: existing, error: selErr } = await sb
    .from('profiles')
    .select('id')
    .eq('id', sbUser.id)
    .maybeSingle();

  if (selErr) {
    console.error(selErr);
    return;
  }

  if (!existing) {
    const { error } = await sb.from('profiles').insert({
      id: sbUser.id,
      full_name: fullName,
      phone,
      app_role: 'guest',
    });
    if (error && error.code !== '23505') {
      console.error(error);
    }
  }
}

async function buildAppUser(
  sb: NonNullable<ReturnType<typeof getSupabase>>,
  sbUser: SupabaseAuthUser
): Promise<AppUser> {
  await ensureProfileRow(sb, sbUser);

  const { data: profile, error: profileError } = await sb
    .from('profiles')
    .select('full_name, phone, app_role')
    .eq('id', sbUser.id)
    .maybeSingle();

  if (profileError) {
    console.error(profileError);
  }

  const { data: enrollmentRows, error: enrErr } = await sb
    .from('enrollments')
    .select('course_slug, created_at')
    .eq('user_id', sbUser.id)
    .order('created_at', { ascending: false });

  if (enrErr) {
    console.error(enrErr);
  }

  const enrollments: EnrollmentRow[] = (enrollmentRows ?? []).map((row) => ({
    courseSlug: row.course_slug as string,
    enrolledAt: row.created_at as string,
  }));

  let role = (profile?.app_role as AppRole) ?? 'guest';
  if (role === 'guest' && enrollments.length > 0) {
    role = 'student';
    await sb
      .from('profiles')
      .update({ app_role: 'student' })
      .eq('id', sbUser.id)
      .eq('app_role', 'guest');
  }

  const name =
    profile?.full_name ??
    (sbUser.user_metadata as { full_name?: string })?.full_name ??
    sbUser.email?.split('@')[0] ??
    'Пользователь';

  return {
    id: sbUser.id,
    email: sbUser.email ?? '',
    name,
    phone: profile?.phone ?? null,
    role,
    enrollments,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const localMode = resolveLocalAuthMode();
  const authMode: 'supabase' | 'local' = localMode ? 'local' : 'supabase';

  const loadFromSession = useCallback(async (session: Session | null) => {
    const sb = getSupabase();
    if (!sb) {
      setUser(null);
      return;
    }
    if (!session?.user) {
      setUser(null);
      return;
    }
    try {
      const appUser = await buildAppUser(sb, session.user);
      setUser(appUser);
    } catch (e) {
      console.error(e);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (localMode) {
      setUser(localGetSessionUser());
      setAuthReady(true);
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      setAuthReady(true);
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const { data } = await sb.auth.getSession();
        if (!cancelled) {
          await loadFromSession(data.session);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setAuthReady(true);
      }
    })();

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange(async (_event, session) => {
      await loadFromSession(session);
      setAuthReady(true);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [localMode, loadFromSession]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      if (localMode) {
        const r = localLogin(email, password);
        if (!r.ok) return r;
        setUser(r.user);
        return { ok: true };
      }

      const sb = getSupabase();
      if (!sb) {
        return { ok: false, error: 'Режим Supabase недоступен' };
      }
      try {
        const { data, error } = await sb.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          return { ok: false, error: mapAuthError(error.message) };
        }
        if (data.user) {
          const appUser = await buildAppUser(sb, data.user);
          setUser(appUser);
        }
        return { ok: true };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { ok: false, error: mapAuthError(msg) };
      }
    },
    [localMode]
  );

  const registerWithEmail = useCallback(
    async (payload: RegisterPayload): Promise<RegisterResult> => {
      if (localMode) {
        const r = localRegister(payload);
        if (!r.ok) return r;
        const u = localGetSessionUser();
        if (u) setUser(u);
        return { ok: true, needsEmailConfirm: false };
      }

      const sb = getSupabase();
      if (!sb) {
        return { ok: false, error: 'Режим Supabase недоступен' };
      }

      try {
        const { data, error } = await sb.auth.signUp({
          email: payload.email.trim(),
          password: payload.password,
          options: {
            data: {
              full_name: payload.fullName.trim(),
              phone: payload.phone.trim(),
            },
          },
        });

        if (error) {
          return { ok: false, error: mapAuthError(error.message) };
        }

        if (data.user && data.session) {
          await sb.from('profiles').upsert(
            {
              id: data.user.id,
              full_name: payload.fullName.trim(),
              phone: payload.phone.trim() || null,
              app_role: 'guest',
            },
            { onConflict: 'id' }
          );
          const appUser = await buildAppUser(sb, data.user);
          setUser(appUser);
        }

        const needsEmailConfirm = !data.session;
        return { ok: true, needsEmailConfirm };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { ok: false, error: mapAuthError(msg) };
      }
    },
    [localMode]
  );

  const logout = useCallback(async () => {
    if (localMode) {
      localLogout();
      setUser(null);
      return;
    }
    const sb = getSupabase();
    if (sb) {
      await sb.auth.signOut();
    }
    setUser(null);
  }, [localMode]);

  const refreshUser = useCallback(async () => {
    if (localMode) {
      setUser(localGetSessionUser());
      return;
    }
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.auth.getUser();
    if (data.user) {
      const appUser = await buildAppUser(sb, data.user);
      setUser(appUser);
    } else {
      setUser(null);
    }
  }, [localMode]);

  const enrollInCourse = useCallback(
    async (courseSlug: string): Promise<AuthResult> => {
      if (localMode) {
        const u = localGetSessionUser();
        if (!u) {
          return { ok: false, error: 'Войдите в аккаунт, чтобы записаться на курс' };
        }
        const r = localEnroll(u.id, courseSlug);
        if (!r.ok) return r;
        setUser(r.user);
        return { ok: true };
      }

      const sb = getSupabase();
      if (!sb) {
        return { ok: false, error: 'Режим Supabase недоступен' };
      }
      try {
        const { data: authData, error: authErr } = await sb.auth.getUser();
        if (authErr || !authData.user) {
          return { ok: false, error: 'Войдите в аккаунт, чтобы записаться на курс' };
        }

        const uid = authData.user.id;
        const { error } = await sb.from('enrollments').insert({
          user_id: uid,
          course_slug: courseSlug,
        });

        if (error) {
          if (error.code === '23505') {
            return { ok: false, error: 'Вы уже записаны на этот курс' };
          }
          return { ok: false, error: mapAuthError(error.message) };
        }

        await sb
          .from('profiles')
          .update({ app_role: 'student' })
          .eq('id', uid)
          .eq('app_role', 'guest');

        const appUser = await buildAppUser(sb, authData.user);
        setUser(appUser);
        return { ok: true };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { ok: false, error: mapAuthError(msg) };
      }
    },
    [localMode]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        authMode,
        login,
        registerWithEmail,
        logout,
        enrollInCourse,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth можно использовать только внутри AuthProvider');
  }
  return context;
}
