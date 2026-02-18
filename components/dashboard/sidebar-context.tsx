"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  openMobile: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        mobileOpen,
        toggleCollapse: () => setCollapsed((v) => !v),
        toggleMobile: () => setMobileOpen((v) => !v),
        closeMobile: () => setMobileOpen(false),
        openMobile: () => setMobileOpen(true),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
}
