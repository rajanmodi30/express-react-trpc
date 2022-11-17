import { number, object } from "yup";

export const IdRequest = object({
  id: number().required(),
});
