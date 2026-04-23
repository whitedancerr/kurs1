// Mock database for students and courses

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
}

// Teacher's students
export const TEACHER_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Дмитрий Иванов',
    email: 'student@student.com',
    enrolledCourses: ['c1'],
    progress: 65,
  },
  {
    id: 's2',
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    enrolledCourses: ['c1', 'c2'],
    progress: 82,
  },
  {
    id: 's3',
    name: 'Алексей Козлов',
    email: 'alexey@example.com',
    enrolledCourses: ['c1'],
    progress: 45,
  },
  {
    id: 's4',
    name: 'Екатерина Новикова',
    email: 'ekaterina@example.com',
    enrolledCourses: ['c2'],
    progress: 90,
  },
  {
    id: 's5',
    name: 'Иван Морозов',
    email: 'ivan@example.com',
    enrolledCourses: ['c1'],
    progress: 38,
  },
];

// Student's enrolled courses
export const STUDENT_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Web Developer',
    instructor: 'Анна Петрова',
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    nextLesson: 'Продвинутые паттерны JavaScript',
  },
];

// All available courses (for reference)
export const ALL_COURSES = [
  {
    id: 'c1',
    title: 'Web Developer',
    instructor: 'Анна Петрова',
  },
  {
    id: 'c2',
    title: 'Основы анализа данных',
    instructor: 'Анна Петрова',
  },
];
