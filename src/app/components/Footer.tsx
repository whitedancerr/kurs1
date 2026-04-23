import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const footerCourses = [
  { label: 'Веб-разработка', slug: 'polnaya-veb-razrabotka' },
  { label: 'Анализ данных', slug: 'data-science-i-ml' },
  { label: 'Бизнес', slug: 'biznes-strategiya' },
  { label: 'Дизайн', slug: 'ui-ux-design' },
  { label: 'Маркетинг', slug: 'digital-marketing' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-semibold">ВысшийБалл</span>
            </div>
            <p className="text-primary-foreground/80">
              Качественное онлайн-обучение и поддержка на каждом шаге — для студентов по всему миру.
            </p>
            <div className="flex gap-3">
              <button type="button" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Курсы</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link to="/courses" className="hover:text-primary-foreground transition-colors font-medium">
                  Все курсы (каталог)
                </Link>
              </li>
              {footerCourses.map((c) => (
                <li key={c.slug}>
                  <Link to={`/courses/${c.slug}`} className="hover:text-primary-foreground transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Компания</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">О нас</Link></li>
              <li><Link to="/programs" className="hover:text-primary-foreground transition-colors">Программы и ивенты</Link></li>
              <li><Link to="/teachers" className="hover:text-primary-foreground transition-colors">Преподаватели</Link></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Вакансии</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Поддержка</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Справочный центр</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Условия использования</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Файлы cookie</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Доступность</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/80">
          <p>© 2026 ВысшийБалл. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
