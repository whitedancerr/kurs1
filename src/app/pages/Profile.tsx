import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router';
import {
  BookOpen,
  Users,
  GraduationCap,
  LogOut,
  Mail,
  UserCircle2,
} from 'lucide-react';
import { TEACHER_STUDENTS } from '../data/mockDatabase';
import { getCourseBySlug } from '../data/coursesCatalog';

function coursesWord(n: number): string {
  const abs = n % 100;
  const d = abs % 10;
  if (abs > 10 && abs < 20) return 'курсов';
  if (d === 1) return 'курс';
  if (d >= 2 && d <= 4) return 'курса';
  return 'курсов';
}

function roleLabel(role: string): string {
  if (role === 'teacher') return 'Преподаватель';
  if (role === 'student') return 'Ученик';
  return 'Гость';
}

function RoleIcon({ role }: { role: string }) {
  if (role === 'teacher') return <GraduationCap className="w-4 h-4" />;
  if (role === 'student') return <BookOpen className="w-4 h-4" />;
  return <UserCircle2 className="w-4 h-4" />;
}

export function Profile() {
  const { user, logout, isAuthenticated, authReady } = useAuth();

  if (!authReady) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-muted-foreground">
        Загрузка профиля…
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    void logout();
  };

  const enrollmentCount = user.enrollments.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-3xl shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl mb-2">{user.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <p className="text-sm text-muted-foreground mb-2">Телефон: {user.phone}</p>
                )}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200 rounded-full text-sm">
                  <RoleIcon role={user.role} />
                  <span>{roleLabel(user.role)}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors self-start"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </div>

        {user.role === 'teacher' && (
          <div className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl">Мои студенты</h2>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {TEACHER_STUDENTS.length} студентов
              </span>
            </div>

            <div className="space-y-4">
              {TEACHER_STUDENTS.map((student) => (
                <div
                  key={student.id}
                  className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="text-right min-w-[140px]">
                        <p className="text-sm text-muted-foreground mb-1">Прогресс</p>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Курсов</p>
                        <p className="text-lg font-medium">{student.enrolledCourses.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(user.role === 'guest' || user.role === 'student') && user.role !== 'teacher' && (
          <div className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-8 space-y-8">
            {user.role === 'guest' && (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6">
                <h3 className="text-lg font-medium mb-2">Вы зарегистрированы как гость</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Чтобы стать учеником, откройте любой курс и нажмите «Записаться на курс». После записи ваш статус изменится на «Ученик», а курсы отобразятся в этом разделе.
                </p>
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl">Мои курсы</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {enrollmentCount} {coursesWord(enrollmentCount)}
                </span>
              </div>

              {user.enrollments.length === 0 ? (
                <p className="text-muted-foreground">
                  Пока нет записей.{' '}
                  <Link to="/courses" className="text-primary hover:underline">
                    Выбрать курс
                  </Link>
                </p>
              ) : (
                <ul className="space-y-4">
                  {user.enrollments.map((e) => {
                    const catalog = getCourseBySlug(e.courseSlug);
                    const title = catalog?.title ?? e.courseSlug;
                    const date = new Date(e.enrolledAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                    return (
                      <li
                        key={e.courseSlug}
                        className="border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-primary transition-colors"
                      >
                        <div className="flex gap-4 min-w-0">
                          {catalog?.image && (
                            <img
                              src={catalog.image}
                              alt=""
                              className="w-28 h-20 object-cover rounded-md shrink-0 border border-border"
                            />
                          )}
                          <div className="min-w-0">
                            <h3 className="text-xl font-medium mb-1 truncate">{title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Запись от {date}
                            </p>
                            {catalog?.instructor && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Преподаватель: {catalog.instructor}
                              </p>
                            )}
                          </div>
                        </div>
                        <Link
                          to={`/courses/${e.courseSlug}`}
                          className="shrink-0 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 text-center"
                        >
                          Открыть курс
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
