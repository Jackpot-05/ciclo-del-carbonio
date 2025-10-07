// Sistema di storage real-time semplificato per quiz collaborativo
// Utilizza localStorage + polling per simulare sync cross-device

interface Student {
  id: string;
  name: string;
  answers: any[];
  score: number;
  isOnline: boolean;
  lastActivity: number;
  device: string;
  sessionCode: string;
}

class RealTimeStorage {
  private sessionCode: string;
  private storageKey: string;
  
  constructor() {
    // Genera codice sessione basato su data/ora
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16).replace(/[-:T]/g, '');
    this.sessionCode = `SESSION${dateStr}`;
    this.storageKey = `quiz_session_${this.sessionCode}`;
    
    console.log('🔑 Sessione attiva:', this.sessionCode);
  }

  // Salva studente localmente con timestamp
  saveStudent(student: Omit<Student, 'sessionCode'>): boolean {
    try {
      const studentData: Student = {
        ...student,
        sessionCode: this.sessionCode,
        lastActivity: Date.now()
      };

      // Carica studenti esistenti
      const existingStudents = this.loadAllStudents();
      
      // Aggiorna o aggiungi studente
      const updatedStudents = existingStudents.filter(s => s.id !== student.id);
      updatedStudents.push(studentData);
      
      // Salva tutti gli studenti
      localStorage.setItem(this.storageKey, JSON.stringify(updatedStudents));
      
      // Notifica agli altri tab/finestre
      window.dispatchEvent(new CustomEvent('quiz-update', { 
        detail: { students: updatedStudents, action: 'student-updated' }
      }));
      
      console.log('💾 Studente salvato:', student.name, 'in sessione', this.sessionCode);
      return true;
      
    } catch (error) {
      console.error('❌ Errore salvataggio studente:', error);
      return false;
    }
  }

  // Carica tutti gli studenti della sessione corrente
  loadAllStudents(): Student[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      
      const students = JSON.parse(data) as Student[];
      
      // Filtra studenti attivi (ultimi 10 minuti)
      const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
      const activeStudents = students.filter(s => s.lastActivity > tenMinutesAgo);
      
      return activeStudents;
    } catch (error) {
      console.error('❌ Errore caricamento studenti:', error);
      return [];
    }
  }

  // Ascolta aggiornamenti in tempo reale (per dashboard)
  listenToUpdates(callback: (students: Student[]) => void): () => void {
    const handleUpdate = (event: CustomEvent) => {
      if (event.detail && event.detail.students) {
        callback(event.detail.students);
      }
    };

    const handleStorageChange = () => {
      const students = this.loadAllStudents();
      callback(students);
    };

    // Ascolta eventi custom e storage changes
    window.addEventListener('quiz-update', handleUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    // Polling di backup ogni 3 secondi
    const pollInterval = setInterval(() => {
      const students = this.loadAllStudents();
      callback(students);
    }, 3000);

    // Caricamento iniziale
    const initialStudents = this.loadAllStudents();
    callback(initialStudents);

    // Cleanup function
    return () => {
      window.removeEventListener('quiz-update', handleUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }

  // Ottieni codice sessione corrente
  getSessionCode(): string {
    return this.sessionCode;
  }

  // Pulisci dati vecchi
  cleanup(): void {
    try {
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      const students = this.loadAllStudents();
      const recentStudents = students.filter(s => s.lastActivity > oneHourAgo);
      
      localStorage.setItem(this.storageKey, JSON.stringify(recentStudents));
      console.log('🧹 Cleanup completato, rimossi', students.length - recentStudents.length, 'studenti inattivi');
    } catch (error) {
      console.error('❌ Errore cleanup:', error);
    }
  }
}

// Istanza singleton
export const realTimeStorage = new RealTimeStorage();