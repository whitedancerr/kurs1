/** Публичный каталог курсов: 48 программ для каталога и карточек */

export type CatalogCourse = {
  slug: string;
  title: string;
  instructor: string;
  image: string;
  gallery: string[];
  price: string;
  rating: number;
  students: string;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
};

/** Локальные копии (public/images), выкачаны с Unsplash */
const IMAGES = [
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-03.jpg',
  '/images/photo-04.jpg',
  '/images/photo-05.jpg',
  '/images/photo-06.jpg',
] as const;

const INSTRUCTORS = [
  'Анна Петрова',
  'Михаил Соколов',
  'Елена Волкова',
  'Игорь Назаров',
  'Ольга Смирнова',
  'Дмитрий Орлов',
  'Сара Джонсон',
  'Майкл Чен',
];

const EXTRA_TITLES: { title: string; category: string }[] = [
  { title: 'SQL и реляционные базы данных', category: 'Разработка' },
  { title: 'Git и командная разработка', category: 'Разработка' },
  { title: 'Linux для разработчиков', category: 'Разработка' },
  { title: 'Основы кибербезопасности', category: 'Разработка' },
  { title: 'Тестирование ПО: от теории к практике', category: 'Разработка' },
  { title: 'DevOps и CI/CD', category: 'Разработка' },
  { title: 'Kubernetes: первые шаги', category: 'Разработка' },
  { title: 'Docker на практике', category: 'Разработка' },
  { title: 'Алгоритмы и структуры данных', category: 'Разработка' },
  { title: 'Олимпиадная информатика', category: 'Разработка' },
  { title: 'Scratch и логика для школьников', category: 'Разработка' },
  { title: 'Python для начинающих', category: 'Разработка' },
  { title: 'Java и объектно-ориентированное программирование', category: 'Разработка' },
  { title: 'C# и платформа .NET', category: 'Разработка' },
  { title: 'Язык Go для backend', category: 'Разработка' },
  { title: 'Введение в Rust', category: 'Разработка' },
  { title: 'PHP и фреймворк Laravel', category: 'Разработка' },
  { title: 'Сайты на WordPress', category: 'Разработка' },
  { title: 'Теория вероятностей и статистика', category: 'Анализ данных' },
  { title: 'Excel для аналитиков', category: 'Анализ данных' },
  { title: 'Power BI: дашборды и отчёты', category: 'Анализ данных' },
  { title: 'A/B-тесты и эксперименты', category: 'Анализ данных' },
  { title: 'SEO-продвижение сайтов', category: 'Маркетинг' },
  { title: 'Таргет ВКонтакте', category: 'Маркетинг' },
  { title: 'Яндекс Директ: настройка кампаний', category: 'Маркетинг' },
  { title: 'Email-маркетинг и автоворонки', category: 'Маркетинг' },
  { title: 'Контент-стратегия бренда', category: 'Маркетинг' },
  { title: 'SMM: сообщество и вовлечённость', category: 'Маркетинг' },
  { title: 'Копирайтинг для интернета', category: 'Маркетинг' },
  { title: 'Графический дизайн в Figma', category: 'Дизайн' },
  { title: 'Дизайн презентаций и питчей', category: 'Дизайн' },
  { title: 'Введение в 3D-моделирование', category: 'Дизайн' },
  { title: 'Видеомонтаж для соцсетей', category: 'Дизайн' },
  { title: 'Фотография: свет и композиция', category: 'Дизайн' },
  { title: 'Тайм-менеджмент и продуктивность', category: 'Бизнес' },
  { title: 'Agile и управление проектами', category: 'Бизнес' },
  { title: 'Личные финансы и инвестиции', category: 'Бизнес' },
  { title: 'Ораторское мастерство', category: 'Карьера' },
  { title: 'Английский для IT-специалистов', category: 'Языки' },
  { title: 'Немецкий язык: уровень A1', category: 'Языки' },
  { title: 'Нейросети в работе и учёбе', category: 'Разработка' },
  { title: 'Промпт-инжиниринг', category: 'Разработка' },
];

