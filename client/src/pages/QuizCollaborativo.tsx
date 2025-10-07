import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Users, Clock, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  tooltip?: string;
}

interface StudentAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

interface Student {
  id: string;
  name: string;
  answers: StudentAnswer[];
  score: number;
  isOnline: boolean;
}

const collaborativeQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Qual è il principale serbatoio di carbonio negli oceani?",
    options: [
      "Plancton marino",
      "Carbonato di calcio nei sedimenti",
      "CO₂ disciolto nell'acqua",
      "Alghe marine"
    ],
    correctAnswer: 1,
    explanation: "Il carbonato di calcio nei sedimenti oceanici rappresenta il più grande serbatoio di carbonio sulla Terra.",
    tooltip: "I sedimenti oceanici contengono circa 37.000 GtC di carbonio"
  },
  {
    id: "q2", 
    question: "Durante l'upwelling oceanico, cosa succede al carbonio?",
    options: [
      "Viene sequestrato nel fondale",
      "Viene rilasciato in atmosfera come CO₂",
      "Rimane invariato", 
      "Si trasforma in metano"
    ],
    correctAnswer: 1,
    explanation: "L'upwelling porta in superficie acque ricche di CO₂, che viene poi rilasciato nell'atmosfera.",
    tooltip: "L'upwelling è il movimento verso l'alto di acque profonde ricche di nutrienti e CO₂"
  },
  {
    id: "q3",
    question: "La pompa biologica del carbonio negli oceani:",
    options: [
      "Rilascia sempre CO₂ in atmosfera",
      "Trasferisce carbonio dalle acque superficiali al fondale",
      "Funziona solo di notte",
      "Non influenza il clima globale"
    ],
    correctAnswer: 1,
    explanation: "La pompa biologica trasferisce carbonio organico dalle acque superficiali ai sedimenti profondi attraverso organismi marini.",
    tooltip: "Processo che sequestra circa 11 GtC all'anno negli oceani profondi"
  },
  {
    id: "q4",
    question: "Il tempo di residenza del carbonio nell'atmosfera è:",
    options: [
      "Circa 1 anno",
      "Circa 4 anni", 
      "Circa 50-200 anni",
      "Circa 1000 anni"
    ],
    correctAnswer: 2,
    explanation: "Il CO₂ atmosferico ha un tempo di residenza medio di 50-200 anni prima di essere assorbito da oceani o biosfera.",
    tooltip: "Tempo di residenza: tempo medio che una molecola rimane in un serbatoio"
  },
  {
    id: "q5",
    question: "L'acidificazione degli oceani è causata da:",
    options: [
      "Aumento della temperatura",
      "Assorbimento di CO₂ atmosferico",
      "Diminuzione del plancton",
      "Inquinamento plastico"
    ],
    correctAnswer: 1,
    explanation: "L'assorbimento di CO₂ forma acido carbonico, abbassando il pH oceanico.",
    tooltip: "pH oceanico è diminuito di 0,1 unità dall'era pre-industriale"
  }
];

