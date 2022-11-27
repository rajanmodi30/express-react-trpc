import { number, object, string } from "zod";
import { env } from "../../../env";

export const PaginationRequest = object({
  perPage: number().max(env.app.pagination_limit),
  page: number(),
  sortType: string().optional(),
  sortBy: string().optional(),
  search: string().optional(),
}).superRefine(({ sortType }, ctx) => {
  if (sortType && !["asc", "desc"].includes(sortType)) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
    });
  }
});
