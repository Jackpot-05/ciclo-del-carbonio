import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, BookOpen, Atom, ChevronDown, Leaf, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { path: "/", label: "Home", icon: BookOpen },
  { path: "/ciclo-carbonio", label: "Ciclo del Carbonio" },
  { path: "/elemento-chimico", label: "Elemento Chimico" },
  { path: "/quiz", label: "Quiz" },
  { path: "/quiz-collaborativo", label: "Quiz Live" },
  { path: "/infografiche", label: "Infografiche" },
  { path: "/lettere-scienza", label: "Lettere e Scienza" },
];

const sustainabilityItems = [
  { path: "/educazione-civica", label: "Educazione Civica", icon: Leaf },
  { path: "/cittadino-consapevole", label: "Cittadino Consapevole", icon: Users },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if current location is in sustainability section
  const isSustainabilityActive = sustainabilityItems.some(item => item.path === location);

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
            
            {/* Sustainability Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={isSustainabilityActive ? "default" : "ghost"}
                  size="sm"
                  className="text-sm font-medium"
                >
                  Sostenibilità
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {sustainabilityItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link href={item.path} className="flex items-center w-full">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
              
              {/* Mobile Sustainability Section */}
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">Sostenibilità</p>
                {sustainabilityItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={location === item.path ? "default" : "ghost"}
                      className="w-full justify-start text-sm mb-1"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}