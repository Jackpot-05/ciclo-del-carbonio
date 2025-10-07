import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, BookOpen, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { path: "/", label: "Home", icon: BookOpen },
  { path: "/ciclo-carbonio", label: "Ciclo del Carbonio" },
  { path: "/elemento-chimico", label: "Elemento Chimico" },
  { path: "/quiz", label: "Quiz" },
  { path: "/infografiche", label: "Infografiche" },
  { path: "/educazione-civica", label: "Educazione Civica" },
  { path: "/cittadino-consapevole", label: "Cittadino Consapevole" },
  { path: "/lettere-scienza", label: "Lettere e Scienza" },
  { path: "/bibliografia", label: "Sitografia e Bibliografia" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2">
              <Atom className="text-primary h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 transition-all duration-200" />
              <span className="font-heading font-bold text-lg text-foreground">
                Il Ciclo del Carbonio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button
                  variant={location === item.path ? "default" : "ghost"}
                  size="sm"
                  className="text-sm font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}