import {  DataStatusesWithoutDraft } from "../data-status";

export const FilterStockData = [
  {
    id: "dataStatus",
    sectionName: "Status",
    icon: "Grid2x2Check",
    component: "multipleSelect",
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
    label: "Supplier Name",
    icon: "User",
  },
  {
    value: "phoneNumbers",
    label: "Supplier Phone Number",
    icon: "PhoneCall",
  },
  {
    value: "email",
    label: "Supplier Email",
    icon: "Mail",
  },
  {
    value: "gstIn",
    label: "Supplier Gst-In Number",
    icon: "HandCoins",
  },
];
