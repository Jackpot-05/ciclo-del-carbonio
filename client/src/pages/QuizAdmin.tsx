import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cloudStorage } from "@/lib/cloudStorage";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BarChart3, 
  Download,
  RefreshCw,
  Eye,
  TrendingUp,
  Cloud,
  Wifi,
  WifiOff
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  lastActivity: number;
}

interface QuizStats {
  totalStudents: number;
  activeStudents: number;
  completedQuizzes: number;
  averageScore: number;
  questionStats: {
    questionId: string;
    question: string;
    correctAnswers: number;
    totalAnswers: number;
    percentage: number;
  }[];
}

// Dati mock per la demo
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Marco Rossi",
    answers: [
      { questionId: "q1", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 120000 },
      { questionId: "q2", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 90000 },
      { questionId: "q3", selectedAnswer: 0, isCorrect: false, timestamp: Date.now() - 60000 },
    ],
    score: 2,
    isOnline: true,
    lastActivity: Date.now() - 30000
  },
  {
    id: "2", 
    name: "Sofia Bianchi",
    answers: [
      { questionId: "q1", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 100000 },
      { questionId: "q2", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 70000 },
      { questionId: "q3", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 40000 },
      { questionId: "q4", selectedAnswer: 2, isCorrect: true, timestamp: Date.now() - 20000 },
    ],
    score: 4,
    isOnline: true,
    lastActivity: Date.now() - 10000
  },
  {
    id: "3",
    name: "Luca Verde",
    answers: [
      { questionId: "q1", selectedAnswer: 0, isCorrect: false, timestamp: Date.now() - 150000 },
      { questionId: "q2", selectedAnswer: 2, isCorrect: false, timestamp: Date.now() - 120000 },
    ],
    score: 0,
    isOnline: false,
    lastActivity: Date.now() - 300000
  },
  {
    id: "4",
    name: "Emma Gialli",
    answers: [
      { questionId: "q1", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 80000 },
      { questionId: "q2", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 50000 },
      { questionId: "q3", selectedAnswer: 1, isCorrect: true, timestamp: Date.now() - 25000 },
    ],
    score: 3,
    isOnline: true,
    lastActivity: Date.now() - 5000
  }
];

const questionTitles = [
  "Principale serbatoio di carbonio negli oceani",
  "Upwelling oceanico e carbonio",
  "Pompa biologica del carbonio",
  "Tempo di residenza del carbonio atmosferico",
  "Causa dell'acidificazione degli oceani"
];

