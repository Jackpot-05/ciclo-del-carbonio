import { useState } from "react";
import QuizQuestion from "@/components/QuizQuestion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";

const quizQuestions = [
  {
    question: "Quale di questi è il principale serbatoio di carbonio sulla Terra?",
    options: [
      "L'atmosfera",
      "Gli oceani",
      "Le piante e gli animali",
      "I combustibili fossili"
    ],
    correctAnswer: 1
  },
  {
    question: "Durante la fotosintesi, le piante:",
    options: [
      "Rilasciano CO₂ nell'atmosfera",
      "Assorbono CO₂ dall'atmosfera",
      "Non interagiscono con il carbonio",
      "Trasformano l'ossigeno in carbonio"
    ],
    correctAnswer: 1
  },
  {
    question: "Qual è la concentrazione attuale di CO₂ nell'atmosfera?",
    options: [
      "Circa 280 ppm",
      "Circa 320 ppm",
      "Circa 420 ppm",
      "Circa 500 ppm"
    ],
    correctAnswer: 2
  },
  {
    question: "Il processo di respirazione cellulare:",
    options: [
      "Assorbe CO₂ dall'ambiente",
      "Rilascia CO₂ nell'ambiente",
      "Non coinvolge il carbonio",
      "Trasforma il carbonio in ossigeno"
    ],
    correctAnswer: 1
  },
  {
    question: "I combustibili fossili si sono formati:",
    options: [
      "Negli ultimi 100 anni",
      "Durante l'era industriale",
      "Milioni di anni fa",
      "Ogni anno attraverso processi naturali"
    ],
    correctAnswer: 2
  },
  {
    question: "Quale attività umana contribuisce maggiormente all'aumento di CO₂ atmosferica?",
    options: [
      "L'agricoltura",
      "La combustione di combustibili fossili",
      "La produzione di cemento",
      "L'allevamento"
    ],
    correctAnswer: 1
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 2500);
    } else {
      setTimeout(() => {
        setIsComplete(true);
      }, 2500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage >= 90) {
      return {
        title: "🎉 Eccellente!",
        message: "Hai dimostrato una conoscenza approfondita del ciclo del carbonio!"
      };
    } else if (percentage >= 70) {
      return {
        title: "👏 Molto bene!",
        message: "Hai una buona comprensione del ciclo del carbonio, continua così!"
      };
    } else if (percentage >= 50) {
      return {
        title: "📚 Buon lavoro!",
        message: "Hai le basi, ma ripassare alcuni concetti ti aiuterà a migliorare."
      };
    } else {
      return {
        title: "💪 Non mollare!",
        message: "Rileggi il materiale e riprova. L'apprendimento è un processo!"
      };
    }
  };

  if (isComplete) {
    const scoreMessage = getScoreMessage();
    
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <Trophy className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Quiz Completato!
            </h1>
          </div>
          
          <div className="space-y-4">
            <div className="text-4xl font-bold text-primary">
              {score}/{quizQuestions.length}
            </div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {scoreMessage.title}
            </h2>
            <p className="text-muted-foreground">
              {scoreMessage.message}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Percentuale: {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            
            <Button
              onClick={resetQuiz}
              className="w-full"
              data-testid="button-restart-quiz"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Riprova il Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Quiz sul Ciclo del Carbonio
        </h1>
        <p className="text-muted-foreground">
          Metti alla prova le tue conoscenze con queste domande interattive
        </p>
      </header>

      <QuizQuestion
        question={quizQuestions[currentQuestion].question}
        options={quizQuestions[currentQuestion].options}
        correctAnswer={quizQuestions[currentQuestion].correctAnswer}
        onAnswer={handleAnswer}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
      />

      <div className="text-center text-sm text-muted-foreground">
        Punteggio attuale: {score}/{currentQuestion + (answers.length > currentQuestion ? 1 : 0)}
      </div>
    </div>
  );
}