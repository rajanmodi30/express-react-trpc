import create from "zustand";
import { User } from "../utils/types";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (user: string | null) => void;
  removeAll: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    user: null,
    token: null,
    setUser: (user) => set(() => ({ user: user })),
    setToken: (token) => set(() => ({ token: token })),
    removeAll: () => set(() => ({ token: null, user: null })),
  }))
);
