import { Card } from "@/components/ui/card";
import { Atom, Layers, Link, ArrowRight, Lightbulb } from "lucide-react";

export default function ElementoChimico() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Il Carbonio come Elemento Chimico
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Scopri le proprietà chimiche fondamentali dell'elemento che è alla base di tutta la vita sulla Terra
        </p>
      </header>

      {/* Proprietà Base */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Atom className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Proprietà Fondamentali
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Identificazione</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-medium">Simbolo:</span> C</li>
                <li><span className="font-medium">Numero atomico:</span> 6</li>
                <li><span className="font-medium">Massa atomica:</span> 12,011 u</li>
                <li><span className="font-medium">Gruppo:</span> 14 (IVA)</li>
                <li><span className="font-medium">Periodo:</span> 2</li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Configurazione Elettronica</h3>
              <p className="text-sm text-muted-foreground mb-2">1s² 2s² 2p²</p>
              <p className="text-xs text-muted-foreground">
                4 elettroni di valenza nel guscio esterno
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Proprietà Chimiche</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium">Elettronegatività:</span> 2,55 
                  <span className="text-xs ml-2">(scala Pauling)</span>
                </li>
                <li><span className="font-medium">Valenza:</span> 4</li>
                <li><span className="font-medium">Stati di ossidazione:</span> -4, +2, +4</li>
                <li><span className="font-medium">Raggio atomico:</span> 70 pm</li>
              </ul>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span>Caratteristica Unica</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Il carbonio può formare <strong>4 legami covalenti</strong> stabili, 
                permettendo la creazione di catene e strutture complesse infinite.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Allotropi */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Layers className="h-6 w-6 text-accent-foreground" />
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Allotropi del Carbonio
          </h2>
        </div>

        <p className="text-muted-foreground">
          Il carbonio può esistere in diverse forme cristalline chiamate <strong>allotropi</strong>, 
          ognuna con proprietà fisiche uniche ma stessa composizione chimica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Grafite */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Grafite</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground text-sm">Struttura</h4>
                <p className="text-xs text-muted-foreground">
                  Strati di atomi di carbonio disposti in esagoni, 
                  legati debolmente tra loro
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground text-sm">Proprietà</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Conduce elettricità</li>
                  <li>• Morbida e scivolosa</li>
                  <li>• Colore grigio-nero</li>
                  <li>• Usata nelle matite</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Diamante */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Diamante</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground text-sm">Struttura</h4>
                <p className="text-xs text-muted-foreground">
                  Reticolo tridimensionale tetraedrico, 
                  ogni atomo legato a 4 altri
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground text-sm">Proprietà</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Materiale più duro</li>
                  <li>• Trasparente e brillante</li>
                  <li>• Isolante elettrico</li>
                  <li>• Conduce il calore</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Fullerene */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Atom className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Fullerene</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground text-sm">Struttura</h4>
                <p className="text-xs text-muted-foreground">
                  Molecole sferiche cave (C₆₀, C₇₀), 
                  simili a palloni da calcio
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground text-sm">Proprietà</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Scoperto nel 1985</li>
                  <li>• Applicazioni in nanotecnologie</li>
                  <li>• Proprietà uniche</li>
                  <li>• Ricerca medica</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Altri Allotropi</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Grafene:</span> Singolo strato di grafite, 
              materiale bidimensionale con proprietà eccezionali
            </div>
            <div>
              <span className="font-medium">Nanotubi:</span> Fogli di grafene arrotolati 
              in strutture tubolari nanometriche
            </div>
          </div>
        </div>
      </Card>

      {/* Legami Chimici */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Link className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Capacità di Legame del Carbonio
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Il carbonio è unico nella tavola periodica per la sua capacità di formare 
            <strong> quattro legami covalenti stabili</strong> contemporaneamente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Tipi di Legame</h3>
              
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-medium text-foreground">Legame Semplice (C-C)</h4>
                  <p className="text-sm text-muted-foreground">
                    Condivisione di una coppia di elettroni. Permette rotazione libera.
                  </p>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-medium text-foreground">Legame Doppio (C=C)</h4>
                  <p className="text-sm text-muted-foreground">
                    Condivisione di due coppie di elettroni. Struttura planare rigida.
                  </p>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <h4 className="font-medium text-foreground">Legame Triplo (C≡C)</h4>
                  <p className="text-sm text-muted-foreground">
                    Condivisione di tre coppie di elettroni. Legame molto forte e lineare.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Conseguenze</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Formazione di catene lunghe e ramificate</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Creazione di anelli e strutture cicliche</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Possibilità di legami con altri elementi (H, O, N, S...)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Base per milioni di composti organici diversi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Collegamento al Ciclo */}
      <Card className="p-8 bg-primary/5 border-primary/20 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Link className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Dal Laboratorio alla Natura
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground text-center">
            Le proprietà chimiche del carbonio che abbiamo studiato spiegano perché questo elemento 
            è così importante nel ciclo naturale e per il clima terrestre.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-2">Versatilità Chimica</h3>
              <p className="text-sm text-muted-foreground">
                La capacità del carbonio di formare 4 legami stabili permette la creazione 
                di molecole complesse come proteine, DNA e carboidrati - i mattoni della vita.
              </p>
            </Card>

            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-2">Stabilità e Mobilità</h3>
              <p className="text-sm text-muted-foreground">
                I composti del carbonio sono abbastanza stabili da conservare l'energia 
                (combustibili fossili) ma anche abbastanza reattivi per i processi biologici.
              </p>
            </Card>

            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-2">Forme Gassose</h3>
              <p className="text-sm text-muted-foreground">
                CO₂ e CH₄ sono molecole gassose che permettono al carbonio di viaggiare 
                facilmente attraverso l'atmosfera, collegando terra, mare e cielo.
              </p>
            </Card>

            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-2">Effetto Serra</h3>
              <p className="text-sm text-muted-foreground">
                Le proprietà vibrazionali delle molecole di CO₂ le rendono capaci 
                di assorbire radiazione infrarossa, causando l'effetto serra.
              </p>
            </Card>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground italic">
              "La chimica del carbonio a livello atomico determina 
              i processi planetari che sostengono la vita."
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}