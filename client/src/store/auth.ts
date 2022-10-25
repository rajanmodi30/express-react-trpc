import create from "zustand";
import { AuthState } from "../utils/types";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    user: null,
    token: null,
    openToggleBar: false,
    setUser: (user) => set(() => ({ user: user })),
    setToken: (token) => set(() => ({ token: token })),
    toggleOpenBar: () =>
      set((store) => ({ openToggleBar: !store.openToggleBar })),
    removeAll: () =>
      set(() => ({ token: null, user: null, openToggleBar: false })),
  }))
);
