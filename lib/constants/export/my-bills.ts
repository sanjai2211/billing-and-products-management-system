import { BillTemplate } from "@/lib/templates";

const billDetails = {
  id: "bill-details",
  name: "Bill Details",
  icon: "ClipboardList",
  description: "Get the details of your bill",
  page: "single",
  fields: [
    { id: "customer", label: "Customer", default: false },
    { id: "transport", label: "Transport", default: false },
    { id: "id", label: "ID", default: true },
    { id: "billNumber", label: "Bill Number", default: true },
    { id: "type", label: "Type", default: true },
    { id: "date", label: "Date", default: true },
    { id: "dueDate", label: "Due Date", default: false },
    { id: "paymentTerms", label: "Payment Terms", default: false },
    { id: "gst", label: "GST", default: true },
    { id: "cgst", label: "CGST", default: true },
    { id: "sgst", label: "SGST", default: true },
    { id: "gstOnReverseCharge", label: "GST on Reverse Charge", default: true },
    { id: "discountedAmount", label: "Discounted Amount", default: false },
    { id: "createdAt", label: "Created At", default: true },
    { id: "updatedAt", label: "Updated At", default: true },
    { id: "reverseCharge", label: "Reverse Charge", default: true },
    { id: "bankId", label: "Bank ID", default: false },
    { id: "customerId", label: "Customer ID", default: false },
    { id: "shopId", label: "Shop ID", default: true },
    { id: "Bank", label: "Bank", default: false },
    { id: "items", label: "Items", default: true },
    { id: "Customer", label: "Customer", default: false },
    { id: "address.addressLine1", label: "Address Line 1", default: false },
    { id: "address.addressLine2", label: "Address Line 2", default: true },
    { id: "address.city", label: "City", default: false },
    { id: "address.state", label: "State", default: true },
    { id: "address.zip", label: "Zip Code", default: false },
    { id: "id", label: "Customer ID", default: true },
    { id: "name", label: "Customer Name", default: false },
    { id: "email", label: "Email", default: true },
    { id: "faxNumber", label: "Fax Number", default: false },
    { id: "phoneNumbers", label: "Phone Numbers", default: true },
    { id: "shopId", label: "Shop ID", default: false },
    { id: "gstIn", label: "GSTIN", default: true },
    { id: "bankId", label: "Bank ID", default: false },
  ],
};

const purchasedProductDetails = {
  id: "purchased-product-details",
  name: "Purchased Product Details",
  icon: "Package",
  description: "Get the purchased poducts of the each bill",
  page: "multiple",
  sheetNameField: "Bill Number",
  fields: [
    { id: "billNumber", label: "Bill Number", default: true },
    {
      id: "phoneNumbers",
      label: "Phone Number",
    },
  ],
};

const detailsOptions = [billDetails, purchasedProductDetails];

const combinedOptions = [
  ...detailsOptions,
  {
    id: "bill-details-purchased-product-details",
    name: "Bill Details and Purchsed Product Details",
    isMultipleDetails: true,
    details: [billDetails, purchasedProductDetails],
    description:
      "Get the details of your bill and purchased poducts of the each bill.",
  },
];

export const ExportOptionsMyBills = {
  id: "my-bills",
  section: [
    {
      id: "excel",
      name: "Excel",
      component: "check",
      icon: "Sheet",
      options: combinedOptions,
    },
    {
      id: "pdf",
      name: "PDF",
      component: "check",
      icon: "FileText",
      options: [
        {
          id: "bills-seperate-file",
          name: "Bills (Seperate Files)",
          icon: "Folders",
          description: "Get the bills downloaded as Seperate Files",
          templateId: "billTemplate",
          pdfNameField: "billNumber",
          template: BillTemplate,
        },
        {
          id: "bills-single-file",
          name: "Bills (Single File)",
          icon: "FolderOpen",
          description: "Get the bills downloaded as Single File",
          isMultiplePage: true,
          templateId: "billTemplate",
          pdfName: "Bills",
          template: BillTemplate,
        },
      ],
    },
    {
      id: "csv",
      name: "CSV",
      component: "check",
      icon: "FileSpreadsheet",
      options: detailsOptions,
    },

    {
      id: "json",
      name: "JSON",
      component: "check",
      icon: "Braces",
      options: detailsOptions,
    },
  ],
};
