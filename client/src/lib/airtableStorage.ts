// Sistema Airtable per Quiz Collaborativo
export class AirtableQuizStorage {
  private baseId = 'your_base_id'; // Da configurare
  private apiKey = 'your_api_key'; // Da configurare  
  private baseUrl = `https://api.airtable.com/v0/${this.baseId}`;
  private enabled = false;
  private tableSessions = 'Sessions';
  private tableStudents = 'Students';
  private tableAnswers = 'Answers';
  private forceDisabled = false;

  constructor() {
    // Leggi env Vite lato client
    const viteEnv = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : undefined;
    if (viteEnv) {
      this.baseId = viteEnv.VITE_AIRTABLE_BASE_ID || this.baseId;
      this.apiKey = viteEnv.VITE_AIRTABLE_API_KEY || this.apiKey;
      // Supporto retrocompatibile: VITE_AIRTABLE_TABLE_NAME come alias per la tabella Sessions
      this.tableSessions =
        viteEnv.VITE_AIRTABLE_SESSIONS_TABLE ||
        viteEnv.VITE_AIRTABLE_TABLE_NAME ||
        this.tableSessions;
      this.tableStudents = viteEnv.VITE_AIRTABLE_STUDENTS_TABLE || this.tableStudents;
      this.tableAnswers = viteEnv.VITE_AIRTABLE_ANSWERS_TABLE || this.tableAnswers;
      // Flag per forzare il disable da env
      const f = (viteEnv.VITE_AIRTABLE_FORCE_DISABLED || '').toString().toLowerCase();
      this.forceDisabled = f === '1' || f === 'true';
    }

    // Fallback: leggi da localStorage (SOLO sviluppo/override manuale)
    try {
      if (typeof localStorage !== 'undefined') {
        this.baseId = localStorage.getItem('airtable_base_id') || this.baseId;
        this.apiKey = localStorage.getItem('airtable_api_key') || this.apiKey;
      }
    } catch (_) {}

    // Forza il disable per la sessione (se precedentemente fallita l'autenticazione)
    try {
      if (typeof sessionStorage !== 'undefined') {
        const s = sessionStorage.getItem('airtable_force_disabled');
        if (s === '1') this.forceDisabled = true;
      }
    } catch {}

    // Abilita Airtable solo se configurazione valida e non forzata a OFF
    const looksLikeBase = /^app[\w]+$/.test(this.baseId);
    const looksLikePat = !/^VITE_/i.test(this.apiKey) && !/^your_/i.test(this.apiKey) && this.apiKey.length > 8;
    this.enabled = looksLikeBase && looksLikePat && !this.forceDisabled;
    this.baseUrl = `https://api.airtable.com/v0/${this.baseId}`;

    // Log diagnostico leggero (non stampa la chiave)
    try {
      console.info(`Airtable enabled: ${this.enabled} (baseId: ${this.enabled ? this.baseId : 'not-set'})`);
      if (this.enabled) {
        console.info(`Airtable tables → Sessions: ${this.tableSessions}, Students: ${this.tableStudents}, Answers: ${this.tableAnswers}`);
      }
    } catch {}
  }

