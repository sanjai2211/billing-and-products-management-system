import {  DataStatusesWithoutDraft } from "../data-status";

export const FilterStockData = [
  {
    id: "dataStatus",
    sectionName: "Status",
    icon: "Grid2x2Check",
    component: "select",
    placeholder: "Status",
    list: DataStatusesWithoutDraft,
  },
  {
    id: "createdAt",
    sectionName: "Created At",
    icon: "Pencil",
    component: "datePicker",
    isMultipleDate: true,
  },
];

export const SearchStockData = [
  {
    value: "customerName",
    label: "Name",
    icon: "User",
  },
  {
    value: "phoneNumbers",
    label: "Phone Number",
    icon: "PhoneCall",
  },
  {
    value: "email",
    label: "Email",
    icon: "Mail",
  },
  {
    value: "gstIn",
    label: "Gst-In Number",
    icon: "HandCoins",
  },
];
