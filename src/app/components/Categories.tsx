import {
  Code,
  Database,
  Briefcase,
  Palette,
  TrendingUp,
  Camera,
} from "lucide-react";

export function Categories() {
  const categories = [
    { icon: Code, name: "Веб-разработка", courses: 450 },
    { icon: Database, name: "Анализ данных", courses: 320 },
    { icon: Briefcase, name: "Бизнес", courses: 280 },
    { icon: Palette, name: "Дизайн", courses: 390 },
    { icon: TrendingUp, name: "Маркетинг", courses: 210 },
    { icon: Camera, name: "Фотография", courses: 180 },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">
            Посмотреть популярные категории
          </h2>
          <p className="text-xl text-muted-foreground">
            Выбирайте из тысяч курсов в популярных категориях
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors mx-auto">
                <category.icon className="w-6 h-6" />
              </div>
              <h4 className="text-center mb-2">
                {category.name}
              </h4>
              <p className="text-sm text-muted-foreground text-center">
                {category.courses} курсов
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}