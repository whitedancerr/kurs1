export type AppRole = 'guest' | 'student' | 'teacher';

export interface EnrollmentRow {
  courseSlug: string;
  enrolledAt: string;
}

export interface AppUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: AppRole;
  enrollments: EnrollmentRow[];
}

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};
