import { object, string, nativeEnum } from "zod";
import { EXPORT_TYPES } from "../../../utils/types";

export const ExportRequest = object({
  sortType: string().optional(),
  sortBy: string().optional(),
  search: string().optional(),
  exportType: nativeEnum(EXPORT_TYPES),
}).superRefine(({ sortType }, ctx) => {
  if (sortType && !["asc", "desc"].includes(sortType)) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
    });
  }
});
