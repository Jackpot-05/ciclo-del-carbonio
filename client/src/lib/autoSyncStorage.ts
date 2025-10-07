// Auto-sync storage con Firebase Realtime Database
// Sistema completamente automatico: studente fa quiz → prof vede immediatamente

interface AutoSyncStudent {
  id: string;
  name: string;
  answers: any[];
  score: number;
  isOnline: boolean;
  lastActivity: number;
  device: string;
  classCode: string;
  timestamp: number;
}

class AutoSyncStorage {
  private firebaseUrl = 'https://quiz-carbonio-default-rtdb.europe-west1.firebasedatabase.app';
  private defaultClassCode = 'CLASSE2024'; // Codice classe di default
  
  // Genera codice classe automatico basato su data
  private getClassCode(): string {
    const today = new Date();
    const dayCode = today.toISOString().slice(0, 10).replace(/-/g, '');
    return `QUIZ${dayCode}`; // Es: QUIZ20241007
  }

  // Salva studente nel database Firebase in tempo reale
  async saveStudent(student: Omit<AutoSyncStudent, 'classCode' | 'timestamp'>): Promise<boolean> {
    try {
      const classCode = this.getClassCode();
      const studentData = {
        ...student,
        classCode,
        timestamp: Date.now(),
        lastActivity: Date.now()
      };

      // Salva su Firebase Realtime Database
      const response = await fetch(`${this.firebaseUrl}/classes/${classCode}/students/${student.id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      if (response.ok) {
        console.log('🔥 Studente salvato su Firebase:', student.name);
        
        // Salva anche in localStorage come backup
        this.saveToLocalStorage(studentData);
        return true;
      } else {
        throw new Error('Firebase error');
      }
    } catch (error) {
      console.warn('⚠️ Errore Firebase, uso localStorage:', error);
      
      // Fallback: localStorage
      const studentData = {
        ...student,
        classCode: this.getClassCode(),
        timestamp: Date.now()
      };
      this.saveToLocalStorage(studentData);
      return false;
    }
  }

  // Carica tutti gli studenti della classe di oggi
  async loadClassStudents(): Promise<AutoSyncStudent[]> {
    try {
      const classCode = this.getClassCode();
      
      const response = await fetch(`${this.firebaseUrl}/classes/${classCode}/students.json`);
      
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const students = Object.values(data) as AutoSyncStudent[];
          console.log(`🔥 Caricati ${students.length} studenti da Firebase`);
          
          // Filtra studenti delle ultime 4 ore (sessione attiva)
          const fourHoursAgo = Date.now() - (4 * 60 * 60 * 1000);
          const activeStudents = students.filter(s => s.lastActivity > fourHoursAgo);
          
          return activeStudents.sort((a, b) => b.timestamp - a.timestamp);
        }
      }
      
      throw new Error('No Firebase data');
    } catch (error) {
      console.warn('⚠️ Errore caricamento Firebase, uso localStorage:', error);
      
      // Fallback: localStorage
      return this.loadFromLocalStorage();
    }
  }

  // Ascolta cambiamenti in tempo reale (per dashboard)
  listenToStudents(callback: (students: AutoSyncStudent[]) => void): () => void {
    const classCode = this.getClassCode();
    let isListening = true;
    
    const poll = async () => {
      if (!isListening) return;
      
      try {
        const students = await this.loadClassStudents();
        callback(students);
      } catch (error) {
        console.warn('⚠️ Errore polling:', error);
      }
      
      // Polling ogni 2 secondi per simulare real-time
      if (isListening) {
        setTimeout(poll, 2000);
      }
    };
    
    poll(); // Start immediato
    
    // Ritorna funzione per fermare il listening
    return () => {
      isListening = false;
    };
  }

  // Backup localStorage
  private saveToLocalStorage(student: AutoSyncStudent): void {
    try {
      const existing = JSON.parse(localStorage.getItem('autosync_students') || '[]');
      const filtered = existing.filter((s: any) => s.id !== student.id);
      filtered.push(student);
      localStorage.setItem('autosync_students', JSON.stringify(filtered));
      console.log('📱 Backup salvato in localStorage');
    } catch (error) {
      console.error('❌ Errore localStorage backup:', error);
    }
  }

  private loadFromLocalStorage(): AutoSyncStudent[] {
    try {
      const students = JSON.parse(localStorage.getItem('autosync_students') || '[]');
      console.log(`📱 Caricati ${students.length} studenti da localStorage`);
      
      // Filtra studenti delle ultime 4 ore
      const fourHoursAgo = Date.now() - (4 * 60 * 60 * 1000);
      return students.filter((s: AutoSyncStudent) => s.lastActivity > fourHoursAgo);
    } catch (error) {
      console.error('❌ Errore lettura localStorage:', error);
      return [];
    }
  }

  // Ottieni codice classe corrente per display
  getCurrentClassCode(): string {
    return this.getClassCode();
  }

  // Pulisci dati vecchi (chiamato periodicamente)
  async cleanOldData(): Promise<void> {
    try {
      const classCode = this.getClassCode();
      const students = await this.loadClassStudents();
      const oneHourAgo = Date.now() - (1 * 60 * 60 * 1000);
      const recentStudents = students.filter(s => s.lastActivity > oneHourAgo);
      
      // Ri-salva solo studenti recenti
      await fetch(`${this.firebaseUrl}/classes/${classCode}/students.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          recentStudents.reduce((acc, student) => {
            acc[student.id] = student;
            return acc;
          }, {} as Record<string, AutoSyncStudent>)
        )
      });
      
      console.log(`🧹 Puliti ${students.length - recentStudents.length} studenti inattivi`);
    } catch (error) {
      console.warn('⚠️ Errore pulizia:', error);
    }
  }
}

export const autoSyncStorage = new AutoSyncStorage();