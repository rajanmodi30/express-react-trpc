import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

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
  openToggleBar: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  toggleOpenBar: () => void;
  removeAll: () => void;
}

export enum DEVICES {
  IOS = "IOS",
  ANDROID = "ANDROID",
  WEB = "WEB",
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface ThemeContextInterface {
  drawerWidth: number;
}
