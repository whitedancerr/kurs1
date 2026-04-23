import { Award, Clock, Globe, HeadphonesIcon } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Globe,
      title: 'Учитесь где угодно',
      description: 'Доступ к курсам с любого устройства в удобное для вас время.',
    },
    {
      icon: Award,
      title: 'Эксперты-преподаватели',
      description: 'Практики из индустрии с реальным опытом работы в профессии.',
    },
    {
      icon: Clock,
      title: 'Гибкий график',
      description: 'Темп обучения выбираете вы; материалы остаются у вас навсегда.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Поддержка 24/7',
      description: 'Помощь службы поддержки в любое время суток.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Почему «ВысшийБалл»?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Современная платформа, сильные курсы и заботливая поддержка на каждом этапе.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
