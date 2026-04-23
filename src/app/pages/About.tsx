import { BookOpen, Heart, Target } from 'lucide-react';

export function About() {
  return (
    <div className="bg-background py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-medium">О школе «ВысшийБалл»</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мы — онлайн-платформа, где школьники и взрослые получают востребованные знания в удобном формате: от программирования и анализа данных до дизайна, маркетинга и языков.
          </p>
        </header>

        <section>
          <p className="text-muted-foreground leading-relaxed">
            «ВысшийБалл» вырос из небольшой студии репетиторства и сегодня объединяет сотни преподавателей-практиков и тысячи студентов по всей стране. Наша цель — не просто выдать сертификат, а помочь дойти до результата: проекта в портфолио, сдачи экзамена или смены профессии.
          </p>
        </section>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border p-6 text-center space-y-2">
            <Target className="w-8 h-8 mx-auto text-primary" />
            <h2 className="font-medium">Миссия</h2>
            <p className="text-sm text-muted-foreground">
              Доступное качественное образование и честная обратная связь на каждом этапе обучения.
            </p>
          </div>
          <div className="rounded-xl border border-border p-6 text-center space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-primary" />
            <h2 className="font-medium">Формат</h2>
            <p className="text-sm text-muted-foreground">
              Видеолекции, живые вебинары, проверка заданий и офлайн-ивенты для тех, кто хочет встретиться очно.
            </p>
          </div>
          <div className="rounded-xl border border-border p-6 text-center space-y-2">
            <Heart className="w-8 h-8 mx-auto text-primary" />
            <h2 className="font-medium">Сообщество</h2>
            <p className="text-sm text-muted-foreground">
              Чаты потоков, наставники и выпускники, которые помогают новичкам не сойти с дистанции.
            </p>
          </div>
        </div>

        <section className="rounded-xl bg-muted/40 border border-border p-8">
          <h2 className="text-xl font-medium mb-3">Цифры и факты</h2>
          <ul className="text-muted-foreground space-y-2 list-disc list-inside">
            <li>более 48 актуальных курсов в каталоге;</li>
            <li>партнёрства с технологическими компаниями и фондами;</li>
            <li>поддержка на русском языке 7 дней в неделю.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
