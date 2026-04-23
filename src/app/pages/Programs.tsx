import { CalendarDays, GraduationCap, MapPin, Users } from 'lucide-react';

export function Programs() {
  return (
    <div className="bg-background py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="space-y-3">
          <h1 className="text-4xl font-medium">Программы школы</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Онлайн-школа «ВысшийБалл» сочетает дистанционное обучение с живыми встречами: мы проводим офлайн-ивенты для студентов из разных городов.
          </p>
        </header>

        <section className="rounded-xl border border-border bg-card p-8 space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <MapPin className="w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-medium">Офлайн-ивенты</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Раз в сезон мы организуем встречи в учебных хабах: дни открытых дверей, мастер-классы с преподавателями, хакатоны и нетворкинг для выпускников. На ивентах можно познакомиться с кураторами, разобрать кейсы в команде и получить обратную связь по портфолио.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>весенний и осенний фестиваль проектов;</li>
            <li>субботние интенсивы в Москве, Санкт-Петербурге и онлайн-трансляция для других регионов;</li>
            <li>закрытые Q&amp;A-сессии с экспертами индустрии.</li>
          </ul>
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <CalendarDays className="w-4 h-4 mt-0.5 shrink-0" />
            Расписание и регистрация на ближайшие события публикуются в личном кабинете и в рассылке для активных студентов.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-card p-8 space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <GraduationCap className="w-6 h-6 shrink-0" />
            <h2 className="text-2xl font-medium">Как стать преподавателем</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Мы приглашаем практиков с опытом работы по профилю не менее трёх лет. Преподаватель ведёт курсы на платформе, проверяет задания и участвует в офлайн-ивентах по желанию.
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 leading-relaxed">
            <li>Заполните анкету на сайте (раздел контактов) и приложите ссылку на портфолио или профиль.</li>
            <li>Пройдите короткое методическое интервью с заведующим направлением.</li>
            <li>Подготовьте демо-урок или программу модуля — мы поможем адаптировать материалы под формат школы.</li>
            <li>После стажировки вы выходите на первый поток под кураторством опытного коллеги.</li>
          </ol>
          <p className="text-muted-foreground flex items-start gap-2">
            <Users className="w-4 h-4 mt-1 shrink-0" />
            Педагогам доступны внутренние методические встречи, обновление курсов и справедливое вознаграждение по договору.
          </p>
        </section>
      </div>
    </div>
  );
}
