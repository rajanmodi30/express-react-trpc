import { object, ref, string } from "yup";

export const ChangePasswordRequest = object({
  oldPassword: string().required(),
  newPassword: string()
    .required()
    .notOneOf(
      [ref("oldPassword")],
      "old password and new password cant be same"
    ),
  confirmNewPassword: string()
    .required()
    .oneOf(
      [ref("confirmNewPassword")],
      "confirm password and password must be same"
    ),
});
