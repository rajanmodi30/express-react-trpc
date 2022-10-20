import create from "zustand";
import { AuthState } from "../utils/types";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    user: null,
    token: null,
    setUser: (user) => set(() => ({ user: user })),
    setToken: (token) => set(() => ({ token: token })),
    removeAll: () => set(() => ({ token: null, user: null })),
  }))
);
