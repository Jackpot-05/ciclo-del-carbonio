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
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setShowingFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setShowingFeedback(false);
        setIsTransitioning(false);
      }, 300);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsComplete(true);
      }, 500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
    setShowingFeedback(false);
    setIsTransitioning(false);
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
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 text-center space-y-6 animate-in fade-in duration-500">
          <div className="space-y-4">
            <div className="animate-in zoom-in duration-700 delay-200">
              <Trophy className="h-16 w-16 text-primary mx-auto" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground animate-in slide-in-from-bottom duration-500 delay-300">
              Quiz Completato!
            </h1>
          </div>
          
          <div className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-500">
            <div className="relative">
              <div className="text-6xl font-bold text-primary mb-2">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-2xl font-semibold text-muted-foreground">
                {percentage}%
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 delay-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {scoreMessage.title}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {scoreMessage.message}
            </p>
          </div>
          
          {/* Statistiche dettagliate */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg animate-in slide-in-from-bottom duration-500 delay-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-xs text-muted-foreground">Corrette</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{quizQuestions.length - score}</div>
              <div className="text-xs text-muted-foreground">Sbagliate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{quizQuestions.length}</div>
              <div className="text-xs text-muted-foreground">Totali</div>
            </div>
          </div>
          
          <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-900">
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
      <header className="text-center space-y-4 animate-in fade-in duration-500">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Quiz sul Ciclo del Carbonio
        </h1>
        <p className="text-muted-foreground">
          Metti alla prova le tue conoscenze con queste domande interattive
        </p>
        
        {/* Progress indicator migliorato */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progresso</span>
            <span>{currentQuestion + 1}/{quizQuestions.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <QuizQuestion
          question={quizQuestions[currentQuestion].question}
          options={quizQuestions[currentQuestion].options}
          correctAnswer={quizQuestions[currentQuestion].correctAnswer}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
          totalQuestions={quizQuestions.length}
          showingFeedback={showingFeedback}
        />
      </div>

      {/* Controlli di navigazione */}
      {showingFeedback && (
        <div className="text-center animate-in slide-in-from-bottom duration-300">
          <Button 
            onClick={nextQuestion}
            size="lg"
            className="min-w-32"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Prossima Domanda' : 'Vedi Risultati'}
          </Button>
        </div>
      )}

      {/* Score tracker migliorato */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-4 bg-muted/50 rounded-full px-4 py-2 text-sm">
          <span className="text-muted-foreground">Punteggio:</span>
          <span className="font-bold text-primary">{score}/{answers.length}</span>
          {answers.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ({Math.round((score / answers.length) * 100)}%)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}