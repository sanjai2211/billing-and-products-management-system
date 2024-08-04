export const StockBasicDetails = {
  id: "basic-details",
  sectionName: "Basic Details",
  icon: "ClipboardList",
  fields: [
    {
      id: "date",
      label: "Date",
      placeholder: "Date",
      component: "datePicker",
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
    },
  ],
};
