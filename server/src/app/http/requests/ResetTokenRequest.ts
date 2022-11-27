import { object, string } from "zod";

export const ResetTokenRequest = object({
  resetToken: string(),
});
