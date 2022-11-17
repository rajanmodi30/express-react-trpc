import { number, object, string } from "yup";

export const UpdateUserRequest = object({
  id: number().required(),
  firstName: string().required(),
  lastName: string().required(),
  email: string().required(),
});
