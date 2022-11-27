import { nativeEnum, object, string } from "zod";
import { UPLOADS_TYPES } from "../../../utils/types";

export const UploadRequest = object({
  name: string(),
  type: string(),
  destination: nativeEnum(UPLOADS_TYPES),
});
