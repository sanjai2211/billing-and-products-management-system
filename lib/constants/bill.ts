import { AddressDetails } from "./address";

export const BillBasicDetails = {
  id: "basic-details",
  sectionName: "Basic Details",
  icon: "ClipboardList",
  fields: [
    // {
    //   id: "type",
    //   label: "Bill Type",
    //   placeholder: "Bill Type",
    //   component: "select",
    //   list: [
    //     { label: "Bill", value: "BILL" },
    //     { label: "Quotation", value: "QUOTATION" },
    //     { label: "Tax Invoice", value: "TAX_INVOICE" },
    //   ],
    // },
    {
      id: "date",
      label: "Date",
      placeholder: "Date",
      component: "datePicker",
    },
    // {
    //   id: "dueDate",
    //   label: "Due Date",
    //   placeholder: "Due Date",
    //   component: "datePicker",
    //   parent: "type",
    //   condition: {
    //     display: {
    //       value: "QUOTATION",
    //       basedOn: "equal",
    //     },
    //     disabled: {
    //       valueField: "date",
    //       basedOn: "greater_than",
    //     },
    //   },
    // },
    {
      id: "paymentTerms",
      label: "Payment Terms",
      placeholder: "Payment Terms",
      component: "select",
      list: [
        { label: "Credit", value: "CREDIT" },
        { label: "Cash", value: "CASH" },
      ],
      // defaultValue: "CASH",
    },
    // {
    //   id: "gst",
    //   label: "GST",
    //   placeholder: "GST",
    //   component: "inputField",

    // },
    // {
    //   id: "cgst",
    //   label: "CGST",
    //   placeholder: "CGST",
    //   component: "inputField",
    // },
    // {
    //   id: "sgst",
    //   label: "SGST",
    //   placeholder: "SGST",
    //   component: "inputField",
    // },
    // {
    //   id: "gstOnReverseCharge",
    //   label: "GST on Reverse Charge",
    //   placeholder: "GST on Reverse Charge",
    //   component: "inputField",
    // },
    // {
    //   id: "discountedAmount",
    //   label: "Discounted Amount",
    //   placeholder: "Discounted Amount",
    //   component: "inputField",
    // },
    // {
    //   id: "reverseCharge",
    //   label: "Reverse Charge",
    //   placeholder: "Reverse Charge",
    //   component: "checkbox",
    // },
  ],
};

