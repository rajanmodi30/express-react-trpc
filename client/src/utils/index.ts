import dayjs from "dayjs";

export const defaultDateTimeFormat = (dateTime: Date) => {
  return dayjs(dateTime).format("DD-MM-YYYY hh:mm a");
};

export enum UPLOADS_TYPES {
  PROFILE = "profile",
}

export const drawerWidth = 240;

export const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
};
