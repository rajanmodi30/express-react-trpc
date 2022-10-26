import dayjs from "dayjs";

export const DEVICE_TYPE = "WEB";

export const defaultDateTimeFormat = (dateTime: Date) => {
  return dayjs(dateTime).format("DD-MM-YYYY HH:mm a");
};
