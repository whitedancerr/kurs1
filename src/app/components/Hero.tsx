import { Play, Star } from "lucide-react";
import { Link } from "react-router";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">
                Оценка 4,9 из 5 по отзывам более 10 000
                студентов
              </span>
            </div>

            <h1 className="text-5xl leading-tight">
              Учись без границ
            </h1>

            <p className="text-xl text-muted-foreground">
              Получите доступ к тысячам курсов от опытных
              преподавателей и развивайте свою карьеру с помощью
              гибкого онлайн-обучения.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center"
              >
                Смотреть курсы
              </Link>
              <button
                type="button"
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Демо-урок
              </button>
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl">2.5K+</div>
                <div className="text-muted-foreground">
                  Курсов
                </div>
              </div>
              <div>
                <div className="text-3xl">50K+</div>
                <div className="text-muted-foreground">
                  Студентов
                </div>
              </div>
              <div>
                <div className="text-3xl">300+</div>
                <div className="text-muted-foreground">
                  Преподавателей
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1758611974775-39e307bc3da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Онлайн-обучение студентов"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold">12 500+</div>
                  <div className="text-sm text-muted-foreground">
                    записались за месяц
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}