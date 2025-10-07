// Sistema di storage real-time per quiz collaborativo con codice sessione
// Studenti inseriscono codice per unirsi alla sessione del professore

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
  private currentSessionCode: string;
  
  constructor() {
    // Il professore può generare un nuovo codice o recuperarne uno esistente
    this.currentSessionCode = this.getOrCreateSessionCode();
    console.log('🔑 Sessione Quiz:', this.currentSessionCode);
  }

  // Genera un codice sessione di 6 cifre
  generateSessionCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Ottieni o crea codice sessione
  getOrCreateSessionCode(): string {
    const stored = localStorage.getItem('quiz_session_code');
    if (stored) {
      return stored;
    }
    
    const newCode = this.generateSessionCode();
    localStorage.setItem('quiz_session_code', newCode);
    return newCode;
  }

  // Imposta nuovo codice sessione (per professore)
  setSessionCode(code: string): void {
    this.currentSessionCode = code;
    localStorage.setItem('quiz_session_code', code);
    
    // Pulisci dati vecchi quando cambia sessione
    this.clearSession();
    console.log('🔄 Nuova sessione creata:', code);
  }

  // Unisciti a sessione esistente (per studenti)
  joinSession(code: string): boolean {
    try {
      this.currentSessionCode = code.toUpperCase();
      localStorage.setItem('quiz_session_code', this.currentSessionCode);
      console.log('� Unito alla sessione:', this.currentSessionCode);
      return true;
    } catch (error) {
      console.error('❌ Errore unione sessione:', error);
      return false;
    }
  }

  // Salva studente nella sessione corrente
  saveStudent(student: Omit<Student, 'sessionCode'>): boolean {
    try {
      const studentData: Student = {
        ...student,
        sessionCode: this.currentSessionCode,
        lastActivity: Date.now()
      };

      // Carica studenti esistenti
      const storageKey = `quiz_session_${this.currentSessionCode}`;
      const existingStudents = this.loadStudentsFromStorage(storageKey);
      
      // Aggiorna o aggiungi studente
      const updatedStudents = existingStudents.filter(s => s.id !== student.id);
      updatedStudents.push(studentData);
      
      // Salva tutti gli studenti
      localStorage.setItem(storageKey, JSON.stringify(updatedStudents));
      
      // Notifica agli altri tab/finestre
      window.dispatchEvent(new CustomEvent('quiz-update', { 
        detail: { 
          sessionCode: this.currentSessionCode,
          students: updatedStudents, 
          action: 'student-updated',
          student: studentData
        }
      }));
      
      console.log('💾 Studente salvato:', student.name, 'in sessione', this.currentSessionCode);
      return true;
      
    } catch (error) {
      console.error('❌ Errore salvataggio studente:', error);
      return false;
    }
  }

  // Carica studenti dalla sessione corrente
  loadAllStudents(): Student[] {
    const storageKey = `quiz_session_${this.currentSessionCode}`;
    return this.loadStudentsFromStorage(storageKey);
  }

  // Carica studenti da localStorage
  private loadStudentsFromStorage(storageKey: string): Student[] {
    try {
      const data = localStorage.getItem(storageKey);
      if (!data) return [];
      
      const students = JSON.parse(data) as Student[];
      
      // Filtra studenti attivi (ultimi 10 minuti)
      const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
      const activeStudents = students.filter(s => s.lastActivity > tenMinutesAgo);
      
      // Aggiorna stato online (ultimi 2 minuti)
      const twoMinutesAgo = Date.now() - (2 * 60 * 1000);
      return activeStudents.map(s => ({
        ...s,
        isOnline: s.lastActivity > twoMinutesAgo
      }));
      
    } catch (error) {
      console.error('❌ Errore caricamento studenti:', error);
      return [];
    }
  }

  // Ascolta aggiornamenti in tempo reale
  listenToUpdates(callback: (students: Student[]) => void): () => void {
    const handleUpdate = (event: CustomEvent) => {
      if (event.detail && event.detail.sessionCode === this.currentSessionCode) {
        callback(event.detail.students || []);
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

    console.log('🔄 Listening attivo per sessione:', this.currentSessionCode);

    // Cleanup function
    return () => {
      window.removeEventListener('quiz-update', handleUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
      console.log('⏹️ Listening fermato');
    };
  }

  // Ottieni codice sessione corrente
  getSessionCode(): string {
    return this.currentSessionCode;
  }

  // Verifica se sessione esiste
  sessionExists(code: string): boolean {
    const storageKey = `quiz_session_${code.toUpperCase()}`;
    return localStorage.getItem(storageKey) !== null;
  }

  // Pulisci sessione corrente
  clearSession(): void {
    const storageKey = `quiz_session_${this.currentSessionCode}`;
    localStorage.removeItem(storageKey);
    console.log('🧹 Sessione pulita:', this.currentSessionCode);
  }

  // Pulisci tutte le sessioni vecchie
  cleanup(): void {
    try {
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      
      // Trova tutte le chiavi di sessione
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quiz_session_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            const recentStudents = data.filter((s: Student) => s.lastActivity > oneHourAgo);
            
            if (recentStudents.length === 0) {
              localStorage.removeItem(key);
              console.log('🗑️ Rimossa sessione inattiva:', key);
            } else {
              localStorage.setItem(key, JSON.stringify(recentStudents));
            }
          } catch (error) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error('❌ Errore cleanup:', error);
    }
  }
}

// Istanza singleton
export const realTimeStorage = new RealTimeStorage();