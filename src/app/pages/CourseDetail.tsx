import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Clock, Star, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { getCourseBySlug } from '../data/coursesCatalog';
import { useAuth } from '../contexts/AuthContext';

export function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = getCourseBySlug(slug);
  const { isAuthenticated, enrollInCourse, user, authReady } = useAuth();
  const [enrolling, setEnrolling] = useState(false);

  const isEnrolled =
    Boolean(course) &&
    Boolean(user?.enrollments.some((e) => e.courseSlug === course!.slug));

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4">Курс не найден</h1>
        <p className="text-muted-foreground mb-8">
          Проверьте ссылку или вернитесь на главную.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!authReady) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${course.slug}` } });
      return;
    }
    if (isEnrolled) {
      toast.info('Вы уже записаны на этот курс');
      return;
    }
    setEnrolling(true);
    const result = await enrollInCourse(course.slug);
    setEnrolling(false);
    if (result.ok) {
      toast.success('Вы записаны на курс. В профиле статус: ученик.');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="bg-background">
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все курсы
          </Link>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm">
            {course.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-medium mb-4">{course.title}</h1>

        <p className="text-muted-foreground mb-6">
          Преподаватель: <span className="text-foreground">{course.instructor}</span>
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-foreground font-medium">{course.rating}</span>
            <span>рейтинг</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students} студентов</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="text-2xl text-primary font-medium">{course.price}</div>
        </div>

        <div className="rounded-xl overflow-hidden border border-border mb-10">
          <img
            src={course.image}
            alt={course.title}
            className="w-full max-h-[420px] object-cover"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {course.gallery.map((src, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden border border-border aspect-video"
            >
              <img src={src} alt={`${course.title} — фото ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-xl font-medium mb-3">О курсе</h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </section>
            <section>
              <h2 className="text-xl font-medium mb-3">Что вы изучите</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {course.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="text-3xl text-primary font-medium">{course.price}</div>
              {isEnrolled ? (
                <>
                  <p className="text-sm text-muted-foreground text-center">
                    Вы записаны на этот курс.
                  </p>
                  <Link
                    to="/profile"
                    className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Открыть профиль
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleEnroll()}
                  disabled={enrolling || !authReady}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {!authReady
                    ? 'Загрузка…'
                    : enrolling
                      ? 'Запись…'
                      : isAuthenticated
                        ? 'Записаться на курс'
                        : 'Войти и записаться'}
                </button>
              )}
              <p className="text-xs text-muted-foreground text-center">
                После записи вы получите статус ученика; данные сохраняются в вашем аккаунте.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
