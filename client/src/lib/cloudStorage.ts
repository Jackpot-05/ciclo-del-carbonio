// Cloud storage per sincronizzazione cross-device
// Usa JSONBin.io come storage gratuito e semplice

const JSONBIN_API_URL = 'https://api.jsonbin.io/v3';
const BIN_ID = '67044f67ad19ca34f8b8e8a5'; // ID bin dedicato per il quiz
const API_KEY = '$2a$10$8rZnW8W5H6F8WJ2G.YqP6OQ8H5F7J9K3L8M9N2P5Q8R7S6T9U2V3'; // API key gratuita

interface CloudStudent {
  id: string;
  name: string;
  answers: any[];
  score: number;
  isOnline: boolean;
  lastActivity: number;
  device: string;
  createdAt: number;
}

class CloudStorage {
  private fallbackToLocal = true;

  // Salva studente nel cloud
  async saveStudent(student: CloudStudent): Promise<boolean> {
    try {
      // Aggiungi info dispositivo
      const enrichedStudent = {
        ...student,
        device: this.getDeviceInfo(),
        createdAt: Date.now()
      };

      // Carica dati esistenti
      const existingData = await this.loadAllStudents();
      
      // Aggiorna o aggiungi nuovo studente
      const updatedStudents = existingData.filter(s => s.id !== student.id);
      updatedStudents.push(enrichedStudent);

      // Salva nel cloud
      const response = await fetch(`${JSONBIN_API_URL}/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
          'X-Bin-Name': 'Quiz Collaborativo - Ciclo del Carbonio'
        },
        body: JSON.stringify({
          students: updatedStudents,
          lastUpdate: Date.now()
        })
      });

      if (response.ok) {
        console.log('☁️ Studente salvato nel cloud:', enrichedStudent.name);
        return true;
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      console.warn('⚠️ Errore salvataggio cloud, uso localStorage:', error);
      
      if (this.fallbackToLocal) {
        this.saveToLocalStorage(student);
      }
      return false;
    }
  }

  // Carica tutti gli studenti dal cloud
  async loadAllStudents(): Promise<CloudStudent[]> {
    try {
      const response = await fetch(`${JSONBIN_API_URL}/b/${BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });

      if (response.ok) {
        const data = await response.json();
        const students = data.record?.students || [];
        console.log(`☁️ Caricati ${students.length} studenti dal cloud`);
        return students;
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      console.warn('⚠️ Errore caricamento cloud, uso localStorage:', error);
      
      if (this.fallbackToLocal) {
        return this.loadFromLocalStorage();
      }
      return [];
    }
  }

  // Fallback localStorage
  private saveToLocalStorage(student: CloudStudent) {
    try {
      const existing = JSON.parse(localStorage.getItem('quiz_students') || '[]');
      const filtered = existing.filter((s: any) => s.id !== student.id);
      filtered.push(student);
      localStorage.setItem('quiz_students', JSON.stringify(filtered));
      console.log('📱 Salvato in localStorage come fallback');
    } catch (error) {
      console.error('❌ Errore localStorage:', error);
    }
  }

  private loadFromLocalStorage(): CloudStudent[] {
    try {
      const students = JSON.parse(localStorage.getItem('quiz_students') || '[]');
      console.log(`📱 Caricati ${students.length} studenti da localStorage`);
      return students;
    } catch (error) {
      console.error('❌ Errore lettura localStorage:', error);
      return [];
    }
  }

  private getDeviceInfo(): string {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      return 'Mobile';
    } else if (/Tablet/.test(ua)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }

  // Pulisci dati vecchi (più di 24 ore)
  async cleanOldData(): Promise<void> {
    try {
      const students = await this.loadAllStudents();
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      const recentStudents = students.filter(s => s.lastActivity > oneDayAgo);
      
      if (recentStudents.length !== students.length) {
        await fetch(`${JSONBIN_API_URL}/b/${BIN_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
          },
          body: JSON.stringify({
            students: recentStudents,
            lastUpdate: Date.now()
          })
        });
        console.log(`🧹 Puliti ${students.length - recentStudents.length} studenti vecchi`);
      }
    } catch (error) {
      console.warn('⚠️ Errore pulizia dati:', error);
    }
  }
}

export const cloudStorage = new CloudStorage();