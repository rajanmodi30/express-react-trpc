export type User = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  createdAt: string;
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
  setUser: (userObject: User) => void;
  removeUser: () => void;
  setToken: (token: string) => void;
}

export type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
  deviceType: string;
};

export type LoginForm = {
  email: string;
  password: string;
  deviceType: string;
};

export type ForgotPasswordForm = {
  email: string;
};
export type ResetPasswordForm = {
  password: string;
  confirm_password: string;
};

export type DefaultApiResponse = {
  status: boolean;
  message?: string;
};
