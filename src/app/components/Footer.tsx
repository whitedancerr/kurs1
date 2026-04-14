import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-semibold">EduCenter</span>
            </div>
            <p className="text-primary-foreground/80">
              Empowering learners worldwide with quality education and expert instruction.
            </p>
            <div className="flex gap-3">
              <button className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Courses</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Design</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Marketing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/80">
          <p>&copy; 2026 EduCenter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
