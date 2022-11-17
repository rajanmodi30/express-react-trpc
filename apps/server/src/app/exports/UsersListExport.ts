import { User } from "@prisma/client";
import { exportCSV } from "../../libs/export/exportCsv";
import { exportPDF } from "../../libs/export/exportPdf";
import { exportXLSX } from "../../libs/export/exportXlsx";
import { EXPORT_TYPES } from "../../utils/types";
import { defaultDateTimeFormat } from "../../utils/utils";

export const ExportUsersList = async (type: EXPORT_TYPES, data: User[]) => {
  const users = DTO(data);
  if (type === EXPORT_TYPES.PDF) {
    return await exportPDF(users);
  } else if (type === EXPORT_TYPES.XLSX) {
    return await exportXLSX(users);
  } else {
    return await exportCSV(users);
  }
};

const DTO = (users: User[]) => {
  const updateData: any[] = [];
  users.forEach((data) => {
    const newObject = {
      FirstName: data.firstName,
      LastName: data.lastName,
      fullName: data.firstName + " " + data.lastName,
      Email: data.email,
      "Created At": defaultDateTimeFormat(data.createdAt),
      "Updated At": defaultDateTimeFormat(data.updatedAt),
    };
    updateData.push(newObject);
  });

  return updateData;
};
