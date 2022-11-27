import { object, string } from "zod";

export const ForgotPasswordRequest = object({
  email: string().email(),
});
