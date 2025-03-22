import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio Schema

export const socialMediaSchema = z.object({
  name: z.string().min(1, "Platform name is required"),
  url: z.string().url("Must be a valid URL"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const portfolioSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortBio: z.string().min(1, "Short bio is required"),
  fullBio: z.string().optional(),
  profilePicture: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  skills: z.string().optional(),
  interests: z.string().optional(),
  projects: z.array(projectSchema).min(1, "At least one project is required"),
  socialMedia: z.array(socialMediaSchema),
  contactEmail: z.string().email("Must be a valid email").optional().or(z.literal("")),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Must be a valid email"),
  message: z.string().min(1, "Message is required"),
});

export type PortfolioData = z.infer<typeof portfolioSchema>;
export type SocialMedia = z.infer<typeof socialMediaSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;

// Portfolio Table
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  data: jsonb("data").notNull().$type<PortfolioData>(),
});

export const insertPortfolioSchema = createInsertSchema(portfolios);
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolios.$inferSelect;

// Contact Messages Table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").references(() => portfolios.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  portfolioId: true,
  name: true,
  email: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
