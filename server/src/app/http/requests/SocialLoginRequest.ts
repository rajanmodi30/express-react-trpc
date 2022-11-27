import { Devices, SocialTypes } from "@prisma/client";
import { nativeEnum, object, string } from "zod";

export const SocialLoginRequest = object({
  firstName: string(),
  lastName: string(),
  socialId: string(),
  socialType: nativeEnum(SocialTypes),
  socialToken: string(),
  deviceType: nativeEnum(Devices),
  metaData: object({}).optional(),
  fcmToken: string(),
});
