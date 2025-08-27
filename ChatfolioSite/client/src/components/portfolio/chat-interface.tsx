import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ViewType } from "@/pages/home";

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;
    setIsTyping(true);
    setDisplayText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isTyping };
}

// Particle effect component
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${Math.random() * 3 + 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// Typewriter message component
function TypewriterMessage({ message }: { message: string }) {
  const { displayText, isTyping } = useTypewriter(message, 30);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-start space-x-3"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-sm text-white"></i>
      </div>
      <div className="chat-bubble-assistant px-4 py-3 rounded-2xl rounded-tl-sm">
        <p className="text-white text-sm">
          {displayText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </motion.div>
  );
}

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

interface ChatInterfaceProps {
  onViewChange: (view: ViewType) => void;
}

const quickActions = [
  { action: "show-projects", label: "Show Projects", icon: "fas fa-code", message: "Show me Arjun's projects" },
  { action: "show-resume", label: "View Resume", icon: "fas fa-file-pdf", message: "I'd like to see Arjun's resume" },
  { action: "show-skills", label: "Technical Skills", icon: "fas fa-chart-bar", message: "What are Arjun's technical skills?" },
  { action: "show-contact", label: "Contact Me", icon: "fas fa-envelope", message: "How can I contact Arjun?" },
  { action: "show-certs", label: "Certifications", icon: "fas fa-award", message: "Show me Arjun's certifications" },
];

export default function ChatInterface({ onViewChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "👋 Hi! I'm Arjun's AI Portfolio Assistant. Ask me about his projects, skills, experience, or anything else you'd like to know!",
      role: "assistant",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [typingMessage, setTypingMessage] = useState<string>("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (chatMessages: Omit<ChatMessage, "id" | "timestamp">[]) => {
      const response = await apiRequest("POST", "/api/chat", {
        messages: chatMessages.map(msg => ({ role: msg.role, content: msg.content }))
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Start typing effect for AI response
      setTypingMessage(data.reply.content);
      
      // Add message after typing animation
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: Date.now().toString(),
          content: data.reply.content,
          role: "assistant",
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setTypingMessage("");
      }, data.reply.content.length * 30); // Typing speed
      
      // Check for view change triggers in the response
      const response = data.reply.content.toLowerCase();
      if (response.includes("show you his featured projects") || response.includes("his projects")) {
        setTimeout(() => onViewChange("projects"), 1000);
      } else if (response.includes("here's his resume") || response.includes("resume for your review")) {
        setTimeout(() => onViewChange("resume"), 1000);
      } else if (response.includes("technical skills") || response.includes("expertise levels")) {
        setTimeout(() => onViewChange("skills"), 1000);
      } else if (response.includes("certifications") || response.includes("achievements")) {
        setTimeout(() => onViewChange("certificates"), 1000);
      } else if (response.includes("contact") || response.includes("get in touch")) {
        setTimeout(() => onViewChange("contact"), 1000);
      } else if (response.includes("profile section") || response.includes("about me")) {
        setTimeout(() => onViewChange("photo"), 1000);
      }
      
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const sendMessage = async () => {
    const messageContent = input.trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simple command detection for immediate view changes
    const lowerMessage = messageContent.toLowerCase();
    if (lowerMessage.includes("project")) {
      onViewChange("projects");
    } else if (lowerMessage.includes("resume")) {
      onViewChange("resume");
    } else if (lowerMessage.includes("skill")) {
      onViewChange("skills");
    } else if (lowerMessage.includes("certificate") || lowerMessage.includes("cert")) {
      onViewChange("certificates");
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("hire") || lowerMessage.includes("reach out")) {
      onViewChange("contact");
    } else if (lowerMessage.includes("profile") || lowerMessage.includes("about")) {
      onViewChange("photo");
    }

    chatMutation.mutate([...messages, userMessage].map(msg => ({ role: msg.role, content: msg.content })));
  };

  const handleQuickAction = (message: string) => {
    setInput(message);
    setTimeout(sendMessage, 100);
  };

  return (
    <>
      <ParticleBackground />
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10" data-testid="chat-messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start space-x-3 ${
                message.role === "user" ? "justify-end" : ""
              }`}
              data-testid={`message-${message.role}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-sm text-white"></i>
                </div>
              )}
              
              <motion.div
                className={`px-4 py-3 rounded-2xl max-w-md interactive-hover ${
                  message.role === "user"
                    ? "chat-bubble-user rounded-tr-sm"
                    : "chat-bubble-assistant rounded-tl-sm animate-glow"
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-white text-sm">{message.content}</p>
              </motion.div>

              {message.role === "user" && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user text-sm text-white"></i>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Message */}
        <AnimatePresence>
          {typingMessage && (
            <TypewriterMessage message={typingMessage} />
          )}
        </AnimatePresence>

        {/* Loading Indicator */}
        <AnimatePresence>
          {isLoading && !typingMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start space-x-3"
              data-testid="loading-indicator"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <i className="fas fa-robot text-sm text-white"></i>
              </div>
              <div className="chat-bubble-assistant px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="glass-card p-6 border-t border-border">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me about Arjun's experience, projects, skills..."
              className="w-full bg-input border border-border rounded-2xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/50 transition-all duration-200 neon-border"
              disabled={isLoading}
              data-testid="chat-input"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <i className="fas fa-microphone"></i>
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-6 py-3 rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
            data-testid="send-button"
          >
            <i className="fas fa-paper-plane"></i>
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.message)}
              className="px-3 py-2 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg text-sm transition-all duration-200"
              disabled={isLoading}
              data-testid={`quick-action-${action.action}`}
            >
              <i className={`${action.icon} mr-2`}></i>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
