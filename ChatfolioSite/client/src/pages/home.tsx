import { useState } from "react";
import LeftPanel from "@/components/portfolio/left-panel";
import RightPanel from "@/components/portfolio/right-panel";
import ThemeSwitcher from "@/components/portfolio/theme-switcher";

export type ViewType = "photo" | "projects" | "resume" | "skills" | "certificates" | "contact";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("photo");

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      <LeftPanel currentView={currentView} onViewChange={setCurrentView} />
      <RightPanel onViewChange={setCurrentView} />
      
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
