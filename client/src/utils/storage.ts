import { User } from "./types";

const appName = import.meta.env.VITE_APP_NAME.replace(
  " ",
  "-"
).toLocaleLowerCase();
const storagePrefix = `${appName}_`;

const storage = {
  getToken(): string | null {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  getUser(): User | null {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}user`) as string
    );
  },
  setUser: (user: User) => {
    window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(`${storagePrefix}user`);
  },
};

export default storage;
