import { Link } from "wouter";
import { Book, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Book className="h-5 w-5 text-primary" />
            <p className="text-foreground font-medium">
              Progetto scolastico sul Ciclo del Carbonio
            </p>
          </div>
          <div className="flex flex-col items-center space-y-1 text-sm text-muted-foreground mt-4">
            <span>Sviluppatori: <strong>Andrea Pittoni, Mattia De Luca, Tancredi Russo</strong></span>
            <span>Liceo Vittoria Colonna, Roma – Classe 5 R</span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <Link href="/bibliografia" data-testid="link-bibliografia-footer">
              <span className="flex items-center space-x-1 hover:text-primary transition-colors hover-elevate rounded px-2 py-1">
                <ExternalLink className="h-4 w-4" />
                <span>Sitografia e Bibliografia</span>
              </span>
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link href="/quiz-admin" data-testid="link-quiz-dashboard-footer">
              <span className="flex items-center space-x-1 hover:text-primary transition-colors hover-elevate rounded px-2 py-1">
                <ExternalLink className="h-4 w-4" />
                <span>Quiz Dashboard</span>
              </span>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">© 2025 Liceo Vittoria Colonna – Tutti i diritti riservati</p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Realizzato come risorsa didattica per studenti delle scuole superiori. 
            Materiale educativo per l'apprendimento del ciclo del carbonio e la consapevolezza ambientale.
          </p>
        </div>
      </div>
    </footer>
  );
}