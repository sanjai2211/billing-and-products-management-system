import { AddressDetails } from "./address";

export const ShopDetails = [
  {
    id: "basic-details",
    sectionName: "Basic Details",
    icon: "ClipboardList",
    fields: [
      {
        id: "name",
        label: "Shop Name",
        placeholder: "Enter Shop name",
        component: "inputField",
      },
    ],
  },
  {
    id: "contact-details",
    sectionName: "Contact Details",
    icon: "Phone",

    fields: [
      {
        id: "phoneNumbers",
        label: "Phone Number",
        placeholder: "Enter Phone number",
        component: "inputField",
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Enter Email address",
        component: "inputField",
      },
    ],
  },
  AddressDetails,
];
