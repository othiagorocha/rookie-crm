import { create } from "zustand";

export type WorkspaceSummary = {
  id: string;
  name: string;
  slug: string;
};

type WorkspaceStoreState = {
  workspaces: WorkspaceSummary[];
  activeWorkspaceId: string | null;
  setWorkspaces: (workspaces: WorkspaceSummary[]) => void;
  switchWorkspace: (workspaceId: string) => void;
};

export const useWorkspaceStore = create<WorkspaceStoreState>((set) => ({
  workspaces: [],
  activeWorkspaceId: null,
  setWorkspaces: (workspaces: WorkspaceSummary[]) => {
    set((state: WorkspaceStoreState) => {
      const hasActive = state.activeWorkspaceId &&
        workspaces.some((workspace) => workspace.id === state.activeWorkspaceId);

      return {
        ...state,
        workspaces,
        activeWorkspaceId: hasActive
          ? state.activeWorkspaceId
          : workspaces[0]?.id ?? null,
      };
    });
  },
  switchWorkspace: (workspaceId: string) => {
    set((state: WorkspaceStoreState) => {
      const canSwitch = state.workspaces.some((workspace) => workspace.id === workspaceId);

      return {
        ...state,
        activeWorkspaceId: canSwitch ? workspaceId : state.activeWorkspaceId,
      };
    });
  },
}));

export const useActiveWorkspace = () =>
  useWorkspaceStore((state) =>
    state.workspaces.find((workspace) => workspace.id === state.activeWorkspaceId) ?? null,
  );