  // Escape sicuro per valori in formula Airtable (gestisce apostrofi)
  private esc(val: string): string {
    try {
      return String(val).replace(/'/g, "\\'");
    } catch {
      return String(val || '');
    }
  }

  // Encoda la formula completa per la querystring
  private encFormula(formula: string): string {
    return encodeURIComponent(formula);
  }

  private handleAuthError(status: number) {
    if (status === 401 || status === 403) {
      this.enabled = false;
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('airtable_force_disabled', '1');
        }
      } catch {}
      try {
        console.warn(`Airtable disabilitato per questa sessione (HTTP ${status}). Passo al fallback locale. Verifica PAT scopes (data.records:read/write), accesso alla Base e Allowed Origins.`);
      } catch {}
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
    // Se Airtable non è configurato, usa subito il fallback locale senza fare fetch (evita 404 in console)
    if (!this.enabled) {
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

    try {
      const response = await fetch(`${this.baseUrl}/${this.tableSessions}`, {
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
        this.handleAuthError(response.status);
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
    
    // Se Airtable non è configurato, salta direttamente a fallback locale
    if (!this.enabled) {
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

    try {
      // Prima verifica se la sessione esiste
      const sessionExists = await this.sessionExists(sessionCode);
      if (!sessionExists) {
        throw new Error('Session not found');
      }

      const response = await fetch(`${this.baseUrl}/${this.tableStudents}`, {
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
        this.handleAuthError(response.status);
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
    if (!this.enabled) {
      // Gestione locale: aggiorna localStorage e notifica
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      if (session.students && session.students[studentId]) {
        session.students[studentId].answers = session.students[studentId].answers || {};
        session.students[studentId].answers[questionIndex] = {
          answer,
          isCorrect,
          timestamp: Date.now()
        };
        const answers = session.students[studentId].answers;
        const score = Object.values(answers).filter((a: any) => a.isCorrect).length;
        session.students[studentId].score = score;
        session.students[studentId].completed = Object.keys(answers).length >= 5;
        session.students[studentId].lastActive = Date.now();
        localStorage.setItem(sessionKey, JSON.stringify(session));
        window.dispatchEvent(new CustomEvent('quizUpdate', { detail: { sessionCode, studentId, questionIndex, score } }));
      }
      return true;
    }

    try {
      const response = await fetch(`${this.baseUrl}/${this.tableAnswers}`, {
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
        this.handleAuthError(response.status);
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
    if (!this.enabled) return; // in locale il punteggio è già ricalcolato
    try {
      // Prima ottieni tutte le risposte dello studente
      {
        const formula = this.encFormula(`AND({Student ID}='${this.esc(studentId)}',{Session Code}='${this.esc(sessionCode)}')`);
        var answersResponse = await fetch(
          `${this.baseUrl}/${this.tableAnswers}?filterByFormula=${formula}`,
        { headers: this.getHeaders() }
        );
      }

      if (answersResponse.ok) {
        const answersData = await answersResponse.json();
        const correctAnswers = answersData.records.filter((record: any) => record.fields['Is Correct']).length;
        const totalAnswers = answersData.records.length;

        // Trova il record dello studente
        const studentFormula = this.encFormula(`AND({Student ID}='${this.esc(studentId)}',{Session Code}='${this.esc(sessionCode)}')`);
        const studentResponse = await fetch(
          `${this.baseUrl}/${this.tableStudents}?filterByFormula=${studentFormula}`,
          { headers: this.getHeaders() }
        );

        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          if (studentData.records.length > 0) {
            const studentRecord = studentData.records[0];
            
            // Aggiorna punteggio
            await fetch(`${this.baseUrl}/${this.tableStudents}/${studentRecord.id}`, {
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
      } else {
        this.handleAuthError(answersResponse.status);
      }
    } catch (error) {
      console.warn('Errore aggiornamento punteggio:', error);
    }
  }

  // Ottieni dati sessione per dashboard
  async getSessionData(sessionCode: string) {
    if (!this.enabled) {
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

    try {
      // Ottieni studenti della sessione
      const studentsFormula = this.encFormula(`{Session Code}='${this.esc(sessionCode)}'`);
      const studentsResponse = await fetch(
        `${this.baseUrl}/${this.tableStudents}?filterByFormula=${studentsFormula}`,
        { headers: this.getHeaders() }
      );

      if (!studentsResponse.ok) {
        this.handleAuthError(studentsResponse.status);
        throw new Error('Failed to fetch students');
      }

      const studentsData = await studentsResponse.json();
      
      // Ottieni risposte per calcolare statistiche
      const answersFormula = this.encFormula(`{Session Code}='${this.esc(sessionCode)}'`);
      const answersResponse = await fetch(
        `${this.baseUrl}/${this.tableAnswers}?filterByFormula=${answersFormula}`,
        { headers: this.getHeaders() }
      );

      let answersData = { records: [] };
      if (answersResponse.ok) {
        answersData = await answersResponse.json();
      } else {
        this.handleAuthError(answersResponse.status);
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
    if (!this.enabled) {
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      return localStorage.getItem(sessionKey) !== null;
    }
    try {
      const formula = this.encFormula(`AND({Session Code}='${this.esc(sessionCode)}',{Active}=TRUE())`);
      const response = await fetch(
        `${this.baseUrl}/${this.tableSessions}?filterByFormula=${formula}`,
        { headers: this.getHeaders() }
      );

      if (response.ok) {
        const data = await response.json();
        return data.records.length > 0;
      }
      this.handleAuthError(response.status);
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
    if (!this.enabled) {
      // Fallback localStorage
      const sessionKey = `session_${sessionCode}`;
      const session = JSON.parse(localStorage.getItem(sessionKey) || '{"students": {}}');
      if (session.students && session.students[studentId]) {
        session.students[studentId].lastActive = Date.now();
        localStorage.setItem(sessionKey, JSON.stringify(session));
      }
      return;
    }
    try {
      // Trova e aggiorna record studente
      const formula = this.encFormula(`AND({Student ID}='${this.esc(studentId)}',{Session Code}='${this.esc(sessionCode)}')`);
      const studentResponse = await fetch(
        `${this.baseUrl}/${this.tableStudents}?filterByFormula=${formula}`,
        { headers: this.getHeaders() }
      );

      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        if (studentData.records.length > 0) {
          const studentRecord = studentData.records[0];
          
          await fetch(`${this.baseUrl}/${this.tableStudents}/${studentRecord.id}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({
              fields: {
                'Last Active': new Date().toISOString()
              }
            })
          });
        }
      } else {
        this.handleAuthError(studentResponse.status);
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