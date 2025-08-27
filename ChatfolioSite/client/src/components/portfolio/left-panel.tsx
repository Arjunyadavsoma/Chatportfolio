import { motion } from "framer-motion";
import ContentViews from "./content-views";
import type { ViewType } from "@/pages/home";

interface LeftPanelProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const tabs = [
  { id: "photo" as const, label: "Profile", icon: "fas fa-user" },
  { id: "projects" as const, label: "Projects", icon: "fas fa-code" },
  { id: "resume" as const, label: "Resume", icon: "fas fa-file-pdf" },
  { id: "skills" as const, label: "Skills", icon: "fas fa-chart-bar" },
  { id: "certificates" as const, label: "Certs", icon: "fas fa-award" },
  { id: "contact" as const, label: "Contact", icon: "fas fa-envelope" },
];

export default function LeftPanel({ currentView, onViewChange }: LeftPanelProps) {
  return (
    <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5"></div>
      
      {/* Navigation Tabs */}
      <div className="relative z-10 p-4 border-b border-border/50">
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 min-w-[100px] ${
                currentView === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 glass-card"
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`tab-${tab.id}`}
            >
              <i className={tab.icon}></i>
              <span className="text-sm">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 overflow-auto" style={{ height: 'calc(100vh - 80px)' }}>
        <ContentViews currentView={currentView} />
      </div>
    </div>
  );
}
