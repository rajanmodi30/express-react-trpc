import fs from "fs";
import Puppeteer from "puppeteer";
import Handlebars from "handlebars";
import { env } from "../../env";

export const exportPDF = async (exportData: any[]) => {
  const source = fs.readFileSync(
    env.app.root_dir + "/views/export/pdf.hbs",
    "utf8"
  );
  const showColumnNames =
    exportData.length > 0 ? Object.keys(exportData[0]) : [];
  const data = {
    fields: showColumnNames,
    result: exportData,
  };

  const template = Handlebars.compile(source);
  const templateHBS = await template(data);
  const options = {
    printBackground: true,
    width: 1240,
    height: 1754,
    timeout: 20000,
  };
  const browser = await Puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    timeout: 20000,
  });
  const page = await browser.newPage();
  await page.setContent(templateHBS);
  const response = await page.pdf(options);
  await browser.close();
  return response;
};
