import { Link } from 'react-router';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { CourseCard } from '../components/CourseCard';
import { Features } from '../components/Features';
import { COURSES_CATALOG, COURSES_TOTAL } from '../data/coursesCatalog';

export function Home() {
  return (
    <>
      <Hero />

      <Categories />

      <section id="courses-section" className="py-20 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-12">
            <div>
              <h2 className="text-4xl mb-2">Популярные курсы</h2>
              <p className="text-xl text-muted-foreground">
                Подборка из каталога ({COURSES_TOTAL} курсов)
              </p>
            </div>
            <Link
              to="/courses"
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-center shrink-0"
            >
              Все курсы
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES_CATALOG.slice(0, 6).map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>
        </div>
      </section>

      <Features />

      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white dark:from-blue-900 dark:to-indigo-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Начните учиться сегодня</h2>
          <p className="text-xl mb-8 text-blue-100">
            Присоединяйтесь к тысячам студентов на платформе «ВысшийБалл». Доступ к более чем 2500 курсам.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Попробовать бесплатно
          </Link>
        </div>
      </section>
    </>
  );
}
