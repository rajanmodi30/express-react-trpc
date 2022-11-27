import { object, string } from "zod";

export const UpdateDeviceRequest = object({
  fcmToken: string(),
  metaData: object({}).optional(),
});
