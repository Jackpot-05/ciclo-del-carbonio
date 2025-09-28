import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, Lightbulb, Bike, Home, ShoppingCart, Leaf, Heart } from "lucide-react";
import sustainablePracticesImage from "@assets/generated_images/Sustainable_practices_illustration_2a1cdb8c.png";

export default function CittadinoConsapevole() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Cittadino Consapevole
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Scopri come le tue scelte quotidiane possono fare la differenza 
          per il pianeta e per il futuro delle prossime generazioni.
        </p>
      </header>

      {/* Hero Image */}
      <Card className="p-6">
        <img
          src={sustainablePracticesImage}
          alt="Pratiche sostenibili per la vita quotidiana"
          className="w-full rounded-lg border border-border"
          data-testid="img-sustainable-practices"
        />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Piccole azioni quotidiane per un grande impatto ambientale
        </p>
      </Card>

      {/* Sustainable Practices */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Pratiche Sostenibili per la Vita Quotidiana
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 hover-elevate">
            <div className="flex items-center space-x-3">
              <Recycle className="h-6 w-6 text-accent-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Riciclaggio e Riuso
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Separa correttamente i rifiuti seguendo le indicazioni locali</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Riutilizza contenitori e materiali quando possibile</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Scegli prodotti con meno imballaggi</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Dona o vendi oggetti che non usi più</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4 hover-elevate">
            <div className="flex items-center space-x-3">
              <Lightbulb className="h-6 w-6 text-accent-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Risparmio Energetico
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Usa lampadine LED ad alta efficienza energetica</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Spegni luci e dispositivi quando non li usi</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Imposta il termostato a temperature ragionevoli</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Scollega caricabatterie e dispositivi in standby</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4 hover-elevate">
            <div className="flex items-center space-x-3">
              <Bike className="h-6 w-6 text-accent-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Trasporto Sostenibile
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Usa la bicicletta o cammina per tragitti brevi</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Utilizza i mezzi pubblici quando disponibili</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Condividi l'auto con amici o colleghi</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Considera veicoli elettrici o ibridi</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4 hover-elevate">
            <div className="flex items-center space-x-3">
              <Home className="h-6 w-6 text-accent-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Casa Efficiente
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Migliora l'isolamento termico della tua casa</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Usa elettrodomestici ad alta efficienza energetica</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Installa pannelli solari se possibile</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Raccogli l'acqua piovana per annaffiare</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4 hover-elevate">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-accent-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Consumo Responsabile
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Scegli prodotti locali e di stagione</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Riduci il consumo di carne e latticini</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Evita prodotti con imballaggi eccessivi</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Compra solo ciò di cui hai realmente bisogno</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 space-y-4 hover-elevate">
            <div className="flex items-center space-x-3">
              <Leaf className="h-6 w-6 text-accent-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Verde e Natura
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Pianta alberi e cura il verde urbano</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Crea un orto o un giardino sostenibile</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Supporta organizzazioni ambientaliste</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-foreground mt-1">•</span>
                <span>Partecipa a iniziative di pulizia ambientale</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Impact Section */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Il Tuo Impatto Conta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">-30%</div>
              <p className="text-sm text-muted-foreground">
                Riduzione possibile delle emissioni domestiche
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">2.5t</div>
              <p className="text-sm text-muted-foreground">
                CO₂ risparmiata all'anno con trasporti sostenibili
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">€500</div>
              <p className="text-sm text-muted-foreground">
                Risparmio annuo medio con efficienza energetica
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-8 bg-primary/5 border-primary/20 text-center">
        <div className="space-y-6">
          <Heart className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Ogni Piccolo Gesto Conta!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Non serve essere perfetti dall'oggi al domani. Inizia con piccoli cambiamenti 
            nella tua routine quotidiana. Insieme, possiamo costruire un futuro più sostenibile 
            per le prossime generazioni.
          </p>
          <Button
            size="lg"
            className="mx-auto"
            onClick={() => console.log('Commitment action triggered')}
            data-testid="button-commitment"
          >
            Mi Impegno a Fare la Differenza
          </Button>
        </div>
      </Card>
    </div>
  );
}