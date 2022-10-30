import { number, object } from "yup";

export const UserDetailsRequest = object({
  id: number().required(),
});
