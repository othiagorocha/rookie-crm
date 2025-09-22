"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ChangeEvent } from "react";
import { Bell, Menu, Search } from "lucide-react";

import type { WorkspaceSummary } from "@/stores/use-workspace-store";
import { useWorkspaceStore } from "@/stores/use-workspace-store";

export type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const { workspaces, activeWorkspaceId, switchWorkspace } = useWorkspaceStore();

  const handleWorkspaceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switchWorkspace(event.target.value);
  };

  const activeWorkspace = workspaces.find(
    (workspace: WorkspaceSummary) => workspace.id === activeWorkspaceId,
  );

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border bg-background/80 px-4 backdrop-blur lg:px-10">
      <div className="flex flex-1 items-center gap-3 lg:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-pink-200 hover:text-pink-600 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>

        <div className="hidden flex-col lg:flex">
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
            Rookie CRM
          </span>
          <span className="text-sm font-semibold text-foreground">
            {activeWorkspace?.name ?? "Selecionar workspace"}
          </span>
        </div>

        <div className="flex flex-1 items-center gap-3 lg:gap-4">
          <label className="relative hidden flex-1 lg:flex">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              placeholder="Pesquisar empresas, contatos, deals..."
              className="w-full rounded-2xl border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200 focus:ring-offset-2"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <div className="relative">
          <select
            className="hidden min-w-[10rem] rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm outline-none transition hover:border-pink-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 lg:inline-block"
            value={activeWorkspaceId ?? ""}
            onChange={handleWorkspaceChange}
            aria-label="Selecionar workspace"
          >
            <option value="" disabled>
              Selecionar workspace
            </option>
            {workspaces.map((workspace: WorkspaceSummary) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-pink-200 hover:text-pink-600"
          aria-label="Notificacoes"
        >
          <Bell className="h-5 w-5" aria-hidden />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-10 w-10 border border-pink-200",
            },
          }}
        />
      </div>
    </header>
  );
}