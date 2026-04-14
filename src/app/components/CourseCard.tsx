import { Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
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
  title,
  instructor,
  image,
  price,
  rating,
  students,
  duration,
  category
}: CourseCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
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
          by {instructor}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-2xl text-primary">{price}</div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
