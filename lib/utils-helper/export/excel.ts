import * as XLSX from "xlsx";
import { filterExportData } from "./filterData";

export const exportToExcel = ({ data, exportOptions, zip,type="xlsx" }: any) => {

  Object.values(exportOptions).map((item: any, index) => {
    const workbook = XLSX.utils.book_new();

    if (item?.isMultipleDetails) {
      item?.details.forEach((detail: any) => {
        addSheetToWorkbook(workbook, detail, data);
      });
    } else {
      addSheetToWorkbook(workbook, item, data);
    }

    if (zip) {
      let wbout = XLSX.write(workbook, {
        bookType: type,
        bookSST: true,
        type: "binary",
      });

      zip.file(`${item?.name}.${type}`, wbout, { binary: true });
    } else {
      XLSX.writeFile(workbook, `${item?.name}.${type}`);
    }
  });
};

const addSheetToWorkbook = (
  workbook: any,
  option: any,
  data: any,
) => {
  const { fields, page } = option;
  const filteredData = filterExportData({data,fields})

  if (page === "multiple") {
    filteredData?.forEach((item: any, index: number) => {
      const individualSheet = XLSX.utils.json_to_sheet([item]);
      XLSX.utils.book_append_sheet(
        workbook,
        individualSheet,
        item[option?.sheetNameField]
      );
    });
  } else {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, option?.name);
  }
};
