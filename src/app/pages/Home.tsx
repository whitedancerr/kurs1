import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { CourseCard } from '../components/CourseCard';
import { Features } from '../components/Features';

export function Home() {
  const featuredCourses = [
    {
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1753613648191-4771cf76f034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$89',
      rating: 4.8,
      students: '12.5K',
      duration: '40h',
      category: 'Development'
    },
    {
      title: 'Data Science & Machine Learning',
      instructor: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1758685733633-a12889098460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$129',
      rating: 4.9,
      students: '8.3K',
      duration: '56h',
      category: 'Data Science'
    },
    {
      title: 'Digital Marketing Mastery',
      instructor: 'Emily Rodriguez',
      image: 'https://images.unsplash.com/photo-1758611974775-39e307bc3da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$79',
      rating: 4.7,
      students: '15.2K',
      duration: '32h',
      category: 'Marketing'
    },
    {
      title: 'UI/UX Design Fundamentals',
      instructor: 'David Kim',
      image: 'https://images.unsplash.com/photo-1762329352849-f4d0c9e7696a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$99',
      rating: 4.8,
      students: '10.1K',
      duration: '28h',
      category: 'Design'
    },
    {
      title: 'Business Strategy & Management',
      instructor: 'Amanda Foster',
      image: 'https://images.unsplash.com/photo-1762329388386-22bf162a9368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$109',
      rating: 4.6,
      students: '6.8K',
      duration: '36h',
      category: 'Business'
    },
    {
      title: 'Mobile App Development with React Native',
      instructor: 'James Williams',
      image: 'https://images.unsplash.com/photo-1762329397003-f35d51b38d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lJTIwZWR1Y2F0aW9uJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDg5NTM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$119',
      rating: 4.9,
      students: '9.4K',
      duration: '48h',
      category: 'Development'
    }
  ];

  return (
    <>
      <Hero />

      <Categories />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl mb-2">Featured Courses</h2>
              <p className="text-xl text-muted-foreground">
                Explore our most popular courses
              </p>
            </div>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
              View All Courses
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      <Features />

      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Start Learning Today</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students already learning on EduCenter. Get unlimited access to 2,500+ courses.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>
    </>
  );
}
