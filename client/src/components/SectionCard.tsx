import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color?: "primary" | "accent";
}

export default function SectionCard({
  title,
  description,
  href,
  icon,
  color = "primary",
}: SectionCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-200 group">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color === "primary" ? "bg-primary/10" : "bg-accent/10"}`}>
            <span className={color === "primary" ? "text-primary" : "text-accent-foreground"}>
              {icon}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        
        <Link href={href} data-testid={`link-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:bg-muted/50 transition-colors"
          >
            <span>Esplora</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}