import { 
  users, type User, type InsertUser, 
  type PortfolioData, type Portfolio,
  type ContactForm, type ContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio methods
  getPortfolio(id: number): Promise<Portfolio | undefined>;
  savePortfolio(data: PortfolioData): Promise<Portfolio>;
  
  // Contact message methods
  saveContactMessage(data: ContactForm & { portfolioId: number }): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolios: Map<number, Portfolio>;
  private contactMessages: Map<number, ContactMessage>;
  currentId: number;
  portfolioId: number;
  contactId: number;

  constructor() {
    this.users = new Map();
    this.portfolios = new Map();
    this.contactMessages = new Map();
    this.currentId = 1;
    this.portfolioId = 1;
    this.contactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getPortfolio(id: number): Promise<Portfolio | undefined> {
    return this.portfolios.get(id);
  }
  
  async savePortfolio(data: PortfolioData): Promise<Portfolio> {
    const id = this.portfolioId++;
    const portfolio: Portfolio = { 
      id, 
      userId: null, // Not requiring auth for this demo
      data 
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }
  
  async saveContactMessage(data: ContactForm & { portfolioId: number }): Promise<ContactMessage> {
    const id = this.contactId++;
    const { portfolioId, name, email, message } = data;
    const contactMessage: ContactMessage = {
      id,
      portfolioId,
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();
