import { BookOpen, Vote, Image, Leaf, Users, Book, FileText, Atom } from "lucide-react";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Il Ciclo del Carbonio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Esplora il viaggio del carbonio attraverso atmosfera, biosfera, idrosfera e geosfera. 
            Un progetto educativo completo per studenti delle scuole superiori.
          </p>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-heading font-semibold text-center mb-8 text-foreground">
            Esplora le Sezioni
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionCard
              title="Ciclo del Carbonio"
              description="Scopri come il carbonio si muove tra i diversi serbatoi terrestri attraverso processi naturali e antropici."
              href="/ciclo-carbonio"
              icon={<Atom className="h-6 w-6" />}
              color="primary"
            />
            
            <SectionCard
              title="Quiz Interattivo"
              description="Metti alla prova le tue conoscenze con domande interattive e ricevi feedback immediato."
              href="/quiz"
              icon={<Vote className="h-6 w-6" />}
              color="accent"
            />
            
            <SectionCard
              title="Infografiche"
              description="Visualizza diagrammi e infografiche educative per comprendere meglio i processi."
              href="/infografiche"
              icon={<Image className="h-6 w-6" />}
              color="primary"
            />
            
            <SectionCard
              title="Educazione Civica"
              description="Comprendi l'impatto delle attività umane sul clima e sull'ambiente."
              href="/educazione-civica"
              icon={<Leaf className="h-6 w-6" />}
              color="accent"
            />
            
            <SectionCard
              title="Cittadino Consapevole"
              description="Scopri azioni concrete per ridurre il tuo impatto ambientale nella vita quotidiana."
              href="/cittadino-consapevole"
              icon={<Users className="h-6 w-6" />}
              color="primary"
            />
            
            <SectionCard
              title="Lettere e Scienza"
              description="Esplora il viaggio del carbonio attraverso gli occhi di Primo Levi."
              href="/lettere-scienza"
              icon={<Book className="h-6 w-6" />}
              color="accent"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-card py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-heading font-semibold text-card-foreground">
            Un Progetto Educativo Completo
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Questo sito web è stato realizzato come risorsa didattica per facilitare 
            l'apprendimento del ciclo del carbonio, uno dei processi più importanti 
            per la comprensione della chimica ambientale e dei cambiamenti climatici.
          </p>
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-primary">
              <FileText className="h-5 w-5" />
              <span className="font-medium">Materiale per le scuole superiori</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}