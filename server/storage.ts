import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// Quiz collaborativo interfaces
export interface QuizStudent {
  id: string;
  name: string;
  answers: QuizAnswer[];
  score: number;
  isOnline: boolean;
  lastActivity: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizSession {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: number;
  students: Map<string, QuizStudent>;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz methods
  createQuizSession(name: string): Promise<QuizSession>;
  getQuizSession(id: string): Promise<QuizSession | undefined>;
  addStudentToQuiz(sessionId: string, student: Omit<QuizStudent, 'id' | 'answers' | 'score' | 'joinedAt'>): Promise<QuizStudent>;
  submitAnswer(sessionId: string, studentId: string, answer: QuizAnswer): Promise<void>;
  updateStudentActivity(sessionId: string, studentId: string): Promise<void>;
  getQuizStats(sessionId: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizSessions: Map<string, QuizSession>;

  constructor() {
    this.users = new Map();
    this.quizSessions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Quiz methods implementation
  async createQuizSession(name: string): Promise<QuizSession> {
    const id = randomUUID();
    const session: QuizSession = {
      id,
      name,
      isActive: true,
      createdAt: Date.now(),
      students: new Map()
    };
    this.quizSessions.set(id, session);
    return session;
  }

  async getQuizSession(id: string): Promise<QuizSession | undefined> {
    return this.quizSessions.get(id);
  }

  async addStudentToQuiz(sessionId: string, studentData: Omit<QuizStudent, 'id' | 'answers' | 'score' | 'lastActivity'>): Promise<QuizStudent> {
    const session = this.quizSessions.get(sessionId);
    if (!session) {
      throw new Error('Quiz session not found');
    }

    const student: QuizStudent = {
      ...studentData,
      id: randomUUID(),
      answers: [],
      score: 0,
      lastActivity: Date.now()
    };

    session.students.set(student.id, student);
    return student;
  }

  async submitAnswer(sessionId: string, studentId: string, answer: QuizAnswer): Promise<void> {
    const session = this.quizSessions.get(sessionId);
    if (!session) {
      throw new Error('Quiz session not found');
    }

    const student = session.students.get(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    student.answers.push(answer);
    if (answer.isCorrect) {
      student.score++;
    }
    student.lastActivity = Date.now();
  }

  async updateStudentActivity(sessionId: string, studentId: string): Promise<void> {
    const session = this.quizSessions.get(sessionId);
    if (!session) {
      throw new Error('Quiz session not found');
    }

    const student = session.students.get(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    student.lastActivity = Date.now();
    student.isOnline = true;
  }

  async getQuizStats(sessionId: string): Promise<any> {
    const session = this.quizSessions.get(sessionId);
    if (!session) {
      throw new Error('Quiz session not found');
    }

    const students = Array.from(session.students.values());
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.isOnline && (Date.now() - s.lastActivity) < 300000).length; // 5 min
    const completedQuizzes = students.filter(s => s.answers.length === 5).length;
    const totalScores = students.reduce((sum, s) => sum + s.score, 0);
    const averageScore = totalStudents > 0 ? totalScores / totalStudents : 0;

    return {
      totalStudents,
      activeStudents,
      completedQuizzes,
      averageScore,
      students
    };
  }

  // Metodi aggiuntivi per le API semplici
  async getActiveSessions(): Promise<QuizSession[]> {
    return Array.from(this.quizSessions.values()).filter(session => session.isActive);
  }

  async getStudent(sessionId: string, studentId: string): Promise<QuizStudent | undefined> {
    const session = this.quizSessions.get(sessionId);
    return session?.students.get(studentId);
  }

  async getSessionStudents(sessionId: string): Promise<Map<string, QuizStudent>> {
    const session = this.quizSessions.get(sessionId);
    return session?.students || new Map();
  }
}

export const storage = new MemStorage();
