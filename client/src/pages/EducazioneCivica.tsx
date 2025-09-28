import { Card } from "@/components/ui/card";
import { AlertTriangle, Factory, Car, TreePine, Thermometer } from "lucide-react";
import environmentalImpactImage from "@assets/generated_images/Environmental_impact_infographic_a117eb93.png";

export default function EducazioneCivica() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Educazione Civica
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprendere gli effetti delle attività umane sul ciclo del carbonio 
          è fondamentale per la formazione di cittadini consapevoli.
        </p>
      </header>

      {/* Warning Alert */}
      <Card className="p-6 border-destructive/20 bg-destructive/5">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Allarme Climatico
            </h2>
            <p className="text-muted-foreground">
              Le attività umane hanno alterato significativamente il ciclo naturale del carbonio, 
              portando a un aumento delle concentrazioni di CO₂ atmosferica del 50% rispetto ai livelli pre-industriali.
            </p>
          </div>
        </div>
      </Card>

      {/* Main Image */}
      <Card className="p-6">
        <img
          src={environmentalImpactImage}
          alt="Impatto ambientale delle attività umane"
          className="w-full rounded-lg border border-border"
          data-testid="img-environmental-impact"
        />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Le principali fonti di emissioni antropiche di carbonio
        </p>
      </Card>

      {/* Impact Sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Gli Effetti Antropici Negativi
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Factory className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Emissioni Industriali
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              La combustione di combustibili fossili per la produzione di energia 
              e nei processi industriali rilascia enormi quantità di CO₂ nell'atmosfera. 
              Le centrali elettriche a carbone e le fabbriche sono tra i maggiori contributori.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs font-medium text-foreground">Dato importante:</p>
              <p className="text-xs text-muted-foreground">
                L'industria produce circa il 21% delle emissioni globali di CO₂
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Car className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Trasporti
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Auto, camion, aerei e navi utilizzano combustibili fossili, 
              contribuendo significativamente alle emissioni di CO₂. 
              Il settore dei trasporti è responsabile di circa il 16% delle emissioni globali.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs font-medium text-foreground">Dato importante:</p>
              <p className="text-xs text-muted-foreground">
                Un'auto media emette circa 4,6 tonnellate di CO₂ all'anno
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <TreePine className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Deforestazione
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              La distruzione delle foreste riduce la capacità della Terra di assorbire CO₂ 
              e rilascia il carbonio immagazzinato negli alberi. Ogni anno perdiamo 
              circa 10 milioni di ettari di foreste.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs font-medium text-foreground">Dato importante:</p>
              <p className="text-xs text-muted-foreground">
                Un albero adulto assorbe circa 22 kg di CO₂ all'anno
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Thermometer className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Cambiamenti Climatici
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              L'aumento delle concentrazioni di CO₂ intensifica l'effetto serra, 
              causando l'innalzamento delle temperature globali, lo scioglimento 
              dei ghiacci e l'innalzamento del livello del mare.
            </p>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs font-medium text-foreground">Dato importante:</p>
              <p className="text-xs text-muted-foreground">
                La temperatura media globale è aumentata di 1,1°C dal 1880
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            La Responsabilità di Ogni Cittadino
          </h2>
          <p className="text-muted-foreground">
            Comprendere questi processi è il primo passo per diventare cittadini responsabili. 
            Solo attraverso la conoscenza e l'azione collettiva possiamo affrontare 
            la sfida dei cambiamenti climatici.
          </p>
          <p className="text-sm font-medium text-primary">
            "Non ereditiamo la Terra dai nostri antenati, la prendiamo in prestito dai nostri figli"
          </p>
        </div>
      </Card>
    </div>
  );
}