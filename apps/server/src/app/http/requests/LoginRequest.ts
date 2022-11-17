import { Devices } from "@prisma/client";
import { mixed, object, string } from "yup";

export const LoginRequest = object({
  email: string().email().required(),
  password: string().required(),
  deviceType: mixed<Devices>().oneOf(Object.values(Devices)).required(),
  fcmToken: string().optional(),
});
