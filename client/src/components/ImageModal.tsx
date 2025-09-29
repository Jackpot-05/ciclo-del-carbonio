import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
          <DialogTitle className="font-heading text-lg">{imageTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <img
              src={imageSrc}
              alt={imageTitle}
              className="w-full max-w-[90vw] max-h-[70vh] object-contain rounded-lg border border-border mx-auto"
              data-testid="img-modal-content"
            />
          </div>
          {imageDescription && (
            <p className="text-sm text-muted-foreground">{imageDescription}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}