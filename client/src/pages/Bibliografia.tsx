import { Card } from "@/components/ui/card";
import { Book, Globe, ExternalLink } from "lucide-react";

export default function Bibliografia() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Sitografia e Bibliografia
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Fonti e risorse utilizzate per la realizzazione di questo progetto educativo 
          sul ciclo del carbonio.
        </p>
      </header>

      {/* Bibliografia Section */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <Book className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Bibliografia
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Libri di Testo
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">
                Valitutti, G., Taddei, N., Kreuzer, H., Massey, A.
              </p>
              <p className="text-muted-foreground">
                <em>Dal carbonio agli OGM - Biochimica e biotecnologie</em>
              </p>
              <p className="text-muted-foreground">
                Zanichelli Editore, Bologna, 2018
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">
                Campbell, N.A., Reece, J.B., Urry, L.A.
              </p>
              <p className="text-muted-foreground">
                <em>Campbell - Biologia e Chimica</em>
              </p>
              <p className="text-muted-foreground">
                Pearson Italia, Milano, 2020
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">
                Lupia Palmieri, E., Parotto, M.
              </p>
              <p className="text-muted-foreground">
                <em>Terra - Un'introduzione al pianeta vivente</em>
              </p>
              <p className="text-muted-foreground">
                Zanichelli Editore, Bologna, 2019
              </p>
            </div>
          </div>

          <h3 className="text-lg font-heading font-medium text-foreground mt-6">
            Opere Letterarie
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">
                Levi, Primo
              </p>
              <p className="text-muted-foreground">
                <em>Il sistema periodico</em>
              </p>
              <p className="text-muted-foreground">
                Einaudi, Torino, 1975 (ristampa 2014)
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">
                Carson, Rachel
              </p>
              <p className="text-muted-foreground">
                <em>Primavera silenziosa</em>
              </p>
              <p className="text-muted-foreground">
                Feltrinelli, Milano, 2016
              </p>
            </div>
          </div>

          <h3 className="text-lg font-heading font-medium text-foreground mt-6">
            Articoli Scientifici
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">
                IPCC (Intergovernmental Panel on Climate Change)
              </p>
              <p className="text-muted-foreground">
                <em>Climate Change 2021: The Physical Science Basis</em>
              </p>
              <p className="text-muted-foreground">
                Sixth Assessment Report, Cambridge University Press, 2021
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Sitografia Section */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <Globe className="h-6 w-6 text-accent-foreground" />
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Sitografia
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Risorse Educative Online
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    NASA Climate Change - Carbon Cycle
                  </p>
                  <p className="text-muted-foreground">
                    Risorse educative della NASA sui cambiamenti climatici e il ciclo del carbonio
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://climate.nasa.gov/evidence/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    NOAA Earth System Research Laboratories
                  </p>
                  <p className="text-muted-foreground">
                    Dati e ricerche sul ciclo del carbonio e monitoraggio atmosferico
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.esrl.noaa.gov/gmd/ccgg/trends/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Enciclopedia Treccani - Ciclo del Carbonio
                  </p>
                  <p className="text-muted-foreground">
                    Definizioni e approfondimenti scientifici in lingua italiana
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.treccani.it/enciclopedia/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Khan Academy - Environmental Science
                  </p>
                  <p className="text-muted-foreground">
                    Lezioni interattive sui cicli biogeochimici e l'ambiente
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.khanacademy.org/science/biology/ecology/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-heading font-medium text-foreground mt-6">
            Organizzazioni e Istituzioni
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    ISPRA - Istituto Superiore per la Protezione e la Ricerca Ambientale
                  </p>
                  <p className="text-muted-foreground">
                    Dati ufficiali italiani su ambiente, clima e emissioni
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.isprambiente.gov.it/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    European Environment Agency
                  </p>
                  <p className="text-muted-foreground">
                    Rapporti e dati ambientali europei, indicatori climatici
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.eea.europa.eu/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Fondazione Centro Primo Levi
                  </p>
                  <p className="text-muted-foreground">
                    Archivio e risorse dedicate alla vita e all'opera di Primo Levi
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    http://www.primolevi.it/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-heading font-medium text-foreground mt-6">
            Risorse Multimediali
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Rai Scuola - Documentari Scientifici
                  </p>
                  <p className="text-muted-foreground">
                    Video educativi su ambiente, chimica e sostenibilità
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.raiscuola.rai.it/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Climate.gov - NOAA
                  </p>
                  <p className="text-muted-foreground">
                    Grafici interattivi e dati sui cambiamenti climatici
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    https://www.climate.gov/
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Note */}
      <Card className="p-6 bg-muted/50">
        <div className="text-center space-y-3">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Nota sulle Fonti
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Tutte le fonti elencate sono state consultate per garantire l'accuratezza 
            scientifica dei contenuti presentati. Le informazioni sono aggiornate 
            al momento della realizzazione del progetto (2024). Per gli studenti è 
            consigliabile verificare sempre l'aggiornamento delle fonti online.
          </p>
          <p className="text-xs text-muted-foreground">
            Ultimo aggiornamento: Settembre 2024
          </p>
        </div>
      </Card>
    </div>
  );
}