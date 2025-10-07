import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { firebaseStorage } from "@/lib/firebaseStorage";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BarChart3, 
  RefreshCw,
  Eye,
  TrendingUp
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
  device: string;
  sessionCode: string;
}

export default function QuizAdmin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionCode, setSessionCode] = useState<string>('');

  // Genera nuovo codice sessione
  const generateNewSession = async () => {
    const newCode = firebaseStorage.generateSessionCode();
    const success = await firebaseStorage.createSession(newCode);
    if (success) {
      setSessionCode(newCode);
      setStudents([]); // Reset studenti per nuova sessione
      console.log('🔄 Nuova sessione generata:', newCode);
    } else {
      alert('Errore nella creazione della sessione');
    }
  };

  // Carica dati sessione
  const loadSessionData = async () => {
    if (!sessionCode) return;
    
    try {
      const sessionData = await firebaseStorage.getSessionData(sessionCode);
      if (sessionData && sessionData.students) {
        const studentsArray = Object.entries(sessionData.students).map(([id, data]: [string, any]) => ({
          id,
          name: data.name + (data.surname ? ` ${data.surname}` : ''),
          answers: Object.entries(data.answers || {}).map(([qIndex, answer]: [string, any]) => ({
            questionId: `q${parseInt(qIndex) + 1}`,
            selectedAnswer: answer.answer,
            isCorrect: answer.isCorrect,
            timestamp: answer.timestamp
          })),
          score: data.score || 0,
          isOnline: Date.now() - (data.lastActive || 0) < 30000, // Online se attivo negli ultimi 30 sec
          lastActivity: data.lastActive || 0,
          device: 'Web',
          sessionCode: sessionCode
        }));
        setStudents(studentsArray);
        setLastUpdate(new Date().toLocaleTimeString());
        console.log('� Dati caricati:', studentsArray.length, 'studenti');
      }
    } catch (error) {
      console.error('Errore caricamento dati:', error);
    }
  };

  // Carica dati iniziali e imposta refresh automatico
  useEffect(() => {
    setIsLoading(true);
    
    // Genera codice iniziale se non presente
    if (!sessionCode) {
      generateNewSession();
    } else {
      loadSessionData();
    }
    
    setIsLoading(false);
    
    // Refresh automatico ogni 5 secondi
    const interval = setInterval(() => {
      if (sessionCode) {
        loadSessionData();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sessionCode]);

  // Calcola statistiche
  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.isOnline).length,
    completedQuizzes: students.filter(s => s.answers.length >= 5).length,
    averageScore: students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / students.length) 
      : 0
  };

  const formatLastActivity = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Ora';
    if (minutes < 60) return `${minutes}m fa`;
    return `${Math.floor(minutes / 60)}h fa`;
  };

  const getDeviceIcon = (device: string) => {
    return device === 'Mobile' ? '📱' : '💻';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-emerald-800">Quiz Live Dashboard</h1>
          <p className="text-emerald-600">Monitoraggio real-time degli studenti</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Codice Sessione: {sessionCode}
            </Badge>
            <Button 
              onClick={generateNewSession}
              variant="outline"
              className="px-4 py-2"
            >
              Genera Nuovo Codice
            </Button>
          </div>
          <div className="text-sm text-emerald-600 max-w-md mx-auto">
            Gli studenti devono inserire il codice <strong>{sessionCode}</strong> per unirsi al quiz
          </div>
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold text-emerald-800">{stats.totalStudents}</p>
                <p className="text-sm text-gray-600">Studenti Totali</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.activeStudents}</p>
                <p className="text-sm text-gray-600">Online Ora</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-800">{stats.completedQuizzes}</p>
                <p className="text-sm text-gray-600">Quiz Completati</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-800">{stats.averageScore}/5</p>
                <p className="text-sm text-gray-600">Punteggio Medio</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Status */}
        <Alert className="bg-emerald-50 border-emerald-200">
          <RefreshCw className="w-4 h-4 text-emerald-600" />
          <AlertDescription className="text-emerald-700">
            Aggiornamento automatico attivo - Ultimo: {lastUpdate || 'In corso...'}
          </AlertDescription>
        </Alert>

        {/* Lista Studenti */}
        <Card className="bg-white/90 backdrop-blur">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-emerald-800">Studenti Attivi</h2>
              <Badge variant="secondary">
                {students.length} studenti
              </Badge>
            </div>
            
            <ScrollArea className="h-96">
              {students.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nessuno studente connesso</p>
                  <p className="text-sm">Gli studenti appariranno qui appena iniziano il quiz</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Progresso</TableHead>
                      <TableHead>Punteggio</TableHead>
                      <TableHead>Ultima Attività</TableHead>
                      <TableHead>Stato</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow 
                        key={student.id}
                        className="cursor-pointer hover:bg-emerald-50"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell>
                          <span className="text-lg">{getDeviceIcon(student.device)}</span>
                          <span className="ml-2 text-sm text-gray-600">{student.device}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(student.answers.length / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {student.answers.length}/5
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.score >= 3 ? "default" : "secondary"}>
                            {student.score}/5
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatLastActivity(student.lastActivity)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={student.isOnline ? "default" : "secondary"}
                            className={student.isOnline ? "bg-green-500" : ""}
                          >
                            {student.isOnline ? "Online" : "Offline"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </div>
        </Card>

        {/* Dettagli Studente */}
        {selectedStudent && (
          <Card className="bg-white/90 backdrop-blur">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-emerald-800">
                  Dettagli: {selectedStudent.name}
                </h3>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStudent(null)}
                >
                  Chiudi
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong>Device:</strong> {selectedStudent.device}</p>
                  <p><strong>Punteggio:</strong> {selectedStudent.score}/5</p>
                  <p><strong>Risposte:</strong> {selectedStudent.answers.length}/5</p>
                  <p><strong>Stato:</strong> 
                    <Badge className="ml-2" variant={selectedStudent.isOnline ? "default" : "secondary"}>
                      {selectedStudent.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Ultime Risposte:</h4>
                  {selectedStudent.answers.length === 0 ? (
                    <p className="text-gray-500">Nessuna risposta ancora</p>
                  ) : (
                    <div className="space-y-1">
                      {selectedStudent.answers.slice(-3).map((answer, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {answer.isCorrect ? 
                            <CheckCircle className="w-4 h-4 text-green-500" /> : 
                            <XCircle className="w-4 h-4 text-red-500" />
                          }
                          <span className="text-sm">
                            Q{answer.questionId} - {answer.isCorrect ? 'Corretta' : 'Sbagliata'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}