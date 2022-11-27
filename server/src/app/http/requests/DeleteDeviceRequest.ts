import { number, object } from "zod";

export const DeleteDeviceRequest = object({
  id: number(),
});
