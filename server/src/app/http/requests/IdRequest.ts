import { number, object } from "zod";

export const IdRequest = object({
  id: number(),
});
