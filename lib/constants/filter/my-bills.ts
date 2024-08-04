import { BillTypes, PaymentTypes } from "../bill";

export const FilterBillData = [
  {
    id: "type",
    sectionName: "Bill Type",
    icon: "FolderSymlink",
    component: "multipleSelect",
    placeholder: "Bill Types",
    list: BillTypes,
  },
  {
    id: "date",
    sectionName: "Bill Dated",
    icon: "CalendarCheck",
    component: "datePicker",
    isMultipleDate: true,
  },
  {
    id: "dueDate",
    sectionName: "Due Dated",
    icon: "CalendarClock",
    component: "datePicker",
    isMultipleDate: true,
  },
  {
    id: "paymentTerms",
    sectionName: "Payment Terms",
    icon: "IndianRupee",
    component: "select",
    placeholder: "Select Bill Type",
    list: PaymentTypes,
  },
  {
    id: "createdAt",
    sectionName: "Created At",
    icon: "Pencil",
    component: "datePicker",
    isMultipleDate: true,
  },
];

export const SearchBillData = [
  {
    value: "billNumber",
    label: "Bill Number",
    icon: "ScrollText",
  },
  {
    value: "customer Name",
    label: "Customer Name",
    icon: "User",
  },
  {
    value: "phoneNumbers",
    label: "Phone Number",
    icon: "PhoneCall",
  },
  {
    value: "email",
    label: "Customer Email",
    icon: "Mail",
  },
  {
    value: "gstIn",
    label: "Gst-In Number",
    icon: "HandCoins",
  },
];
