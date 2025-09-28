import InteractivePanel from "@/components/InteractivePanel";
import { Card } from "@/components/ui/card";
import { Atom, Leaf, Droplets, Wind, Mountain } from "lucide-react";
import carbonCycleImage from "@assets/generated_images/Carbon_cycle_educational_diagram_6e32ec94.png";

export default function CicloCarbonio() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Il Ciclo del Carbonio
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Un ciclo biogeochimico fondamentale che regola il movimento del carbonio 
          tra atmosfera, biosfera, idrosfera e geosfera.
        </p>
      </header>

      {/* Main Diagram */}
      <Card className="p-6">
        <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">
          Diagramma del Ciclo del Carbonio
        </h2>
        <div className="space-y-4">
          <img
            src={carbonCycleImage}
            alt="Diagramma del ciclo del carbonio"
            className="w-full rounded-lg border border-border"
            data-testid="img-carbon-cycle-diagram"
          />
          <p className="text-sm text-muted-foreground">
            Il carbonio si muove continuamente tra quattro principali serbatoi: 
            atmosfera, biosfera, idrosfera e geosfera.
          </p>
        </div>
      </Card>

      {/* Interactive Panels */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          I Serbatoi del Carbonio
        </h2>
        
        <InteractivePanel
          title="Atmosfera"
          icon={<Wind className="h-5 w-5" />}
          defaultOpen={true}
        >
          <div className="space-y-3">
            <p className="text-muted-foreground">
              L'atmosfera contiene carbonio principalmente sotto forma di anidride carbonica (CO₂). 
              Attualmente, la concentrazione di CO₂ nell'atmosfera è di circa 420 ppm.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium text-foreground">Processi principali:</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Respirazione degli organismi viventi</li>
                <li>• Combustione di combustibili fossili</li>
                <li>• Fotosintesi (rimozione di CO₂)</li>
                <li>• Scambio con gli oceani</li>
              </ul>
            </div>
          </div>
        </InteractivePanel>

        <InteractivePanel
          title="Biosfera"
          icon={<Leaf className="h-5 w-5" />}
        >
          <div className="space-y-3">
            <p className="text-muted-foreground">
              La biosfera include tutti gli organismi viventi e rappresenta un serbatoio 
              dinamico di carbonio che cambia con le stagioni e l'attività biologica.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium text-foreground">Processi principali:</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Fotosintesi: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</li>
                <li>• Respirazione cellulare</li>
                <li>• Decomposizione della materia organica</li>
                <li>• Formazione di biomassa</li>
              </ul>
            </div>
          </div>
        </InteractivePanel>

        <InteractivePanel
          title="Idrosfera"
          icon={<Droplets className="h-5 w-5" />}
        >
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Gli oceani sono il più grande serbatoio di carbonio sulla Terra, contenendo 
              circa 50 volte più carbonio dell'atmosfera.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium text-foreground">Processi principali:</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Dissoluzione di CO₂ nell'acqua marina</li>
                <li>• Formazione di carbonati</li>
                <li>• Attività biologica marina</li>
                <li>• Circolazione oceanica</li>
              </ul>
            </div>
          </div>
        </InteractivePanel>

        <InteractivePanel
          title="Geosfera"
          icon={<Mountain className="h-5 w-5" />}
        >
          <div className="space-y-3">
            <p className="text-muted-foreground">
              La geosfera include rocce carbonatiche, combustibili fossili e sedimenti. 
              È il serbatoio più grande ma anche il più lento nei processi di scambio.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium text-foreground">Processi principali:</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Weathering delle rocce carbonatiche</li>
                <li>• Formazione di combustibili fossili</li>
                <li>• Attività vulcanica</li>
                <li>• Sedimentazione</li>
              </ul>
            </div>
          </div>
        </InteractivePanel>
      </div>

      {/* Atom Journey */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start space-x-4">
          <Atom className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-3">
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Il Viaggio dell'Atomo di Carbonio
            </h3>
            <p className="text-muted-foreground">
              Immagina un atomo di carbonio che inizia il suo viaggio nell'atmosfera come CO₂. 
              Attraverso la fotosintesi, entra in una pianta, diventa parte di una molecola di glucosio. 
              Quando l'animale mangia la pianta, il carbonio diventa parte del suo corpo. 
              Alla morte dell'animale, la decomposizione rilascia il carbonio nel suolo, 
              da dove può tornare all'atmosfera o essere assorbito dalle radici di altre piante.
            </p>
            <p className="text-sm font-medium text-primary">
              Un viaggio che può durare giorni, anni o millenni!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}