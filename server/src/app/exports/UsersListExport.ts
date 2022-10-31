import { User } from "@prisma/client";
import { exportCSV } from "../../libs/export/exportCsv";
import { exportPDF } from "../../libs/export/exportPdf";
import { exportXLSX } from "../../libs/export/exportXlsx";
import { defaultDateTimeFormat } from "../../utils/utils";

export const ExportUsersList = async (type: string, data: User[]) => {
  const users = DTO(data);
  if (type === "pdf") {
    return await exportPDF(users);
  } else if (type === "xlsx") {
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
