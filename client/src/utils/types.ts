export type User = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  createdAt: Date;
};

export interface menuItems {
  showName: string;
  rank: number;
  link: string | null;
  show: boolean;
  toCallFn?: () => void;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (user: string | null) => void;
  removeAll: () => void;
}

export enum DEVICES {
  IOS = "IOS",
  ANDROID = "ANDROID",
  WEB = "WEB",
}
