import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quiz collaborativo routes
  
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
      const { name, email } = req.body;
      
      const student = await storage.addStudentToQuiz(sessionId, {
        name,
        email,
        isOnline: true,
        lastActivity: Date.now()
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
