import { BookOpen, Menu, Search, User } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { user, isAuthenticated, authReady } = useAuth();

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">
              ВысшийБалл
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/courses"
              className="text-foreground hover:text-primary transition-colors"
            >
              Курсы
            </Link>
            <Link
              to="/programs"
              className="text-foreground hover:text-primary transition-colors"
            >
              Программы
            </Link>
            <Link
              to="/teachers"
              className="text-foreground hover:text-primary transition-colors"
            >
              Преподаватели
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              О нас
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button type="button" className="p-2 hover:bg-accent rounded-lg transition-colors" aria-label="Поиск">
              <Search className="w-5 h-5" />
            </button>
            {!authReady ? (
              <span className="hidden md:block w-28 h-9 rounded-lg bg-muted animate-pulse" aria-hidden />
            ) : isAuthenticated ? (
              <Link
                to="/profile"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <User className="w-4 h-4" />
                {user?.name}
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:block px-4 py-2 text-primary hover:bg-accent rounded-lg transition-colors">
                  Войти
                </Link>
                <Link to="/register" className="hidden md:block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Начать
                </Link>
              </>
            )}
            <button className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}