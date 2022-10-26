import create from "zustand";
import { ThemeState } from "../utils/types";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeState>()(
  persist((set) => ({
    defaultPerPageCount: 15,
    paginationOptions: [10, 15, 20, 30],
    setDefaultPerPageCount: (count: number) =>
      set(() => ({ defaultPerPageCount: count })),
  }))
);
