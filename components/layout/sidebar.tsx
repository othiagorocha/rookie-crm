"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  BarChart3,
  Building2,
  CalendarCheck,
  Circle,
  FileText,
  GitBranch,
  KanbanSquare,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  X,
} from "lucide-react";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const ICONS = {
  "layout-dashboard": LayoutDashboard,
  "building-2": Building2,
  users: Users,
  pipeline: KanbanSquare,
  "calendar-check": CalendarCheck,
  package: Package,
  "file-text": FileText,
  workflow: GitBranch,
  "bar-chart-3": BarChart3,
  settings: Settings,
} as const;

type SidebarProps = {
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    onMobileClose();
  }, [pathname, isMobileOpen, onMobileClose]);

  const navItems = MAIN_NAV_ITEMS;

  const renderIcon = (iconName: keyof typeof ICONS | string) => {
    const IconComponent = ICONS[iconName as keyof typeof ICONS] ?? Circle;

    return <IconComponent className="h-4 w-4" aria-hidden />;
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onMobileClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[18.5rem] flex-col border-r border-sidebar-border bg-sidebar px-6 py-8 shadow-xl transition-transform",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-pink-500">
              Rookie
            </p>
            <h1 className="text-xl font-semibold text-foreground">Command Center</h1>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-pink-200 hover:text-pink-600 lg:hidden"
            onClick={onMobileClose}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === "/"
              ? pathname === item.href
              : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors",
                  "hover:bg-pink-50 hover:text-pink-600",
                  isActive && "bg-pink-100 text-pink-700",
                )}
              >
                <span className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white transition-colors",
                  isActive ? "border-pink-300 bg-pink-50 text-pink-600" : "group-hover:border-pink-200",
                )}
                >
                  {renderIcon(item.icon)}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 rounded-2xl bg-pink-500/10 p-4 text-sm text-pink-700">
          <p className="font-semibold">Precisa importar dados?</p>
          <p className="mt-1 text-xs text-pink-600">
            Importe empresas, contatos e produtos com nossos templates CSV.
          </p>
        </div>
      </aside>
    </>
  );
}