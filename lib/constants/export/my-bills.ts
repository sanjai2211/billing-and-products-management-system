import { BillTemplate } from "@/lib/templates";

const billDetails = {
  id: "bill-details",
  name: "Bill Details",
  icon: "ClipboardList",
  description: "Get the details of your bill",
  page: "single",
  fields: [
    

    { id: "billNumber", label: "Bill Number", default: true },
    { id: "type", label: "Bill Type", default: true },
    { id: "name", label: "Customer Name", default: true },

    
    { id: "Bank.bankname", label: "Bank Name", default: true },
    { id: "Bank.branchName", label: "BranchName", default: true },

    
    
    
    { id: "date", label: "Date", default: true },
    
    
   
    { id: "discountedAmount", label: "Discounted Amount", default: false },
    { id: "createdAt", label: "Created At", default: false },
    { id: "updatedAt", label: "Updated At", default: false },
    
   
    { id: "Bank", label: "Bank", default: false },
    { id: "items", label: "Items", default: true },
    { id: "Customer", label: "Customer", default: false },
   
   
    { id: "email", label: "Email", default: true },
   
    { id: "phoneNumbers", label: "Phone Numbers", default: true },
    
    
    
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
    {id: "product.productName",label: "Product Name", default: true },
    {id: "product.printName",label: "Print Name", default: false },
    { id: "cost", label: "Saled price", default: true },
    { id: "billNumber", label: "Bill Number", default: false },
    { id: "quantity", label: "Quantity", default: true },

    { id: "code", label: "Product Code", default: false },
    {id: "phoneNumbers",label: "Phone Number", default: false },
   
    {id: "product.category",label: "Category", default: false },
    {id: "product.unit",label: "Unit", default: false },
    {id: "product.group",label: "Group", default: false },
    {id: "product.brand",label: "Brand", default: false },
    {id: "product.mrp",label: "MRP", default: false },
    {id: "product.salesRate",label: "Sales Rate", default: false },
    {id: "product.gstPurchase",label: "Purchase Rate", default: false },
    {id: "product.hsnCode",label: "HSN Code", default: false },
    {id: "product.status",label: "Status", default: false },

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
