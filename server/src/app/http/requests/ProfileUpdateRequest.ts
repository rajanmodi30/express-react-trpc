import { object, string } from "zod";

export const ProfileUpdateRequest = object({
  firstName: string(),
  lastName: string(),
  email: string(),
  profilePicture: string(),
});
