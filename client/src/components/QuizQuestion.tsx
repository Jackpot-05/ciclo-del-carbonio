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
}

export default function QuizQuestion({
  question,
  options,
  correctAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [question]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    const isCorrect = answerIndex === correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Domanda {questionNumber} di {totalQuestions}
        </span>
        <div className="w-24 bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-heading font-semibold text-foreground">
        {question}
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => {
          let buttonVariant: "outline" | "default" | "destructive" = "outline";
          let icon = null;

          if (showFeedback && selectedAnswer !== null) {
            if (index === correctAnswer) {
              buttonVariant = "default";
              icon = <CheckCircle className="h-4 w-4" />;
            } else if (index === selectedAnswer && index !== correctAnswer) {
              buttonVariant = "destructive";
              icon = <XCircle className="h-4 w-4" />;
            }
          }

          return (
            <Button
              key={index}
              variant={buttonVariant}
              className="w-full justify-start text-left h-auto p-4"
              onClick={() => !showFeedback && handleAnswerSelect(index)}
              disabled={showFeedback}
              data-testid={`button-answer-${index}`}
            >
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-sm">{option}</span>
                {icon && <span className="flex-shrink-0">{icon}</span>}
              </div>
            </Button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground">
            {selectedAnswer === correctAnswer
              ? "🎉 Corretto! Bene fatto!"
              : "❌ Non corretto. La risposta giusta è l'opzione " +
                String.fromCharCode(65 + correctAnswer) +
                "."}
          </p>
        </div>
      )}
    </Card>
  );
}