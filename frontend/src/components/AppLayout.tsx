import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import AIChatbot from "./AIChatbot";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background scan-line flex">
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - fixed on desktop, slide-in on mobile */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <AppSidebar 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)} 
          onMobileClose={() => setMobileOpen(false)} 
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen flex-1 transition-all duration-300 ease-in-out ${
          collapsed ? "md:ml-[72px]" : "md:ml-[240px]"
        }`}
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <AIChatbot />
    </div>
  );
};

export default AppLayout;
