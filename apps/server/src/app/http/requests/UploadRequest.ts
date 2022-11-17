import { mixed, object, string } from "yup";
import { UPLOADS_TYPES } from "../../../utils/types";

export const UploadRequest = object({
  name: string().required(),
  type: string().required(),
  destination: mixed<UPLOADS_TYPES>()
    .oneOf(Object.values(UPLOADS_TYPES))
    .required(),
});
