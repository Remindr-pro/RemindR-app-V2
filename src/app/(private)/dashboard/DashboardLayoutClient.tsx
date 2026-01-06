"use client";

import { useState, useCallback } from "react";
import SideBar from "@/app/components/molecules/SideBar";
import TopBar from "@/app/components/molecules/TopBar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

const DashboardLayoutClient = ({ children }: DashboardLayoutClientProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gray-1 overflow-hidden">
      <SideBar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header>
          <TopBar onMenuClick={handleOpenSidebar} />
        </header>
        <main className="flex-1 px-6 xl:px-10 pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;
