import { object, string } from "zod";

export const ChangePasswordRequest = object({
  oldPassword: string(),
  newPassword: string(),
  confirmNewPassword: string(),
}).superRefine(({ oldPassword, newPassword, confirmNewPassword }, ctx) => {
  if (confirmNewPassword !== newPassword) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
    });
  }
  if (oldPassword === newPassword) {
    ctx.addIssue({
      code: "custom",
      message: "old password and new password cant be same",
    });
  }
});
