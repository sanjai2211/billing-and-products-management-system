import { CustomerTypes } from "../customers";

export const FilterCustomerData = [
  {
    id: "customerType",
    sectionName: "Type",
    icon: "SquareUserRound",
    component: "select",
    placeholder :"Types",
    list: CustomerTypes,
  },
  {
    id: "createdAt",
    sectionName: "Created At",
    icon: "Pencil",
    component: "datePicker",
    isMultipleDate : true
  },
];

export const SearchCustomerData = [
  {
    value : 'customerName',
    label : 'People Name',
    icon : "User",
  },
  {
    value : 'phoneNumbers',
    label : 'Phone Number',
    icon : "PhoneCall",
  },
  {
    value : 'email',
    label : 'Email',
    icon : "Mail",
  },
  {
    value : 'gstIn',
    label : 'Gst-In Number',
    icon : "HandCoins",
  },
  
]
