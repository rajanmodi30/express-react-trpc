import { number, object, string } from "zod";

export const UpdateUserRequest = object({
  id: number(),
  firstName: string(),
  lastName: string(),
  email: string(),
});
