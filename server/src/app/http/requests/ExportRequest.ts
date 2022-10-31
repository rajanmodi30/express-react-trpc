import { mixed, object, string } from "yup";
import { EXPORT_TYPES } from "../../../utils/types";

export const ExportRequest = object({
  sortType: string().oneOf(["asc", "desc"]).optional(),
  sortBy: string().optional(),
  search: string().optional(),
  exportType: mixed<EXPORT_TYPES>()
    .oneOf(Object.values(EXPORT_TYPES))
    .required(),
});
