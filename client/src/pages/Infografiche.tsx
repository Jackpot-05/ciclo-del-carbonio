import { useState } from "react";
import { Card } from "@/components/ui/card";
import ImageModal from "@/components/ImageModal";
import { ZoomIn } from "lucide-react";
import carbonCycleImage from "@assets/generated_images/Carbon_cycle_educational_diagram_6e32ec94.png";
import environmentalImpactImage from "@assets/generated_images/Environmental_impact_infographic_a117eb93.png";
import sustainablePracticesImage from "@assets/generated_images/Sustainable_practices_illustration_2a1cdb8c.png";

const infographics = [
  {
    id: 1,
    title: "Diagramma del Ciclo del Carbonio",
    description: "Rappresentazione completa del movimento del carbonio tra atmosfera, biosfera, idrosfera e geosfera.",
    src: carbonCycleImage,
    details: "Questo diagramma mostra i principali processi che governano il ciclo del carbonio, inclusi fotosintesi, respirazione, dissoluzione oceanica e attività vulcanica."
  },
  {
    id: 2,
    title: "Impatto Ambientale delle Attività Umane",
    description: "Visualizzazione degli effetti antropici sul ciclo del carbonio e sul clima terrestre.",
    src: environmentalImpactImage,
    details: "L'infografica illustra come le attività umane come la combustione di fossili, la deforestazione e l'industria alterino l'equilibrio naturale del carbonio."
  },
  {
    id: 3,
    title: "Pratiche Sostenibili",
    description: "Azioni quotidiane per ridurre l'impatto sul ciclo del carbonio e promuovere la sostenibilità.",
    src: sustainablePracticesImage,
    details: "Consigli pratici per uno stile di vita più sostenibile: dalla mobilità verde al risparmio energetico, dalle energie rinnovabili al riciclaggio."
  }
];

export default function Infografiche() {
  const [selectedImage, setSelectedImage] = useState<typeof infographics[0] | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Infografiche Educative
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Esplora le nostre infografiche per comprendere visivamente 
          i processi del ciclo del carbonio e il suo impatto ambientale.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infographics.map((infographic) => (
          <Card
            key={infographic.id}
            className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedImage(infographic)}
            data-testid={`card-infographic-${infographic.id}`}
          >
            <div className="relative">
              <img
                src={infographic.src}
                alt={infographic.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {infographic.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {infographic.description}
              </p>
              <div className="flex items-center text-xs text-primary font-medium">
                <ZoomIn className="h-3 w-3 mr-1" />
                Clicca per ingrandire
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Educational Note */}
      <Card className="p-6 bg-muted/50">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Come utilizzare le infografiche
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clicca su qualsiasi immagine per visualizzarla a schermo intero. 
            Utilizza queste risorse per studiare, preparare presentazioni o 
            approfondire la tua comprensione del ciclo del carbonio.
          </p>
        </div>
      </Card>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.src}
          imageTitle={selectedImage.title}
          imageDescription={selectedImage.details}
        />
      )}
    </div>
  );
}