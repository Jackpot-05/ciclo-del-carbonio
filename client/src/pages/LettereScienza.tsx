import { Card } from "@/components/ui/card";
import { BookOpen, Quote, Users } from "lucide-react";
import primoLeviImage from "@assets/generated_images/Primo_Levi_portrait_39674b68.png";

export default function LettereScienza() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Lettere e Scienza
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Quando la letteratura incontra la scienza: il viaggio del carbonio 
          attraverso gli occhi di Primo Levi
        </p>
      </header>

      {/* Primo Levi Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6 text-center space-y-4">
            <img
              src={primoLeviImage}
              alt="Primo Levi"
              className="w-32 h-40 object-cover rounded-lg mx-auto border border-border"
              data-testid="img-primo-levi"
            />
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Primo Levi
              </h3>
              <p className="text-sm text-muted-foreground">
                1919-1987
              </p>
              <p className="text-sm text-muted-foreground">
                Chimico e Scrittore
              </p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Chi era Primo Levi
              </h2>
            </div>
            <p className="text-muted-foreground">
              Primo Levi (1919-1987) è stato uno dei più importanti scrittori italiani del XX secolo, 
              ma anche un chimico di professione. La sua formazione scientifica ha profondamente 
              influenzato la sua opera letteraria, creando un ponte unico tra il mondo della scienza 
              e quello delle lettere.
            </p>
            <p className="text-muted-foreground">
              Sopravvissuto ai campi di concentramento nazisti, Levi ha saputo trasformare 
              l'esperienza umana in racconto universale, utilizzando spesso metafore chimiche 
              per descrivere le complessità della vita e della natura umana.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              "Il Sistema Periodico" (1975)
            </h3>
            <p className="text-muted-foreground text-sm">
              Quest'opera autobiografica utilizza gli elementi chimici come filo conduttore 
              per raccontare episodi della vita dell'autore, mescolando memoria personale, 
              riflessione scientifica e narrazione letteraria in modo magistrale.
            </p>
          </Card>
        </div>
      </div>

      {/* Il Viaggio del Carbonio */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Quote className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            "Il Carbonio" da "Il Sistema Periodico"
          </h2>
        </div>

        <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
          <p className="text-muted-foreground italic leading-relaxed">
            "Il nostro carattere è scritto nell'anidride carbonica del nostro respiro, 
            ma i suoi messaggi non sono facili da decifrare."
          </p>
          <p className="text-xs text-muted-foreground mt-2">— Primo Levi</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Il Viaggio Narrativo dell'Atomo di Carbonio
          </h3>
          
          <p className="text-muted-foreground">
            Nel racconto "Il Carbonio", Levi segue il viaggio di un atomo di carbonio attraverso 
            i secoli, partendo da un pezzo di calcare nelle montagne. L'atomo viaggia attraverso 
            rocce, aria, acqua, piante e animali, fino a diventare parte di una molecola di glucosio 
            nel cervello dello scrittore stesso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-card">
              <h4 className="font-medium text-foreground mb-2">Il Percorso Geologico</h4>
              <p className="text-sm text-muted-foreground">
                L'atomo inizia il suo viaggio intrappolato in una roccia calcarea, 
                liberato nell'aria da una fornace che fonde la roccia, scavata dall'uomo.
              </p>
            </Card>

            <Card className="p-4 bg-card">
              <h4 className="font-medium text-foreground mb-2">Il Volo Atmosferico</h4>
              <p className="text-sm text-muted-foreground">
                Trasformato in CO₂, l'atomo vola nell'atmosfera, partecipando 
                ai grandi cicli di scambio tra terra, mare e cielo.
              </p>
            </Card>

            <Card className="p-4 bg-card">
              <h4 className="font-medium text-foreground mb-2">La Cattura Vegetale</h4>
              <p className="text-sm text-muted-foreground">
                Assorbito da una foglia durante la fotosintesi, diventa parte 
                della struttura molecolare di una pianta.
              </p>
            </Card>

            <Card className="p-4 bg-card">
              <h4 className="font-medium text-foreground mb-2">Il Ciclo della Vita</h4>
              <p className="text-sm text-muted-foreground">
                Attraverso la catena alimentare, l'atomo arriva infine nel corpo umano, 
                contribuendo ai processi vitali e alla coscienza stessa.
              </p>
            </Card>
          </div>
        </div>
      </Card>

      {/* Science and Literature Connection */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-accent-foreground" />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            La Scienza Umanizzata dalla Letteratura
          </h2>
        </div>

        <p className="text-muted-foreground">
          Levi dimostra come la letteratura possa rendere accessibili concetti scientifici complessi, 
          trasformando processi chimici astratti in narrazioni coinvolgenti e profondamente umane. 
          La sua prosa poetica ci aiuta a comprendere che siamo tutti parte integrante dei cicli naturali.
        </p>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Perché questa connessione è importante:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start space-x-2">
              <span className="text-accent-foreground mt-1">•</span>
              <span>Rende la scienza più accessibile e coinvolgente</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-accent-foreground mt-1">•</span>
              <span>Mostra la bellezza poetica dei processi naturali</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-accent-foreground mt-1">•</span>
              <span>Evidenzia la nostra connessione profonda con la natura</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-accent-foreground mt-1">•</span>
              <span>Stimola la curiosità e l'interesse per le scienze</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Reflection Box */}
      <Card className="p-8 bg-primary/5 border-primary/20">
        <div className="text-center space-y-6">
          <Quote className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Riflessione Finale
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground italic text-lg">
              "Qual è il nostro ruolo come atomi nel grande ciclo della vita?"
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Come l'atomo di carbonio di Levi, anche noi siamo parte di cicli più grandi di noi stessi. 
              Ogni nostro respiro, ogni nostro gesto, ci connette intimamente ai processi che governano 
              il pianeta. La consapevolezza di questa connessione dovrebbe guidare le nostre scelte 
              quotidiane verso un futuro più sostenibile.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}