export const CustomerDetails = [
  {
    id: "customer-details",
    sectionName: "Customer Details",
    icon: "User",
    fields: [
      {
        id: "name",
        label: "Customer Name",
        placeholder: "Customer Name",
        component: "searchableField",
        // isSwitchable : true,
        // switchableComponenet : "inputField"
      },
      {
        id: "phoneNumber",
        label: "Phone Number",
        placeholder: "Phone Number",
        component: "searchableField",
        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Email",
        component: "searchableField",
        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
      // {
      //   id: "faxNumber",
      //   label: "Fax Number",
      //   placeholder: "Fax Number",
      //   component: "inputField",
      // },
      {
        id: "customerAddress",
        label: "Customer Address",
        placeholder: "Customer Address",
        component: "inputField",
        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
      {
        id: "gstIn",
        label: "GSTIN",
        placeholder: "GSTIN",
        component: "searchableField",

        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
    ],
  },
  {
    ...AddressDetails,
    sectionName: "Customer Address Details",
    items: AddressDetails?.fields?.map((item: any) => ({
      ...item,
      disabled: true,
    })),
  },
];

export const BankDetails = [
  {
    id: "bank-details",
    sectionName: "Bank Details",
    icon: "Landmark",
    fields: [
      {
        id: "bankName",
        label: "Choose Bank",
        placeholder: "Bank Name",
        component: "searchableField",
      },
      {
        id: "accountNumber",
        label: "Account Number",
        placeholder: "Account Number",
        component: "inputField",
      
      },
      {
        id: "branchName",
        label: "Branch Name",
        placeholder: "Branch Name",
        component: "inputField",
        disabled: true,
      },
      {
        id: "ifscCode",
        label: "IFSC Code",
        placeholder: "IFSC Code",
        component: "inputField",
        disabled: true,
      },
    ],
  },
];
export const BillDetails = [
  {
    id: "basic-details",
    sectionName: "Basic Details",
    icon: "ClipboardList",
    fields: [
      {
        id: "type",
        label: "Bill Type",
        placeholder: "Bill Type",
        component: "select",
        list: [
          { label: "Bill", value: "BILL" },
          { label: "Quotation", value: "QUOTATION" },
          { label: "Tax Invoice", value: "TAX_INVOICE" },
        ],
      },
      {
        id: "date",
        label: "Date",
        placeholder: "Date",
        component: "datePicker",
      },
      {
        id: "dueDate",
        label: "Due Date",
        placeholder: "Due Date",
        component: "datePicker",
        parent: "type",
        condition: {
          display: {
            value: "QUOTATION",
            basedOn: "equal",
          },
          disabled: {
            valueField: "date",
            basedOn: "greater_than",
          },
        },
      },
      {
        id: "paymentTerms",
        label: "Payment Terms",
        placeholder: "Payment Terms",
        component: "select",
        list: [
          { label: "Credit", value: "CREDIT" },
          { label: "Cash", value: "CASH" },
        ],
        // defaultValue: "CASH",
      },
      // {
      //   id: "gst",
      //   label: "GST",
      //   placeholder: "GST",
      //   component: "inputField",

      // },
      // {
      //   id: "cgst",
      //   label: "CGST",
      //   placeholder: "CGST",
      //   component: "inputField",
      // },
      // {
      //   id: "sgst",
      //   label: "SGST",
      //   placeholder: "SGST",
      //   component: "inputField",
      // },
      // {
      //   id: "gstOnReverseCharge",
      //   label: "GST on Reverse Charge",
      //   placeholder: "GST on Reverse Charge",
      //   component: "inputField",
      // },
      // {
      //   id: "discountedAmount",
      //   label: "Discounted Amount",
      //   placeholder: "Discounted Amount",
      //   component: "inputField",
      // },
      // {
      //   id: "reverseCharge",
      //   label: "Reverse Charge",
      //   placeholder: "Reverse Charge",
      //   component: "checkbox",
      // },
    ],
  },
  {
    id: "customer-details",
    sectionName: "Customer Details",
    icon: "User",
    fields: [
      {
        id: "name",
        label: "Customer Name",
        placeholder: "Customer Name",
        component: "searchableField",
        // isSwitchable : true,
        // switchableComponenet : "inputField"
      },
      {
        id: "phoneNumber",
        label: "Phone Number",
        placeholder: "Phone Number",
        component: "searchableField",
        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Email",
        component: "searchableField",
        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
      // {
      //   id: "faxNumber",
      //   label: "Fax Number",
      //   placeholder: "Fax Number",
      //   component: "inputField",
      // },
      {
        id: "customerAddress",
        label: "Customer Address",
        placeholder: "Customer Address",
        component: "inputField",
        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
      {
        id: "gstIn",
        label: "GSTIN",
        placeholder: "GSTIN",
        component: "searchableField",

        // condition: {
        //   disabled: {
        //     valueField: "name",
        //     basedOn: "equal",
        //     value : true
        //   },
        // },
      },
    ],
  },
  {
    id: "bank-details",
    sectionName: "Bank Details",
    icon: "Landmark",
    fields: [
      {
        id: "bankName",
        label: "Choose Bank",
        placeholder: "Bank Name",
        component: "searchableField",
      },
      {
        id: "accountNumber",
        label: "Account Number",
        placeholder: "Account Number",
        component: "inputField",
        disabled: true,
      },
      {
        id: "branchName",
        label: "Branch Name",
        placeholder: "Branch Name",
        component: "inputField",
        disabled: true,
      },
      {
        id: "ifscCode",
        label: "IFSC Code",
        placeholder: "IFSC Code",
        component: "inputField",
        disabled: true,
      },
    ],
  },
  {
    id: "transport-details",
    sectionName: "Transport Details",
    icon: "Truck",
    fields: [
      {
        id: "referenceNumber",
        label: "Reference Number",
        placeholder: "Reference Number",
        component: "inputField",
      },
      {
        id: "transport",
        label: "Transport",
        placeholder: "Transport",
        component: "inputField",
      },
      {
        id: "transportDetails",
        label: "Transport Details",
        placeholder: "Transport Details",
        component: "inputField",
      },
      {
        id: "ewayBill",
        label: "Eway Bill",
        placeholder: "Eway Bill",
        component: "inputField",
      },
      {
        id: "lorryReceiptNumber",
        label: "Lorry Receipt Number",
        placeholder: "Lorry Receipt Number",
        component: "inputField",
      },
      {
        id: "postOrderNumber",
        label: "Post Order Number",
        placeholder: "Post Order Number",
        component: "inputField",
      },
      {
        id: "postOrderDate",
        label: "Post Order Date",
        placeholder: "Post Order Date",
        component: "datePicker",
      },
    ],
  },
];

export const BillData = [
  // {
  //   id: "nameproduct",
  //   label: "HSN Code",
  //   placeholder: "HSN Code",
  //   component: "searchableField",
  // },

  {
    id: "hsnCode",
    label: "HSN Code",
    placeholder: "HSN Code",
    component: "inputField",
  },
  //   {
  //     id: "gst",
  //     label: "GST",
  //     placeholder: "GST",
  //     component: "inputField",
  //   },
  {
    id: "quantity",
    label: "Quantity",
    placeholder: "Quantity",
    component: "inputField",
  },
  //   {
  //     id: "unit",
  //     label: "Unit",
  //     placeholder: "Unit",
  //     component: "inputField",
  //   },
  {
    id: "cost",
    label: "Rate",
    placeholder: "Rate",
    component: "inputField",
  },
  {
    id: "discount",
    label: "Discount",
    placeholder: "Discount",
    component: "inputField",
  },
];

// {
//   id: "billing-items",
//   sectionName: "Billing Items",
//   icon: "List",

// },

export const BillTypes = [
  { value: "BILL", label: "Bill" },
  { value: "TAX_INVOICE", label: "Tax Invoice" },
  { value: "QUOTATION", label: "Quotation" },
];
export const PaymentTypes = [
  { label: "Credit", value: "CREDIT" },
  { label: "Cash", value: "CASH" },
];
