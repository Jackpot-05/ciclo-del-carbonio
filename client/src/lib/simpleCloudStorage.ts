// Storage condiviso semplificato per quiz collaborativo
// Usa combinazione di localStorage + URL sharing per cross-device sync

interface SharedStudent {
  id: string;
  name: string;
  answers: any[];
  score: number;
  isOnline: boolean;
  lastActivity: number;
  device: string;
  timestamp: number;
}

class SimpleCloudStorage {
  private storageKey = 'quiz_collaborative_students';
  private sessionKey = 'quiz_session_id';

  // Genera ID sessione unico per questa sessione di quiz
  private getSessionId(): string {
    let sessionId = localStorage.getItem(this.sessionKey);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(this.sessionKey, sessionId);
    }
    return sessionId;
  }

  // Salva studente localmente e crea URL condivisibile
  async saveStudent(student: SharedStudent): Promise<{ success: boolean; shareUrl?: string }> {
    try {
      // Salva in localStorage
      const students = this.loadLocalStudents();
      const existingIndex = students.findIndex(s => s.id === student.id);
      
      if (existingIndex >= 0) {
        students[existingIndex] = student;
      } else {
        students.push(student);
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(students));
      
      // Crea URL condivisibile per dashboard
      const shareData = {
        sessionId: this.getSessionId(),
        student: student,
        timestamp: Date.now()
      };
      
      const encodedData = btoa(JSON.stringify(shareData));
      const shareUrl = `${window.location.origin}/quiz-admin?data=${encodedData}`;
      
      console.log('✅ Studente salvato localmente:', student.name);
      console.log('🔗 URL condivisibile:', shareUrl);
      
      return { success: true, shareUrl };
    } catch (error) {
      console.error('❌ Errore salvataggio studente:', error);
      return { success: false };
    }
  }

  // Carica studenti da localStorage
  loadLocalStudents(): SharedStudent[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const students = JSON.parse(stored);
        console.log(`📱 Caricati ${students.length} studenti da localStorage`);
        return students;
      }
      return [];
    } catch (error) {
      console.error('❌ Errore caricamento localStorage:', error);
      return [];
    }
  }

  // Carica dati condivisi da URL parameters (per dashboard)
  loadFromUrl(): SharedStudent[] {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');
      
      if (dataParam) {
        const decoded = JSON.parse(atob(dataParam));
        const student = decoded.student;
        
        if (student && this.isValidStudent(student)) {
          console.log('🔗 Caricato studente da URL:', student.name);
          
          // Salva anche in localStorage per persistenza
          const localStudents = this.loadLocalStudents();
          const existingIndex = localStudents.findIndex(s => s.id === student.id);
          
          if (existingIndex >= 0) {
            localStudents[existingIndex] = student;
          } else {
            localStudents.push(student);
          }
          
          localStorage.setItem(this.storageKey, JSON.stringify(localStudents));
          
          return [student];
        }
      }
      
      return [];
    } catch (error) {
      console.error('❌ Errore decodifica URL:', error);
      return [];
    }
  }

  // Carica tutti gli studenti (localStorage + URL)
  async loadAllStudents(): Promise<SharedStudent[]> {
    const localStudents = this.loadLocalStudents();
    const urlStudents = this.loadFromUrl();
    
    // Combina e rimuovi duplicati
    const allStudents = [...localStudents];
    
    urlStudents.forEach(urlStudent => {
      const existingIndex = allStudents.findIndex(s => s.id === urlStudent.id);
      if (existingIndex >= 0) {
        // Aggiorna se più recente
        if (urlStudent.timestamp > allStudents[existingIndex].timestamp) {
          allStudents[existingIndex] = urlStudent;
        }
      } else {
        allStudents.push(urlStudent);
      }
    });
    
    // Ordina per timestamp più recente
    allStudents.sort((a, b) => b.timestamp - a.timestamp);
    
    console.log(`📊 Totale studenti caricati: ${allStudents.length}`);
    return allStudents;
  }

  // Valida struttura studente
  private isValidStudent(student: any): boolean {
    return student && 
           typeof student.id === 'string' && 
           typeof student.name === 'string' && 
           Array.isArray(student.answers);
  }

  // Genera QR code URL per condivisione facile
  generateQrCodeUrl(shareUrl: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
  }

  // Pulisci dati vecchi (più di 24 ore)
  cleanOldData(): void {
    try {
      const students = this.loadLocalStudents();
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      const recentStudents = students.filter(s => s.timestamp > oneDayAgo);
      
      if (recentStudents.length !== students.length) {
        localStorage.setItem(this.storageKey, JSON.stringify(recentStudents));
        console.log(`🧹 Puliti ${students.length - recentStudents.length} studenti vecchi`);
      }
    } catch (error) {
      console.error('❌ Errore pulizia dati:', error);
    }
  }
}

export const simpleCloudStorage = new SimpleCloudStorage();