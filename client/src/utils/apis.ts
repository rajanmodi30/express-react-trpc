export const ENDPOINTS = {
  LOGIN: "login",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: (token: any) => `reset-password?token=${token ?? "link"}`,
  RESET_PASSWORD_TOKEN: (token: any) =>
    `reset-password?token=${token ?? "link"}`,
};
