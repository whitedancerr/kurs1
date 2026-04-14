import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router';
import { BookOpen, Users, GraduationCap, LogOut, Mail, Award, Clock } from 'lucide-react';
import { TEACHER_STUDENTS, STUDENT_COURSES } from '../data/mockDatabase';

export function Profile() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-3xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl mb-2">{user.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {user.role === 'teacher' ? (
                    <>
                      <GraduationCap className="w-4 h-4" />
                      <span>Преподаватель</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Студент</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </div>

        {/* Teacher View */}
        {user.role === 'teacher' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Прогресс</p>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
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

        {/* Student View */}
        {user.role === 'student' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl">Мои курсы</h2>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {STUDENT_COURSES.length} курс
              </span>
            </div>

            <div className="space-y-6">
              {STUDENT_COURSES.map((course) => (
                <div
                  key={course.id}
                  className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl mb-2">{course.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                      <Award className="w-5 h-5" />
                      <span className="font-medium">{course.progress}% завершено</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Общий прогресс</span>
                      <span className="text-sm font-medium">
                        {course.completedLessons} из {course.totalLessons} уроков
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Следующий урок:</span>
                    </div>
                    <span className="text-sm font-medium">{course.nextLesson}</span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      Продолжить обучение
                    </button>
                    <button className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
                      Просмотреть программу
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-medium text-primary mb-1">
                  {STUDENT_COURSES[0].completedLessons}
                </div>
                <div className="text-sm text-muted-foreground">Уроков завершено</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-primary mb-1">
                  {STUDENT_COURSES[0].totalLessons - STUDENT_COURSES[0].completedLessons}
                </div>
                <div className="text-sm text-muted-foreground">Уроков осталось</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-primary mb-1">
                  {STUDENT_COURSES.length}
                </div>
                <div className="text-sm text-muted-foreground">Активных курсов</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
