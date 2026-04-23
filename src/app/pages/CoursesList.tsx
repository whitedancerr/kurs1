import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CourseCard } from '../components/CourseCard';
import {
  COURSES_PAGE_SIZE,
  COURSES_TOTAL,
  getCoursesPage,
  getCoursesTotalPages,
} from '../data/coursesCatalog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CoursesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = parseInt(searchParams.get('page') ?? '1', 10);
  const totalPages = getCoursesTotalPages();
  const page = Number.isFinite(rawPage) ? Math.min(Math.max(1, rawPage), totalPages) : 1;

  useEffect(() => {
    if (!Number.isFinite(rawPage) || rawPage < 1 || rawPage > totalPages) {
      setSearchParams(page <= 1 ? {} : { page: String(page) }, { replace: true });
    }
  }, [rawPage, page, totalPages, setSearchParams]);

  const slice = getCoursesPage(page);

  const setPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setSearchParams(next === 1 ? {} : { page: String(next) });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-medium mb-3">Каталог курсов</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Всего в каталоге {COURSES_TOTAL} программ. Выберите направление и начните учиться в удобном темпе.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {slice.map((course) => (
            <CourseCard key={course.slug} {...course} />
          ))}
        </div>

        <nav
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8"
          aria-label="Пагинация курсов"
        >
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            Показано {(page - 1) * COURSES_PAGE_SIZE + 1}–
            {Math.min(page * COURSES_PAGE_SIZE, COURSES_TOTAL)} из {COURSES_TOTAL}
          </p>

          <div className="flex items-center gap-1 order-1 sm:order-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-40 disabled:pointer-events-none text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </button>

            {pageNumbers.map((item) => (
              <Link
                key={item}
                to={item === 1 ? '/courses' : `/courses?page=${item}`}
                className={`min-w-[2.5rem] h-10 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  item === page
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-accent'
                }`}
              >
                {item}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-40 disabled:pointer-events-none text-sm"
            >
              Вперёд
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

      </div>
    </div>
  );
}
