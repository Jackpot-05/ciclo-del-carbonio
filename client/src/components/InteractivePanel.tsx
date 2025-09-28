import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

interface InteractivePanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export default function InteractivePanel({
  title,
  children,
  defaultOpen = false,
  icon,
}: InteractivePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden">
      <Button
        variant="ghost"
        className="w-full justify-between p-6 h-auto hover-elevate"
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`button-panel-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center space-x-3">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="font-heading font-semibold text-left">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </Button>
      
      {isOpen && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="pt-4 space-y-4">{children}</div>
        </div>
      )}
    </Card>
  );
}