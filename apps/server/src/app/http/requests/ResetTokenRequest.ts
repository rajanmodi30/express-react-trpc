import { object, string } from "yup";

export const ResetTokenRequest = object({
  resetToken: string(),
});
