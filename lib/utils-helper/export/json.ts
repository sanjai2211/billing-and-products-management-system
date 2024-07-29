import { createDownloadUrl } from "./create-download-url";
import { filterJsonExportData } from "./filterData";

export const exportToJson = ({ data, exportOptions, zip }: any) => {
  const handleData = (item: any) => {
    const filteredData = filterJsonExportData({ data, fields: item?.fields });
    const jsonBlob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: "application/json",
    });
    if (zip) zip.file(`${item?.name}.json`, jsonBlob);
    else createDownloadUrl({ blob : jsonBlob, fileName: `${item?.name}.json` });
  };

  Object.values(exportOptions).map((item: any, index) => {
    if (item?.isMultipleDetails) {
      item?.details?.forEach((detail: any) => {
        handleData(detail);
      });
    } else {
      handleData(item);
    }
  });
};
