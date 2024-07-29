import * as XLSX from "xlsx";
import { filterExportData } from "./filterData";

export const exportToCsv = ({
  data,
  exportOptions,
  zip,
  type = "csv",
}: any) => {
    
  const handleDownload = (workbook: any, name: any) => {
    const fileName = `${name}.${type}`;
    if (zip) {
      let wbout = XLSX.write(workbook, {
        bookType: "csv",
        bookSST: true,
        type: "binary",
      });

      zip.file(fileName, wbout, { binary: true });
    } else {
      XLSX.writeFile(workbook, fileName);
    }
  };

  const addSheetToWorkbook = (workbook: any, option: any, data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, option?.name);
    XLSX.utils.sheet_to_csv(worksheet);
  };

  const handleCsvCreation = ({ item, detail, fileName }: any) => {
    const workbook = XLSX.utils.book_new();
    addSheetToWorkbook(workbook, item, detail);
    handleDownload(workbook, fileName);
  };

  Object.values(exportOptions).map((item: any, index) => {
    const filteredData = filterExportData({ data, fields: item?.fields });
    if (item?.page === "multiple") {
      filteredData?.map((detail: any) => {
        handleCsvCreation({
          item,
          detail : [detail],
          fileName: detail[item?.sheetNameField],
        });
      });
    } else {
      handleCsvCreation({ item, detail: filteredData, fileName: item?.name });
    }
  });
};
