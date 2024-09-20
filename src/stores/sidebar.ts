import { create } from "zustand";

type SidebarState = {
  isCollapsed: boolean | undefined;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: undefined,
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
}));
