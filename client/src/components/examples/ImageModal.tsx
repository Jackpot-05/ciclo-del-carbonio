import { useState } from 'react'
import ImageModal from '../ImageModal'
import { Button } from '@/components/ui/button'

export default function ImageModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Apri Modal Immagine
      </Button>
      
      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageSrc="https://via.placeholder.com/800x600/3b82f6/ffffff?text=Ciclo+del+Carbonio"
        imageTitle="Diagramma del Ciclo del Carbonio"
        imageDescription="Rappresentazione schematica del movimento del carbonio tra atmosfera, biosfera, idrosfera e geosfera."
      />
    </div>
  )
}