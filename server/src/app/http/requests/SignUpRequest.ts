import { Devices } from "@prisma/client";
import { nativeEnum, object, string } from "zod";

export const SignUpRequest = object({
  firstName: string(),
  lastName: string(),
  email: string().email(),
  password: string(),
  confirm_password: string(),
  deviceType: nativeEnum(Devices),
  metaData: object({}).optional(),
  fcmToken: string(),
}).superRefine(({ password, confirm_password }, ctx) => {
  if (password !== confirm_password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
    });
  }
});
