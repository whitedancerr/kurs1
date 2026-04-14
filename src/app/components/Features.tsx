import { Award, Clock, Globe, HeadphonesIcon } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Globe,
      title: 'Learn Anywhere',
      description: 'Access courses from any device, anytime, anywhere in the world.'
    },
    {
      icon: Award,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience.'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Study at your own pace with lifetime access to course materials.'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Get help whenever you need it from our dedicated support team.'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Why Choose EduCenter?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide the best learning experience with cutting-edge technology and expert support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
