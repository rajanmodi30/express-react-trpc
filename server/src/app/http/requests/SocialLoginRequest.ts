import { Devices, SocialTypes } from "@prisma/client";
import { mixed, object, string } from "yup";

export const SocialLoginRequest = object({
  firstName: string().required(),
  lastName: string().required(),
  socialId: string().required(),
  socialType: mixed<SocialTypes>().oneOf(Object.values(SocialTypes)).required(),
  socialToken: string().required(),
  deviceType: mixed<Devices>().oneOf(Object.values(Devices)).required(),
  metaData: object(),
  fcmToken: string(),
});
