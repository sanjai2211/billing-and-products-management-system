import { AddressDetails } from "./address";
import { ContactDetails } from "./contact";

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
  ContactDetails,
  AddressDetails,
];
