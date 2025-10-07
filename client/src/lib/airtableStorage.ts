// Sistema Airtable per Quiz Collaborativo
export class AirtableQuizStorage {
  private baseId = 'your_base_id'; // Da configurare
  private apiKey = 'your_api_key'; // Da configurare  
  private baseUrl = `https://api.airtable.com/v0/${this.baseId}`;

  constructor() {
    // Leggi da variabili d'ambiente se disponibili
    if (typeof process !== 'undefined' && process.env) {
      this.baseId = process.env.AIRTABLE_BASE_ID || this.baseId;
      this.apiKey = process.env.AIRTABLE_API_KEY || this.apiKey;
    }
    
    // Fallback: leggi da localStorage per demo (SOLO per sviluppo)
    if (typeof localStorage !== 'undefined') {
      this.baseId = localStorage.getItem('airtable_base_id') || this.baseId;
      this.apiKey = localStorage.getItem('airtable_api_key') || this.apiKey;
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  // Genera codice sessione unico
  generateSessionCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Crea nuova sessione quiz
  async createSession(sessionCode: string, professorName: string = 'Professor') {
    try {
      const response = await fetch(`${this.baseUrl}/Sessions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          fields: {
            'Session Code': sessionCode,
            'Professor Name': professorName,
            'Created At': new Date().toISOString(),
            'Active': true,
            'Student Count': 0
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Sessione creata su Airtable:', sessionCode);
      return { success: true, sessionId: data.id };
    } catch (error) {
      console.warn('⚠️ Errore Airtable, usando localStorage:', error);
      
      // Fallback localStorage
      const session = {
        code: sessionCode,
        professor: professorName,
        createdAt: Date.now(),
        active: true,
        students: {}
      };
      localStorage.setItem(`session_${sessionCode}`, JSON.stringify(session));
      return { success: true, sessionId: `local_${sessionCode}` };
    }
  }

  // Studente si unisce alla sessione
  async joinSession(sessionCode: string, studentName: string, studentSurname: string = '') {
    const studentId = `${studentName}_${studentSurname}_${Date.now()}`;
    
    try {
      // Prima verifica se la sessione esiste
      const sessionExists = await this.sessionExists(sessionCode);
      if (!sessionExists) {
        throw new Error('Session not found');
      }

      const response = await fetch(`${this.baseUrl}/Students`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          fields: {
            'Student ID': studentId,
            'Session Code': sessionCode,
            'Name': studentName,
            'Surname': studentSurname,
            'Joined At': new Date().toISOString(),
            'Score': 0,
            'Completed': false,
            'Last Active': new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Studente registrato su Airtable:', studentName);
      return { success: true, studentId, airtableId: data.id };
    } catch (error) {
      console.warn('⚠️ Errore Airtable, usando localStorage:', error);
      
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      
      session.students = session.students || {};
      session.students[studentId] = {
        name: studentName,
        surname: studentSurname,
        joinedAt: Date.now(),
        score: 0,
        completed: false,
        answers: {},
        lastActive: Date.now()
      };
      
      localStorage.setItem(sessionKey, JSON.stringify(session));
      return { success: true, studentId, airtableId: `local_${studentId}` };
    }
  }

  // Salva risposta studente
  async saveAnswer(sessionCode: string, studentId: string, questionIndex: number, answer: number, isCorrect: boolean) {
    try {
      const response = await fetch(`${this.baseUrl}/Answers`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          fields: {
            'Student ID': studentId,
            'Session Code': sessionCode,
            'Question Index': questionIndex,
            'Answer': answer,
            'Is Correct': isCorrect,
            'Timestamp': new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Aggiorna anche il punteggio dello studente
      await this.updateStudentScore(sessionCode, studentId);
      
      console.log('✅ Risposta salvata su Airtable');
      return true;
    } catch (error) {
      console.warn('⚠️ Errore Airtable, usando localStorage:', error);
      
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      
      if (session.students && session.students[studentId]) {
        session.students[studentId].answers = session.students[studentId].answers || {};
        session.students[studentId].answers[questionIndex] = {
          answer,
          isCorrect,
          timestamp: Date.now()
        };
        
        // Calcola punteggio
        const answers = session.students[studentId].answers;
        const score = Object.values(answers).filter((a: any) => a.isCorrect).length;
        session.students[studentId].score = score;
        session.students[studentId].completed = Object.keys(answers).length >= 5;
        session.students[studentId].lastActive = Date.now();
        
        localStorage.setItem(sessionKey, JSON.stringify(session));
        
        // Notifica altri tab
        window.dispatchEvent(new CustomEvent('quizUpdate', { 
          detail: { sessionCode, studentId, questionIndex, score } 
        }));
      }
      
      return true;
    }
  }

  // Aggiorna punteggio studente
  private async updateStudentScore(sessionCode: string, studentId: string) {
    try {
      // Prima ottieni tutte le risposte dello studente
      const answersResponse = await fetch(
        `${this.baseUrl}/Answers?filterByFormula=AND({Student ID}='${studentId}',{Session Code}='${sessionCode}')`,
        { headers: this.getHeaders() }
      );

      if (answersResponse.ok) {
        const answersData = await answersResponse.json();
        const correctAnswers = answersData.records.filter((record: any) => record.fields['Is Correct']).length;
        const totalAnswers = answersData.records.length;

        // Trova il record dello studente
        const studentResponse = await fetch(
          `${this.baseUrl}/Students?filterByFormula=AND({Student ID}='${studentId}',{Session Code}='${sessionCode}')`,
          { headers: this.getHeaders() }
        );

        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          if (studentData.records.length > 0) {
            const studentRecord = studentData.records[0];
            
            // Aggiorna punteggio
            await fetch(`${this.baseUrl}/Students/${studentRecord.id}`, {
              method: 'PATCH',
              headers: this.getHeaders(),
              body: JSON.stringify({
                fields: {
                  'Score': correctAnswers,
                  'Completed': totalAnswers >= 5,
                  'Last Active': new Date().toISOString()
                }
              })
            });
          }
        }
      }
    } catch (error) {
      console.warn('Errore aggiornamento punteggio:', error);
    }
  }

  // Ottieni dati sessione per dashboard
  async getSessionData(sessionCode: string) {
    try {
      // Ottieni studenti della sessione
      const studentsResponse = await fetch(
        `${this.baseUrl}/Students?filterByFormula={Session Code}='${sessionCode}'`,
        { headers: this.getHeaders() }
      );

      if (!studentsResponse.ok) {
        throw new Error('Failed to fetch students');
      }

      const studentsData = await studentsResponse.json();
      
      // Ottieni risposte per calcolare statistiche
      const answersResponse = await fetch(
        `${this.baseUrl}/Answers?filterByFormula={Session Code}='${sessionCode}'`,
        { headers: this.getHeaders() }
      );

      let answersData = { records: [] };
      if (answersResponse.ok) {
        answersData = await answersResponse.json();
      }

      // Trasforma dati per compatibilità
      const students = studentsData.records.map((record: any) => {
        const fields = record.fields;
        const studentAnswers = answersData.records
          .filter((answer: any) => answer.fields['Student ID'] === fields['Student ID'])
          .map((answer: any) => ({
            questionId: `q${answer.fields['Question Index'] + 1}`,
            selectedAnswer: answer.fields['Answer'],
            isCorrect: answer.fields['Is Correct'],
            timestamp: new Date(answer.fields['Timestamp']).getTime()
          }));

        return {
          id: fields['Student ID'],
          name: `${fields['Name']} ${fields['Surname'] || ''}`.trim(),
          answers: studentAnswers,
          score: fields['Score'] || 0,
          isOnline: Date.now() - new Date(fields['Last Active']).getTime() < 30000,
          lastActivity: new Date(fields['Last Active']).getTime(),
          device: 'Web',
          sessionCode: sessionCode
        };
      });

      console.log('✅ Dati sessione caricati da Airtable:', students.length, 'studenti');
      return { students };
    } catch (error) {
      console.warn('⚠️ Errore Airtable, usando localStorage:', error);
      
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      
      if (session.students) {
        const students = Object.entries(session.students).map(([id, data]: [string, any]) => ({
          id,
          name: `${data.name} ${data.surname || ''}`.trim(),
          answers: Object.entries(data.answers || {}).map(([qIndex, answer]: [string, any]) => ({
            questionId: `q${parseInt(qIndex) + 1}`,
            selectedAnswer: answer.answer,
            isCorrect: answer.isCorrect,
            timestamp: answer.timestamp
          })),
          score: data.score || 0,
          isOnline: Date.now() - (data.lastActive || 0) < 30000,
          lastActivity: data.lastActive || 0,
          device: 'Web',
          sessionCode: sessionCode
        }));
        
        return { students };
      }
      
      return { students: [] };
    }
  }

  // Controlla se sessione esiste
  async sessionExists(sessionCode: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Sessions?filterByFormula=AND({Session Code}='${sessionCode}',{Active}=TRUE())`,
        { headers: this.getHeaders() }
      );

      if (response.ok) {
        const data = await response.json();
        return data.records.length > 0;
      }
      return false;
    } catch (error) {
      console.warn('⚠️ Errore verifica sessione, usando localStorage:', error);
      
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      return localStorage.getItem(sessionKey) !== null;
    }
  }

  // Heartbeat per mantenere studente attivo
  async updateHeartbeat(sessionCode: string, studentId: string) {
    try {
      // Trova e aggiorna record studente
      const studentResponse = await fetch(
        `${this.baseUrl}/Students?filterByFormula=AND({Student ID}='${studentId}',{Session Code}='${sessionCode}')`,
        { headers: this.getHeaders() }
      );

      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        if (studentData.records.length > 0) {
          const studentRecord = studentData.records[0];
          
          await fetch(`${this.baseUrl}/Students/${studentRecord.id}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({
              fields: {
                'Last Active': new Date().toISOString()
              }
            })
          });
        }
      }
    } catch (error) {
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      if (session.students && session.students[studentId]) {
        session.students[studentId].lastActive = Date.now();
        localStorage.setItem(sessionKey, JSON.stringify(session));
      }
    }
  }
}

export const airtableStorage = new AirtableQuizStorage();