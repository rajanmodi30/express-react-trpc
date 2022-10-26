import { Device } from "@prisma/client";

export const DevicesListResponse = (data: Device[] | Device) => {
  if (Array.isArray(data)) {
    return data.map((d) => objectResponse(d));
  }

  return objectResponse(data);
};

const objectResponse = (data: Device) => {
  return {
    id: data.id,
    metaData: data.metaData,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