export default function QuizAdmin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cloud' | 'api' | 'local' | 'mock'>('cloud');

  // Funzione per caricare dati dal cloud
  const loadFromCloud = async (): Promise<Student[] | null> => {
    try {
      const cloudStudents = await cloudStorage.loadAllStudents();
      if (cloudStudents.length > 0) {
        console.log('☁️ Caricati studenti dal cloud:', cloudStudents.length);
        return cloudStudents;
      }
      return null;
    } catch (error) {
      console.warn('⚠️ Errore caricamento cloud:', error);
      return null;
    }
  };

  // Funzione per caricare dati da localStorage
  const loadFromLocalStorage = (): Student[] => {
    try {
      const students = JSON.parse(localStorage.getItem('quiz_students') || '[]');
      console.log('📱 Caricati studenti da localStorage:', students.length);
      return students;
    } catch (error) {
      console.error('❌ Errore lettura localStorage:', error);
      return [];
    }
  };

  // Funzione per caricare dati reali dal backend
  const fetchStudentsData = async () => {
    try {
      const response = await fetch('/api/quiz/students');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Dati studenti da API:', data.students?.length || 0);
        return data.students || [];
      } else {
        console.warn('⚠️ API non disponibile, uso localStorage');
        return null;
      }
    } catch (error) {
      console.warn('⚠️ Errore API, uso localStorage:', error);
      return null;
    }
  };

  // Caricamento iniziale dati con priorità cloud
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      
      // 1. Prova prima con Cloud Storage
      const cloudStudents = await loadFromCloud();
      if (cloudStudents && cloudStudents.length > 0) {
        setStudents(cloudStudents);
        setDataSource('cloud');
        console.log('☁️ Usando dati dal cloud storage');
      } else {
        // 2. Fallback: API backend
        const apiStudents = await fetchStudentsData();
        if (apiStudents !== null && apiStudents.length > 0) {
          setStudents(apiStudents);
          setDataSource('api');
          console.log('🚀 Usando dati da API backend');
        } else {
          // 3. Fallback: localStorage
          const localStudents = loadFromLocalStorage();
          if (localStudents.length > 0) {
            setStudents(localStudents);
            setDataSource('local');
            console.log('📱 Usando dati da localStorage');
          } else {
            // 4. Ultimo fallback: mock data
            setStudents(mockStudents);
            setDataSource('mock');
            console.log('📋 Usando mock data come demo');
          }
        }
      }
      
      setIsLoading(false);
      setLastUpdate(new Date().toLocaleTimeString());
    };
    
    loadInitialData();
  }, []);

  // Aggiornamenti automatici (priorità: API > localStorage > mock)
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(async () => {
      // Prova a caricare dati reali dal backend
      const apiStudents = await fetchStudentsData();
      
      if (apiStudents !== null) {
        setStudents(apiStudents);
      } else {
        // Fallback: ricarica da localStorage (potrebbero essere cambiati)
        const localStudents = loadFromLocalStorage();
        if (localStudents.length > 0) {
          setStudents(localStudents);
        } else if (students.length === 0) {
          // Solo se non abbiamo nessun dato, usa mock
          setStudents(mockStudents);
        }
      }
      
      setLastUpdate(new Date().toLocaleTimeString());
    }, 2000); // Ogni 2 secondi
    
    return () => clearInterval(interval);
  }, [autoRefresh, students.length]);

  // Calcola statistiche
  useEffect(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.isOnline).length;
    const completedQuizzes = students.filter(s => s.answers.length === 5).length;
    const totalScores = students.reduce((sum, s) => sum + s.score, 0);
    const averageScore = totalStudents > 0 ? totalScores / totalStudents : 0;
    
    // Statistiche per domanda
    const questionStats = questionTitles.map((question, index) => {
      const questionId = `q${index + 1}`;
      const answers = students.flatMap(s => s.answers.filter(a => a.questionId === questionId));
      const correctAnswers = answers.filter(a => a.isCorrect).length;
      const totalAnswers = answers.length;
      
      return {
        questionId,
        question,
        correctAnswers,
        totalAnswers,
        percentage: totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0
      };
    });
    
    setStats({
      totalStudents,
      activeStudents, 
      completedQuizzes,
      averageScore,
      questionStats
    });
  }, [students]);

  const formatLastActivity = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) return `${minutes}m fa`;
    return `${seconds}s fa`;
  };

  const exportData = () => {
    const csvData = students.map(student => ({
      Nome: student.name,
      ID: student.id,
      Punteggio: student.score,
      Risposte: student.answers.length,
      Online: student.isOnline ? "Sì" : "No",
      UltimaAttivita: new Date(student.lastActivity).toLocaleString()
    }));
    
    console.log("Esportazione dati:", csvData);
    // Qui implementeresti l'export CSV reale
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Dashboard Quiz Collaborativo
          </h1>
          <p className="text-muted-foreground">
            Monitoraggio in tempo reale delle risposte degli studenti
          </p>
          {lastUpdate && (
            <div className="text-xs text-muted-foreground mt-1">
              Ultimo aggiornamento: {lastUpdate}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto-refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Esporta
          </Button>
        </div>
      </div>

      {/* Statistiche generali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{stats.totalStudents}</div>
              <div className="text-sm text-muted-foreground">Studenti totali</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stats.activeStudents}</div>
              <div className="text-sm text-muted-foreground">Online ora</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-foreground">{stats.completedQuizzes}</div>
              <div className="text-sm text-muted-foreground">Quiz completati</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-foreground">{stats.averageScore.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Media punteggio</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistiche per domanda */}
      <Card className="p-6">
        <h2 className="text-xl font-heading font-semibold mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Analisi per Domanda
        </h2>
        
        <div className="space-y-4">
          {stats.questionStats.map((stat, index) => (
            <div key={stat.questionId} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  Q{index + 1}: {stat.question}
                </span>
                <Badge variant={stat.percentage >= 70 ? "default" : stat.percentage >= 50 ? "secondary" : "destructive"}>
                  {stat.percentage}%
                </Badge>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    stat.percentage >= 70 ? "bg-green-500" :
                    stat.percentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{stat.correctAnswers} corrette su {stat.totalAnswers} risposte</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Lista studenti */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">
            Studenti Attivi
          </h2>
          
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedStudent?.id === student.id ? "bg-primary/10 border-primary" : "bg-card border-border"
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${student.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                      <div>
                        <div className="font-medium text-foreground">{student.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {student.id.slice(-6)}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">
                        {student.score}/{student.answers.length}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatLastActivity(student.lastActivity)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex space-x-1">
                    {[1, 2, 3, 4, 5].map((qNum) => {
                      const answer = student.answers.find(a => a.questionId === `q${qNum}`);
                      if (!answer) {
                        return <div key={qNum} className="w-4 h-4 bg-gray-200 rounded" />;
                      }
                      return (
                        <div
                          key={qNum}
                          className={`w-4 h-4 rounded ${
                            answer.isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Dettagli studente selezionato */}
        <Card className="p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">
            Dettagli Studente
          </h2>
          
          {selectedStudent ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${selectedStudent.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                <div>
                  <div className="font-semibold text-foreground">{selectedStudent.name}</div>
                  <div className="text-sm text-muted-foreground">ID: {selectedStudent.id}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Punteggio</div>
                  <div className="text-xl font-bold text-foreground">
                    {selectedStudent.score}/{selectedStudent.answers.length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Percentuale</div>
                  <div className="text-xl font-bold text-foreground">
                    {selectedStudent.answers.length > 0 
                      ? Math.round((selectedStudent.score / selectedStudent.answers.length) * 100) 
                      : 0}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Risposte</h3>
                {selectedStudent.answers.map((answer, index) => (
                  <div key={answer.questionId} className="flex items-center space-x-3 p-2 rounded bg-card">
                    <span className="text-sm font-medium text-muted-foreground">Q{index + 1}</span>
                    {answer.isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-foreground">
                      Risposta {String.fromCharCode(65 + answer.selectedAnswer)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(answer.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Seleziona uno studente per vedere i dettagli
              </p>
            </div>
          )}
        </Card>
      </div>
      
      {autoRefresh && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            La dashboard si aggiorna automaticamente ogni 3 secondi per mostrare le nuove risposte in tempo reale.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}