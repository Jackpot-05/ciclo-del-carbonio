// Sistema di storage Firebase gratuito per quiz collaborativo
export class FirebaseStorage {
  private firebaseUrl = 'https://ciclo-carbonio-quiz-default-rtdb.europe-west1.firebasedatabase.app';
  
  // Genera codice sessione unico
  generateSessionCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Crea nuova sessione quiz
  async createSession(sessionCode: string) {
    try {
      const response = await fetch(`${this.firebaseUrl}/sessions/${sessionCode}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          createdAt: Date.now(),
          students: {},
          active: true
        })
      });
      return response.ok;
    } catch (error) {
      console.warn('Firebase non disponibile, uso localStorage', error);
      localStorage.setItem(`session_${sessionCode}`, JSON.stringify({
        createdAt: Date.now(),
        students: {},
        active: true
      }));
      return true;
    }
  }

  // Studente si registra nella sessione
  async joinSession(sessionCode: string, studentName: string, studentSurname: string) {
    const studentId = `${studentName}_${studentSurname}_${Date.now()}`;
    const studentData = {
      name: studentName,
      surname: studentSurname,
      joinedAt: Date.now(),
      answers: {},
      score: 0,
      completed: false,
      lastActive: Date.now()
    };

    try {
      const response = await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      
      if (response.ok) {
        // Salva anche localmente per backup
        localStorage.setItem('currentSession', sessionCode);
        localStorage.setItem('currentStudent', studentId);
        return { success: true, studentId };
      }
    } catch (error) {
      console.warn('Firebase non disponibile, uso localStorage', error);
    }

    // Fallback localStorage
    const sessionKey = `session_${sessionCode}`;
    const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
    session.students[studentId] = studentData;
    localStorage.setItem(sessionKey, JSON.stringify(session));
    localStorage.setItem('currentSession', sessionCode);
    localStorage.setItem('currentStudent', studentId);
    
    return { success: true, studentId };
  }

  // Salva risposta studente
  async saveAnswer(sessionCode: string, studentId: string, questionIndex: number, answer: number, isCorrect: boolean) {
    const answerData = {
      answer,
      isCorrect,
      timestamp: Date.now()
    };

    try {
      const response = await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}/answers/${questionIndex}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData)
      });
      
      if (response.ok) {
        // Aggiorna anche il punteggio
        await this.updateScore(sessionCode, studentId);
        return true;
      }
    } catch (error) {
      console.warn('Firebase non disponibile, uso localStorage', error);
    }

    // Fallback localStorage
    const sessionKey = `session_${sessionCode}`;
    const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
    if (!session.students[studentId]) return false;
    
    if (!session.students[studentId].answers) {
      session.students[studentId].answers = {};
    }
    session.students[studentId].answers[questionIndex] = answerData;
    
    // Calcola punteggio
    const answers = session.students[studentId].answers;
    const score = Object.values(answers).filter((a: any) => a.isCorrect).length;
    session.students[studentId].score = score;
    session.students[studentId].completed = Object.keys(answers).length >= 5;
    session.students[studentId].lastActive = Date.now();
    
    localStorage.setItem(sessionKey, JSON.stringify(session));
    
    // Notifica altri tab
    window.dispatchEvent(new CustomEvent('sessionUpdate', { detail: { sessionCode } }));
    
    return true;
  }

  // Aggiorna punteggio studente
  private async updateScore(sessionCode: string, studentId: string) {
    try {
      // Prima leggi tutte le risposte
      const answersResponse = await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}/answers.json`);
      if (!answersResponse.ok) return;
      
      const answers = await answersResponse.json() || {};
      const score = Object.values(answers).filter((a: any) => a?.isCorrect).length;
      const completed = Object.keys(answers).length >= 5;
      
      // Aggiorna punteggio e stato
      await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}/score.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(score)
      });
      
      await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}/completed.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completed)
      });
      
      await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}/lastActive.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Date.now())
      });
      
    } catch (error) {
      console.warn('Errore aggiornamento punteggio Firebase', error);
    }
  }

  // Ottieni tutti gli studenti della sessione (per dashboard)
  async getSessionData(sessionCode: string) {
    try {
      const response = await fetch(`${this.firebaseUrl}/sessions/${sessionCode}.json`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Firebase non disponibile, uso localStorage', error);
    }

    // Fallback localStorage
    const sessionKey = `session_${sessionCode}`;
    const session = localStorage.getItem(sessionKey);
    return session ? JSON.parse(session) : null;
  }

  // Controlla se sessione esiste
  async sessionExists(sessionCode: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.firebaseUrl}/sessions/${sessionCode}.json`);
      if (response.ok) {
        const data = await response.json();
        return data !== null && data.active === true;
      }
    } catch (error) {
      console.warn('Firebase non disponibile, controllo localStorage', error);
    }

    // Fallback localStorage
    const sessionKey = `session_${sessionCode}`;
    const session = localStorage.getItem(sessionKey);
    return session !== null;
  }

  // Heartbeat per tenere studente attivo
  async updateHeartbeat(sessionCode: string, studentId: string) {
    try {
      await fetch(`${this.firebaseUrl}/sessions/${sessionCode}/students/${studentId}/lastActive.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Date.now())
      });
    } catch (error) {
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      if (session.students[studentId]) {
        session.students[studentId].lastActive = Date.now();
        localStorage.setItem(sessionKey, JSON.stringify(session));
      }
    }
  }
}

export const firebaseStorage = new FirebaseStorage();