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

export enum EXPORT_TYPES {
  XLSX = "XLSX",
  CSV = "CSV",
  PDF = "PDF",
}

export enum EXPORT_TYPE_MIME {
  XLSX = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
  CSV = "data:text/csv;base64,",
  PDF = "data:application/pdf;base64,",
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface ThemeContextInterface {
  drawerWidth: number;
}

export type SearchAndDownloadProps = {
  name: string;
  addLink?: string;
  handleDownloadMethod: (exportType: EXPORT_TYPES) => void;
};
