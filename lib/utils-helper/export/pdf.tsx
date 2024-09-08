import React from "react";
import { pdf, StyleSheet } from "@react-pdf/renderer";
import JSZip from "jszip";
import { CreatePDFDocument } from "@/lib/templates";
import { createDownloadUrl } from "./create-download-url";

const handlePdfGeneration = async ({ data, fileName, zip, template }: any) => {
  const globalStyle = StyleSheet.create({
    hidden : {
      display : 'none'
    }

  })
  const document = <CreatePDFDocument data={data} template={template} theme={'light'} download={true} />;
  const blob = await pdf(document).toBlob();

  if (zip) {
    zip.file(`${fileName}.pdf`, blob);
  } else {
    createDownloadUrl({ blob, fileName });
  }
};

export const exportToPdf = async ({ data, exportOptions, zip }: any) => {

  const zipInstance = !zip && data?.length > 1 ? new JSZip() : zip;

  for (const option of Object.values(exportOptions as any)) {
    if ((option as any).isMultiplePage) {
      await handlePdfGeneration({
        data,
        fileName: (option as any).pdfName,
        zip: zipInstance,
        template: (option as any)?.template,
      });
    } else {
      for (const page of data) {
        await handlePdfGeneration({
          data: [page],
          fileName:
            page[(option as any).pdfNameField] || (option as any).pdfName,
          zip: zipInstance,
          template: (option as any)?.template,
        });
      }
    }
  }

  if (!zip) {
    const zipBlob = await zipInstance.generateAsync({ type: "blob" });
    createDownloadUrl({ blob: zipBlob, fileName: "Bills.zip" });
  }
};
