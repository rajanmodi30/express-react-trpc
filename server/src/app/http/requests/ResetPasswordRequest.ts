import { object, string } from "zod";

export const ResetPasswordRequest = object({
  resetToken: string(),
  password: string(),
  confirm_password: string(),
}).superRefine(({ password, confirm_password }, ctx) => {
  if (password !== confirm_password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
    });
  }
});
