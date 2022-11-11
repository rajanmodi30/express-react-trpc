import { object, string } from "yup";

export const ProfileUpdateRequest = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required(),
  profilePicture: string().required(),
});
