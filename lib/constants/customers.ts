import { AddressDetails } from "./address";
import { ContactDetails } from "./contact";

export const CustomerTypes = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "SUPPLIER", label: "Supplier" },
  // { value: "AGENT", label: "Agent" },
];

export const AddCustomer = [
  {
    id: "basic-details",
    sectionName: "Basic Details",
    icon: "ClipboardList",
    fields: [
      {
        id: "customerName",
        label: "Name",
        placeholder: "Name",
        component: "inputField",
      },
      {
        id: "printName",
        label: "Print Name",
        placeholder: "Print Name",
        component: "inputField",
      },
      {
        id: "gstIn",
        label: "Gst In",
        placeholder: "Gst Number",
        component: "inputField",
      },
      {
        id: "customerType",
        label: "Type",
        placeholder: "Type",
        component: "select",
        list: CustomerTypes,
      },
    ],
  },

  ContactDetails,
  AddressDetails,
  // {
  //   id: "bank-details",
  //   sectionName: "Bank Details",
  //   icon: "ClipboardList",
  //   fields: [
  //     {
  //       id: "bankName",
  //       label: "Bank Name",
  //       placeholder: "Bank Name",
  //       component: "inputField",
  //     },

  //     {
  //       id: "accountNumber",
  //       label: "Account Number",
  //       placeholder: "Account Number",
  //       component: "inputField",
  //     },
  //     {
  //       id: "branchName",
  //       label: "Branch Name",
  //       placeholder: "Branch Name",
  //       component: "inputField",
  //     },
  //     {
  //       id: "ifscCode",
  //       label: "IFSC Code",
  //       placeholder: "IFSC Code",
  //       component: "inputField",
  //     },
  //   ],
  // },
];
