import { Devices } from "@prisma/client";
import { nativeEnum, object, string } from "zod";

export const LoginRequest = object({
  email: string().email(),
  password: string(),
  deviceType: nativeEnum(Devices),
  fcmToken: string().optional(),
});
