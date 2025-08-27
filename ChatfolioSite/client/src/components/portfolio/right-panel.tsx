import ChatInterface from "./chat-interface";
import type { ViewType } from "@/pages/home";

interface RightPanelProps {
  onViewChange: (view: ViewType) => void;
}

export default function RightPanel({ onViewChange }: RightPanelProps) {
  return (
    <div className="w-full lg:w-1/2 bg-gradient-to-bl from-slate-950 to-slate-900 flex flex-col border-l border-border">
      {/* Chat Header */}
      <div className="glass-card p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
            <i className="fas fa-robot text-xl text-white"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold gradient-text">AI Portfolio Assistant</h3>
            <p className="text-sm text-muted-foreground">Powered by Groq API</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-accent">Online</span>
          </div>
        </div>
      </div>

      <ChatInterface onViewChange={onViewChange} />
    </div>
  );
}
