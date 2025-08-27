import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { z } from "zod";

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.GROQ_KEY || "";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for Groq AI integration
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = chatRequestSchema.parse(req.body);
      
      if (!GROQ_API_KEY) {
        return res.status(500).json({ 
          error: "Groq API key not configured. Please set GROQ_API_KEY environment variable." 
        });
      }

      // Import Groq SDK dynamically to handle potential installation issues
      let Groq;
      try {
        const groqModule = await import("groq-sdk");
        Groq = groqModule.default;
      } catch (importError) {
        return res.status(500).json({ 
          error: "Groq SDK not available. Please install groq-sdk package." 
        });
      }

      const client = new Groq({ apiKey: GROQ_API_KEY });

      // Add system context for portfolio assistant
      const systemMessage = {
        role: "system" as const,
        content: `You are Arjun's AI Portfolio Assistant. You help visitors learn about Arjun Kumar, a Full Stack Developer and AI Enthusiast. 

Key information about Arjun:
- Full Stack Developer with expertise in React, Node.js, Python
- AI enthusiast with experience in OpenAI API, TensorFlow, Langchain
- Has built projects like AI Interview Coach, E-commerce Analytics Dashboard, Smart Task Manager
- Proficient in frontend (React.js 95%, TypeScript 90%, Next.js 88%) and backend (Node.js 92%, Python 85%, PostgreSQL 80%)
- Has certifications from AWS, Google Cloud, and Meta
- Can be contacted via GitHub, LinkedIn, or email

When users ask about projects, resume, skills, or certificates, you can suggest they view those sections. Be helpful, professional, and enthusiastic about Arjun's work. Keep responses concise but informative.

If users ask to see specific sections, mention that you're updating the view for them.`
      };

      const chatCompletion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      });

      const reply = chatCompletion.choices[0]?.message;
      
      if (!reply) {
        return res.status(500).json({ error: "No response received from AI" });
      }

      // Save the conversation to storage
      const timestamp = new Date().toISOString();
      
      // Save user message
      await storage.saveChatMessage({
        content: messages[messages.length - 1].content,
        role: messages[messages.length - 1].role,
        timestamp,
      });

      // Save assistant response
      await storage.saveChatMessage({
        content: reply.content || "",
        role: reply.role,
        timestamp: new Date().toISOString(),
      });

      res.json({ reply });
    } catch (error) {
      console.error("Chat API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request format", 
          details: error.errors 
        });
      }
      
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process chat request" 
      });
    }
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    try {
      const history = await storage.getChatHistory();
      res.json({ history });
    } catch (error) {
      console.error("Get chat history error:", error);
      res.status(500).json({ error: "Failed to retrieve chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