export default function QuizCollaborativo() {
  const [student, setStudent] = useState<Student | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [connectedStudents, setConnectedStudents] = useState<number>(1);

  const currentQuestion = collaborativeQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === collaborativeQuestions.length - 1;

  // Simula connessione backend
  useEffect(() => {
    // Simula altri studenti online
    const interval = setInterval(() => {
      setConnectedStudents(Math.floor(Math.random() * 8) + 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRegistration = async () => {
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    
    const newStudent: Student = {
      id: `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      answers: [],
      score: 0,
      isOnline: true
    };
    
    try {
      // Prova chiamata API (potrebbe fallire su Vercel)
      const response = await fetch('/api/quiz/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          isOnline: true
        }),
      });
      
      if (response.ok) {
        const apiStudent = await response.json();
        setStudent(apiStudent);
        console.log('✅ Studente registrato via API:', apiStudent);
        
        // Salva anche in localStorage per persistenza
        const allStudents = JSON.parse(localStorage.getItem('quiz_students') || '[]');
        allStudents.push(apiStudent);
        localStorage.setItem('quiz_students', JSON.stringify(allStudents));
      } else {
        throw new Error('API non disponibile');
      }
    } catch (error) {
      console.warn('⚠️ API non disponibile, uso localStorage:', error);
      
      // Fallback: uso localStorage come storage principale
      setStudent(newStudent);
      
      // Salva in localStorage
      const allStudents = JSON.parse(localStorage.getItem('quiz_students') || '[]');
      allStudents.push(newStudent);
      localStorage.setItem('quiz_students', JSON.stringify(allStudents));
      localStorage.setItem('current_student', JSON.stringify(newStudent));
      
      console.log('📱 Studente salvato in localStorage:', newStudent);
    }
    
    setIsRegistered(true);
    setIsSubmitting(false);
  };

  const handleAnswer = async (answerIndex: number) => {
    if (hasAnswered || !student) return;
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);
    setIsSubmitting(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const answer: StudentAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      isCorrect,
      timestamp: Date.now()
    };
    
    // Aggiorna studente locale immediatamente
    const updatedStudent = {
      ...student,
      answers: [...student.answers, answer],
      score: student.score + (isCorrect ? 1 : 0),
      lastActivity: Date.now()
    };
    
    setStudent(updatedStudent);
    
    try {
      // Prova a inviare al backend
      const response = await fetch('/api/quiz/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: student.id,
          answer: answer
        }),
      });
      
      if (response.ok) {
        console.log('✅ Risposta inviata via API:', answer);
      } else {
        throw new Error('API non disponibile');
      }
    } catch (error) {
      console.warn('⚠️ API non disponibile per risposta, salvo in localStorage');
    }
    
    // Salva sempre in localStorage per persistenza
    const allStudents = JSON.parse(localStorage.getItem('quiz_students') || '[]');
    const studentIndex = allStudents.findIndex((s: Student) => s.id === student.id);
    if (studentIndex >= 0) {
      allStudents[studentIndex] = updatedStudent;
    } else {
      allStudents.push(updatedStudent);
    }
    localStorage.setItem('quiz_students', JSON.stringify(allStudents));
    localStorage.setItem('current_student', JSON.stringify(updatedStudent));
    
    setIsSubmitting(false);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowResults(false);
    if (student) {
      setStudent({
        ...student,
        answers: [],
        score: 0
      });
    }
  };

  // Schermata di registrazione
  if (!isRegistered) {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <Users className="h-12 w-12 text-primary mx-auto" />
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Quiz Collaborativo
            </h1>
            <p className="text-sm text-muted-foreground">
              Partecipa al quiz di classe sul ciclo del carbonio
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Il tuo nome</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Inserisci il tuo nome"
                className="mt-1"
                onKeyPress={(e) => e.key === 'Enter' && handleRegistration()}
              />
            </div>
          </div>
          
          <Button
            onClick={handleRegistration}
            disabled={!name.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Registrazione..." : "Partecipa al Quiz"}
          </Button>
          
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {connectedStudents} studenti online
            </Badge>
          </div>
        </Card>
      </div>
    );
  }

  // Schermata risultati
  if (showResults) {
    const percentage = Math.round((student!.score / collaborativeQuestions.length) * 100);
    
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <Card className="p-6 space-y-6 text-center">
          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Quiz Completato!
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="text-4xl font-bold text-primary">
              {student!.score}/{collaborativeQuestions.length}
            </div>
            <div className="text-lg text-muted-foreground">
              {percentage}% di risposte corrette
            </div>
            
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          
          <Alert>
            <AlertDescription className="text-sm">
              Le tue risposte sono state salvate. Il professore può vedere i tuoi risultati in tempo reale.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button onClick={resetQuiz} className="w-full">
              Riprova il Quiz
            </Button>
            <div className="text-xs text-muted-foreground">
              Studente: {student!.name}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz principale
  return (
    <TooltipProvider>
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Header con progresso */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Domanda {currentQuestionIndex + 1} di {collaborativeQuestions.length}
            </span>
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / collaborativeQuestions.length) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
            <span>Punteggio: {student!.score}/{student!.answers.length}</span>
            <span>
              <Users className="h-3 w-3 inline mr-1" />
              {connectedStudents} online
            </span>
          </div>
        </Card>

        {/* Domanda */}
        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-heading font-semibold text-foreground leading-relaxed flex-1">
                {currentQuestion.question}
              </h3>
              {currentQuestion.tooltip && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 flex-shrink-0">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{currentQuestion.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
              let icon = null;
              let extraClasses = "";

              if (hasAnswered && selectedAnswer !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonVariant = "default";
                  icon = <CheckCircle className="h-4 w-4" />;
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  buttonVariant = "destructive";
                  icon = <XCircle className="h-4 w-4" />;
                } else {
                  buttonVariant = "secondary";
                }
              } else if (selectedAnswer === index) {
                extraClasses = "ring-2 ring-primary";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className={`w-full justify-start text-left h-auto p-4 transition-all duration-200 ${extraClasses}`}
                  onClick={() => handleAnswer(index)}
                  disabled={hasAnswered || isSubmitting}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-sm">{option}</span>
                    {icon && (
                      <span className="flex-shrink-0">
                        {icon}
                      </span>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {hasAnswered && currentQuestion.explanation && (
            <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">
                <strong>Spiegazione:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </Card>

        {/* Controlli navigazione */}
        {hasAnswered && !isSubmitting && (
          <Button onClick={nextQuestion} className="w-full" size="lg">
            {isLastQuestion ? "Vedi Risultati" : "Prossima Domanda"}
          </Button>
        )}

        {isSubmitting && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Salvando risposta...</span>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}