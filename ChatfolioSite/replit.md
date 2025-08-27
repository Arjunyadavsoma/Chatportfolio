# AI Portfolio Chatbot

## Overview

This is an interactive chatbot portfolio website built with React and Express, featuring a split-screen layout with an AI-powered assistant. The application showcases a developer's portfolio through dynamic content sections (profile, projects, resume, skills, certificates) in the left panel, while providing an intelligent chatbot interface powered by Groq API in the right panel. The chatbot can respond to user queries about the portfolio content and trigger visual updates in the left panel to display relevant sections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the main UI framework
- **Vite** for development server and build tooling with hot module replacement
- **Wouter** for client-side routing (lightweight React Router alternative)
- **Tailwind CSS** with custom design system for styling and theming
- **Framer Motion** for smooth animations and transitions between content sections
- **shadcn/ui** component library built on Radix UI primitives for consistent UI elements
- **TanStack Query** for server state management and API request caching

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Groq API integration** for AI chat functionality with conversation context
- **In-memory storage** system for chat message persistence (MemStorage class)
- **RESTful API design** with proper error handling and response formatting

### Component Structure
- **Split-screen layout**: Left panel for portfolio content, right panel for chatbot
- **Dynamic content switching**: Portfolio sections update based on chatbot interactions
- **Reusable UI components**: Leveraging shadcn/ui for consistent design patterns
- **Custom hooks**: For mobile responsiveness and toast notifications

### Data Storage
- **PostgreSQL** configured via Drizzle ORM for production database needs
- **Drizzle Kit** for schema management and migrations
- **Neon Database** serverless PostgreSQL integration
- **In-memory fallback** for development and testing environments

### Authentication & Session Management
- **Express sessions** with PostgreSQL session store (connect-pg-simple)
- **User management system** with basic CRUD operations
- **Chat history persistence** linked to user sessions

### Build & Deployment
- **ESBuild** for server-side bundling and optimization
- **Vite production builds** for client-side assets
- **Environment-based configuration** for development/production modes
- **Type-safe development** with comprehensive TypeScript configuration

## External Dependencies

### AI Services
- **Groq API** - Core AI chat functionality with system prompts for portfolio context
- **groq-sdk** - Official SDK for API integration

### Database & Storage
- **@neondatabase/serverless** - Serverless PostgreSQL database connection
- **Drizzle ORM** - Type-safe database operations and schema management
- **connect-pg-simple** - PostgreSQL session store for Express sessions

### UI Framework & Styling
- **@radix-ui** components - Accessible UI primitives (30+ component packages)
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **Framer Motion** - Animation library for smooth transitions
- **Embla Carousel** - Carousel component for project galleries

### Development Tools
- **Vite** - Development server and build tool
- **@replit/vite-plugin** suite - Replit-specific development enhancements
- **TypeScript** - Type safety across the entire application
- **ESBuild** - Fast bundling for production builds

### Form & Data Management
- **React Hook Form** with **@hookform/resolvers** - Form state management
- **Zod** with **drizzle-zod** - Schema validation and type inference
- **TanStack React Query** - Server state management and caching

### Utilities & Helpers
- **date-fns** - Date manipulation utilities
- **clsx** & **tailwind-merge** - Conditional CSS class handling
- **class-variance-authority** - Component variant management
- **cmdk** - Command palette component for search functionality