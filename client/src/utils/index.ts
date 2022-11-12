import dayjs from "dayjs";

export const defaultDateTimeFormat = (dateTime: Date) => {
  return dayjs(dateTime).format("DD-MM-YYYY hh:mm a");
};

export enum UPLOADS_TYPES {
  PROFILE = "profile",
}
