import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageTitle: string;
  imageDescription?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageTitle,
  imageDescription,
}: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-heading text-lg">{imageTitle}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <img
              src={imageSrc}
              alt={imageTitle}
              className="w-full h-auto rounded-lg border border-border"
              data-testid="img-modal-content"
            />
          </div>
          
          {imageDescription && (
            <p className="text-sm text-muted-foreground">{imageDescription}</p>
          )}
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // In a real app, this would trigger download
                console.log('Download triggered for:', imageSrc);
              }}
              data-testid="button-download-image"
            >
              <Download className="h-4 w-4 mr-2" />
              Scarica Immagine
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}