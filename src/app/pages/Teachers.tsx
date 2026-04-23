import { Building2, User } from 'lucide-react';

type Person = {
  name: string;
  role: string;
  bio: string;
};

const director: Person = {
  name: 'Виктория Алексеевна Морозова',
  role: 'Директор онлайн-школы «ВысшийБалл»',
  bio: 'За плечами — 15 лет в образовании и EdTech. Отвечает за стратегию школы, качество программ и партнёрства с вузами и работодателями.',
};

const heads: Person[] = [
  {
    name: 'Анна Петрова',
    role: 'Заведующая направлением STEM и программирования',
    bio: 'Курирует курсы по разработке, анализу данных и олимпиадной подготовке. Кандидат педагогических наук.',
  },
  {
    name: 'Сергей Владимирович Крылов',
    role: 'Заведующий направлением бизнеса и soft skills',
    bio: 'Руководит программами по менеджменту, маркетингу и карьерным навыкам. Ранее — директор по обучению в IT-компании.',
  },
  {
    name: 'Марина Игоревна Светлова',
    role: 'Заведующая направлением дизайна и медиа',
    bio: 'Отвечает за дизайн, фото-видео и творческие интенсивы. Практикующий арт-директор.',
  },
];

const teachers: Person[] = [
  { name: 'Михаил Соколов', role: 'Преподаватель веб-разработки', bio: 'Full-stack разработчик, ментор стажировок.' },
  { name: 'Елена Волкова', role: 'Преподаватель анализа данных', bio: 'Data scientist, автор практических модулей по Python.' },
  { name: 'Игорь Назаров', role: 'Преподаватель кибербезопасности', bio: 'Сертифицированный специалист по защите инфраструктуры.' },
  { name: 'Ольга Смирнова', role: 'Преподаватель маркетинга', bio: 'Performance- и SMM-стратег с кейсами из e-commerce.' },
  { name: 'Дмитрий Орлов', role: 'Преподаватель английского для IT', bio: 'IELTS examiner, фокус на переговорах и документации.' },
  { name: 'Ксения Павлова', role: 'Преподаватель дизайна', bio: 'Product designer, спикер конференций по UX.' },
  { name: 'Артём Белов', role: 'Преподаватель DevOps', bio: 'Инженер платформы, Kubernetes и CI/CD.' },
  { name: 'Наталья Ким', role: 'Преподаватель финансов и карьеры', bio: 'Коуч и консультант по личной эффективности.' },
];

function PersonCard({ person, level }: { person: Person; level: 'director' | 'head' | 'teacher' }) {
  const border =
    level === 'director'
      ? 'border-primary ring-2 ring-primary/20'
      : level === 'head'
        ? 'border-border bg-muted/20'
        : 'border-border';

  return (
    <article className={`rounded-xl border p-6 ${border}`}>
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
            level === 'director' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}
        >
          <User className="w-7 h-7" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-tight">{person.name}</h3>
          <p className="text-sm text-primary font-medium mt-1">{person.role}</p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{person.bio}</p>
        </div>
      </div>
    </article>
  );
}

export function Teachers() {
  return (
    <div className="bg-background py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Building2 className="w-4 h-4" />
            <span>Структура команды</span>
          </div>
          <h1 className="text-4xl font-medium">Преподаватели и руководство</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ниже — иерархия: директор школы, заведующие направлениями и преподавательский состав.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4 pl-1">
              Уровень 1 — руководство школы
            </h2>
            <PersonCard person={director} level="director" />
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4 pl-1">
              Уровень 2 — заведующие направлениями
            </h2>
            <div className="space-y-4 border-l-2 border-primary/30 ml-3 pl-6">
              {heads.map((p) => (
                <PersonCard key={p.name} person={p} level="head" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4 pl-1">
              Уровень 3 — преподаватели
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 border-l-2 border-border ml-3 pl-6">
              {teachers.map((p) => (
                <PersonCard key={p.name} person={p} level="teacher" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
