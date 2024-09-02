import { BillTemplate, CreatePDFDocument } from "@/lib/templates";
import { pdf } from "@react-pdf/renderer";

export const handlePrintBill = async ({
  data,
  template = BillTemplate,
}: any) => {
  // Generate the PDF as a blob
  const pdfCreation = (
    <CreatePDFDocument
      data={Array.isArray(data) ? data : [data]}
      template={template}
    />
  );

  const blob = await pdf(pdfCreation).toBlob();

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  // Create an iframe element dynamically
  const iframe = document.createElement("iframe") as any;
  iframe.style.display = 'none'; // Hide the iframe
  iframe.src = url;

  // Append the iframe to the body
  document.body.appendChild(iframe);
  console.log(iframe.contentWindow, iframe);
  // Wait for the iframe to load the content
  iframe.onload = () => {
    // Trigger the print dialog for the content in the iframe
    iframe.contentWindow.print();

    // Remove the iframe after printing
    document.body.removeChild(iframe);
  };
};
