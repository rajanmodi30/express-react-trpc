import { number, object } from "yup";

export const DeleteDeviceRequest = object({
  id: number().required(),
});