const CORE_COURSES: CatalogCourse[] = [
  {
    slug: 'polnaya-veb-razrabotka',
    title: 'Полный курс веб-разработки',
    instructor: 'Сара Джонсон',
    image: IMAGES[0],
    gallery: [IMAGES[0], IMAGES[1], IMAGES[2]],
    price: '6 990 ₽',
    rating: 4.8,
    students: '12,5 тыс.',
    duration: '40 ч',
    category: 'Разработка',
    description:
      'От основ HTML и CSS до современного JavaScript, React и бэкенда на Node.js. Вы соберёте портфолио из реальных проектов и научитесь публиковать сайты в интернете.',
    highlights: [
      'Вёрстка и адаптивный дизайн',
      'JavaScript (ES6+) и TypeScript',
      'React и работа с API',
      'Основы серверной части и баз данных',
    ],
  },
  {
    slug: 'data-science-i-ml',
    title: 'Data Science и машинное обучение',
    instructor: 'Майкл Чен',
    image: IMAGES[1],
    gallery: [IMAGES[1], IMAGES[3], IMAGES[4]],
    price: '9 990 ₽',
    rating: 4.9,
    students: '8,3 тыс.',
    duration: '56 ч',
    category: 'Анализ данных',
    description:
      'Python, анализ данных, визуализация, основы статистики и классическое машинное обучение. Практика на датасетах из индустрии.',
    highlights: [
      'Python и библиотеки pandas, NumPy',
      'Визуализация и отчёты',
      'Модели ML и оценка качества',
      'Введение в нейросети',
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Цифровой маркетинг: от стратегии до аналитики',
    instructor: 'Эмили Родригес',
    image: IMAGES[2],
    gallery: [IMAGES[2], IMAGES[0], IMAGES[5]],
    price: '5 490 ₽',
    rating: 4.7,
    students: '15,2 тыс.',
    duration: '32 ч',
    category: 'Маркетинг',
    description:
      'SMM, контекстная реклама, контент-стратегия, SEO и веб-аналитика. Научитесь строить воронки и измерять эффективность кампаний.',
    highlights: [
      'Стратегия продвижения бренда',
      'Рекламные кабинеты и таргетинг',
      'SEO и контент-маркетинг',
      'Метрики и отчётность',
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'Основы UI/UX-дизайна',
    instructor: 'Дэвид Ким',
    image: IMAGES[3],
    gallery: [IMAGES[3], IMAGES[2], IMAGES[4]],
    price: '7 990 ₽',
    rating: 4.8,
    students: '10,1 тыс.',
    duration: '28 ч',
    category: 'Дизайн',
    description:
      'Исследования пользователей, прототипирование, дизайн-системы и передача макетов в разработку. Работа в Figma на практических кейсах.',
    highlights: [
      'UX-исследования и CJM',
      'Интерфейсы и компоненты в Figma',
      'Юзабилити и доступность',
      'Портфолио для трудоустройства',
    ],
  },
  {
    slug: 'biznes-strategiya',
    title: 'Бизнес-стратегия и управление',
    instructor: 'Аманда Фостер',
    image: IMAGES[4],
    gallery: [IMAGES[4], IMAGES[3], IMAGES[1]],
    price: '8 490 ₽',
    rating: 4.6,
    students: '6,8 тыс.',
    duration: '36 ч',
    category: 'Бизнес',
    description:
      'Стратегическое планирование, финансовые модели, управление командой и проектами. Курс для руководителей и предпринимателей.',
    highlights: [
      'Анализ рынка и конкурентов',
      'KPI и операционная эффективность',
      'Лидерство и коммуникации',
      'Масштабирование бизнеса',
    ],
  },
  {
    slug: 'react-native-prilozheniya',
    title: 'Мобильные приложения на React Native',
    instructor: 'Джеймс Уильямс',
    image: IMAGES[5],
    gallery: [IMAGES[5], IMAGES[0], IMAGES[3]],
    price: '9 490 ₽',
    rating: 4.9,
    students: '9,4 тыс.',
    duration: '48 ч',
    category: 'Разработка',
    description:
      'Кроссплатформенные приложения для iOS и Android: навигация, состояние, работа с API, публикация в сторах.',
    highlights: [
      'Основы React Native и Expo',
      'Нативные модули и анимации',
      'Авторизация и офлайн-режим',
      'Сборка и публикация приложения',
    ],
  },
];

function buildExtraCourses(): CatalogCourse[] {
  return EXTRA_TITLES.map((item, k) => {
    const num = k + 7;
    const slug = `kurs-${String(num).padStart(2, '0')}`;
    const img = IMAGES[k % IMAGES.length];
    const priceNum = 3490 + (k % 8) * 400;
    const rating = Math.round((4.3 + (k % 7) * 0.08) * 10) / 10;
    const hours = 18 + (k % 6) * 6;
    const studentsK = 1.2 + (k % 15) * 0.35;
    return {
      slug,
      title: item.title,
      instructor: INSTRUCTORS[k % INSTRUCTORS.length],
      image: img,
      gallery: [img, IMAGES[(k + 1) % IMAGES.length], IMAGES[(k + 2) % IMAGES.length]],
      price: `${priceNum.toLocaleString('ru-RU')} ₽`,
      rating,
      students: `${studentsK.toFixed(1).replace('.', ',')} тыс.`,
      duration: `${hours} ч`,
      category: item.category,
      description: `Практический курс «${item.title}»: теория, разбор кейсов и задания с обратной связью от преподавателя школы «ВысшийБалл».`,
      highlights: [
        'Структурированная программа',
        'Домашние задания с проверкой',
        'Доступ к материалам после курса',
        'Сертификат по окончании',
      ],
    };
  });
}

export const COURSES_CATALOG: CatalogCourse[] = [...CORE_COURSES, ...buildExtraCourses()];

export const COURSES_TOTAL = COURSES_CATALOG.length;
export const COURSES_PAGE_SIZE = 12;

export function getCoursesTotalPages(): number {
  return Math.ceil(COURSES_CATALOG.length / COURSES_PAGE_SIZE);
}

export function getCoursesPage(page: number): CatalogCourse[] {
  const p = Math.max(1, Math.min(page, getCoursesTotalPages()));
  const start = (p - 1) * COURSES_PAGE_SIZE;
  return COURSES_CATALOG.slice(start, start + COURSES_PAGE_SIZE);
}

export function getCourseBySlug(slug: string | undefined): CatalogCourse | undefined {
  if (!slug) return undefined;
  return COURSES_CATALOG.find((c) => c.slug === slug);
}
