import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { portfolioSchema, contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Save portfolio data
  app.post("/api/portfolio", async (req, res) => {
    try {
      const portfolioData = portfolioSchema.parse(req.body);
      
      // In a real app, we'd associate this with a user, but for now just save it
      const portfolio = await storage.savePortfolio(portfolioData);
      
      res.status(201).json({ 
        message: "Portfolio saved successfully",
        portfolioId: portfolio.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to save portfolio" });
      }
    }
  });

  // Get portfolio data
  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid portfolio ID" });
      }
      
      const portfolio = await storage.getPortfolio(id);
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      
      res.json(portfolio.data);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve portfolio" });
    }
  });

  // Save contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { portfolioId, ...contactData } = req.body;
      
      // Validate the contact form data
      const validContactData = contactFormSchema.parse(contactData);
      
      // Save the contact form submission
      const id = parseInt(portfolioId);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid portfolio ID" });
      }
      
      const contactMessage = await storage.saveContactMessage({
        portfolioId: id,
        ...validContactData
      });
      
      res.status(201).json({ 
        message: "Message sent successfully",
        contactId: contactMessage.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Get projects data from GitHub (simulated dynamic fetch)
  app.get("/api/projects", async (req, res) => {
    try {
      // In a real application, this would fetch data from GitHub API
      // or other external sources. For now, we'll return a success message
      // as the actual projects are managed in the portfolio data
      res.json({ 
        message: "Projects data endpoint ready for integration with GitHub API",
        note: "This endpoint would be connected to real GitHub API in production"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
