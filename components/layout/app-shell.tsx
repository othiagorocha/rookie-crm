"use client";

import { ReactNode, useState } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex w-full flex-1 flex-col lg:pl-[18.5rem]">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}