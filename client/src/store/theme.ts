import create from "zustand";
import { ThemeState } from "../utils/types";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      defaultPerPageCount: 15,
      currentSideBarTitle: null,
      currentSideBarLink: null,
      openToggleBar: false,
      paginationOptions: [10, 15, 20, 30],
      toggleOpenBar: () =>
        set((store) => ({ openToggleBar: !store.openToggleBar })),
      setDefaultPerPageCount: (count: number) =>
        set(() => ({ defaultPerPageCount: count })),
      setCurrentSideBarTitle: (value: string | null) =>
        set(() => ({ currentSideBarTitle: value })),
      setCurrentSideBarLink: (value: string | null) =>
        set(() => ({ currentSideBarLink: value })),
    }),
    {
      name: "theme",
    }
  )
);
