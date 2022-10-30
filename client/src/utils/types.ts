import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export type User = {
  id: number;
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
  setToken: (token: string | null) => void;
  removeAll: () => void;
}

export interface ThemeState {
  defaultPerPageCount: number;
  paginationOptions: number[];
  openToggleBar: boolean;
  setDefaultPerPageCount: (count: number) => void;
  toggleOpenBar: () => void;
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
