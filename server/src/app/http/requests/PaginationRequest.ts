import { number, object, string } from "yup";
import { env } from "../../../env";

export const PaginationRequest = object({
  perPage: number().required().max(env.app.pagination_limit),
  page: number().required(),
  sortType: string().oneOf(["asc", "desc"]).optional(),
  sortBy: string().optional(),
  search: string().optional(),
});
