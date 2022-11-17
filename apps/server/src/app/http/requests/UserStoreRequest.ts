import { object, string } from "yup";

export const UserStoreRequest = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
});
