import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crea una sessione di default se non esiste
  const getOrCreateDefaultSession = async () => {
    const sessions = await storage.getActiveSessions();
    if (sessions.length === 0) {
      return await storage.createQuizSession("Quiz Collaborativo Principale");
    }
    return sessions[0];
  };

  // API semplici per il frontend
  
  // Registrazione studente (semplificata)
  app.post("/api/quiz/register", async (req, res) => {
    try {
      const { name, isOnline } = req.body;
      const session = await getOrCreateDefaultSession();
      
      const student = await storage.addStudentToQuiz(session.id, {
        name,
        isOnline: isOnline || true
      });
      
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Invio risposta (semplificata)
  app.post("/api/quiz/answer", async (req, res) => {
    try {
      const { studentId, answer } = req.body;
      const session = await getOrCreateDefaultSession();
      
      await storage.submitAnswer(session.id, studentId, answer);
      
      // Ritorna lo studente aggiornato
      const updatedStudent = await storage.getStudent(session.id, studentId);
      res.json(updatedStudent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Lista studenti (semplificata)
  app.get("/api/quiz/students", async (req, res) => {
    try {
      const session = await getOrCreateDefaultSession();
      const students = await storage.getSessionStudents(session.id);
      res.json({ students: Array.from(students.values()) });
    } catch (error: any) {
      res.status(500).json({ error: error.message, students: [] });
    }
  });

  // Quiz collaborativo routes (esistenti)
  
  // Crea una nuova sessione quiz
  app.post("/api/quiz/session", async (req, res) => {
    try {
      const { name } = req.body;
      const session = await storage.createQuizSession(name || "Quiz Session");
      res.json(session);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Registra uno studente al quiz
  app.post("/api/quiz/session/:sessionId/join", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { name } = req.body;
      
      const student = await storage.addStudentToQuiz(sessionId, {
        name,
        isOnline: true
      });
      
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Sottometti una risposta
  app.post("/api/quiz/session/:sessionId/answer", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { studentId, questionId, selectedAnswer, isCorrect } = req.body;
      
      const answer = {
        questionId,
        selectedAnswer,
        isCorrect,
        timestamp: Date.now()
      };
      
      await storage.submitAnswer(sessionId, studentId, answer);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ottieni statistiche della sessione
  app.get("/api/quiz/session/:sessionId/stats", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const stats = await storage.getQuizStats(sessionId);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Aggiorna attività studente (heartbeat)
  app.post("/api/quiz/session/:sessionId/heartbeat", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { studentId } = req.body;
      
      await storage.updateStudentActivity(sessionId, studentId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
