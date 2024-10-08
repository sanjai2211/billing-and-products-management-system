import {  CreatePDFDocument } from "@/lib/templates";
import TemplateOne from "@/lib/templates/tax-invoice/template-1";
import { pdf } from "@react-pdf/renderer";

export const handlePrintBill = async ({
  data,
  template = TemplateOne,
}: any) => {
  try {
    // Generate the PDF as a blob
    const pdfCreation = (
      <CreatePDFDocument
        data={Array.isArray(data) ? data : [data]}
        template={template}
        download={true}
      />
    );

    // Convert PDF creation to a Blob
    const blob = await pdf(pdfCreation).toBlob();

    // Debugging: Check if blob was generated successfully
    if (!blob) {
      console.error("Failed to generate Blob for PDF");
      return;
    }

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // Hide the iframe to avoid visual clutter
    iframe.src = url;

    // Append the iframe to the document body
    document.body.appendChild(iframe);

    // Once the iframe is loaded, trigger the print dialog
    iframe.onload = () => {
      iframe.contentWindow?.focus(); // Focus on the iframe content
      iframe.contentWindow?.print(); // Trigger the print dialog

      // Optional: Clean up by removing the iframe after printing
      iframe.onload = () => document.body.removeChild(iframe);
    };
  } catch (error) {
    console.error("Error in handlePrintBill: ", error);
  }
};
