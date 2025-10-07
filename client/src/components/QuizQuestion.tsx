import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  showingFeedback?: boolean;
}

export default function QuizQuestion({
  question,
  options,
  correctAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
  showingFeedback = false,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setHasAnswered(false);
  }, [question]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);
    
    // Animazione di feedback immediata
    setTimeout(() => {
      setShowFeedback(true);
      const isCorrect = answerIndex === correctAnswer;
      onAnswer(isCorrect);
    }, 200);
  };

  return (
    <Card className="p-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Domanda {questionNumber} di {totalQuestions}
        </span>
        <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-heading font-semibold text-foreground leading-relaxed">
        {question}
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => {
          let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
          let icon = null;
          let extraClasses = "";

          if (showFeedback && selectedAnswer !== null) {
            if (index === correctAnswer) {
              buttonVariant = "default";
              icon = <CheckCircle className="h-4 w-4" />;
              extraClasses = "animate-pulse";
            } else if (index === selectedAnswer && index !== correctAnswer) {
              buttonVariant = "destructive";
              icon = <XCircle className="h-4 w-4" />;
            } else {
              buttonVariant = "secondary";
            }
          } else if (hasAnswered && index === selectedAnswer) {
            extraClasses = "ring-2 ring-primary";
          }

          return (
            <Button
              key={index}
              variant={buttonVariant}
              className={`w-full justify-start text-left h-auto p-4 transition-all duration-200 hover:scale-[1.02] ${extraClasses}`}
              onClick={() => handleAnswerSelect(index)}
              disabled={hasAnswered}
              data-testid={`button-answer-${index}`}
            >
              <div className="flex items-start space-x-3 w-full">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-sm">{option}</span>
                {icon && (
                  <span className="flex-shrink-0 animate-in zoom-in duration-200">
                    {icon}
                  </span>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary animate-in slide-in-from-left duration-300">
          <p className="text-sm text-muted-foreground">
            {selectedAnswer === correctAnswer
              ? "🎉 Esatto! Ottimo lavoro!"
              : `❌ Non è corretto. La risposta giusta è l'opzione ${String.fromCharCode(65 + correctAnswer)}: "${options[correctAnswer]}"`}
          </p>
        </div>
      )}
    </Card>
  );
}