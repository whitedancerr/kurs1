import { Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router';

interface CourseCardProps {
  slug: string;
  title: string;
  instructor: string;
  image: string;
  price: string;
  rating: number;
  students: string;
  duration: string;
  category: string;
}

export function CourseCard({
  slug,
  title,
  instructor,
  image,
  price,
  rating,
  students,
  duration,
  category,
}: CourseCardProps) {
  return (
    <Link
      to={`/courses/${slug}`}
      className="block bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer text-left"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="line-clamp-2 min-h-[3rem]">{title}</h3>

        <div className="text-sm text-muted-foreground">
          Преподаватель: {instructor}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 shrink-0" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border gap-3">
          <div className="text-2xl text-primary">{price}</div>
          <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center">
            Подробнее
          </span>
        </div>
      </div>
    </Link>
  );
}
