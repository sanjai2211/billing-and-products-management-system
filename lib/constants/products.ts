export const AdddProduct = [
  {
    id: "basic-details",
    sectionName: "Basic Details",
    icon: "ClipboardList",
    fields: [
      {
        id: "code",
        label: "Code",
        placeholder: "Code",
        component: "inputField",
      },
      {
        id: "productName",
        label: "Product Name",
        placeholder: "Product Name",
        component: "inputField",
      },
      {
        id: "printName",
        label: "Print Name",
        placeholder: "Name to Display in Bill",
        component: "inputField",
      },
      {
        id: "category",
        label: "Category",
        placeholder: "Catergory",
        component: "select",
        list: [
          {
            label: "Category 1",
            value: "category 1",
          },
          {
            label: "Category 2",
            value: "category 2",
          },
        ],
      },
      {
        id: "unit",
        label: "Unit",
        placeholder: "Unit",
        component: "select",
        list: [
          {
            label: "Unit 1",
            value: "Unit 1",
          },
          {
            label: "Unit 2",
            value: "Unit 2",
          },
        ],
      },
      {
        id: "status",
        label: "Status",
        placeholder: "Status",
        component: "select",
        list: [
          {
            label: "AVAILABLE",
            value: "AVAILABLE",
          },
          {
            label: "Unit 2",
            value: "Unit 2",
          },
        ],
      },
    ],
  },
  {
    id: "brand-details",
    sectionName: "Brand Details",
    icon: "BadgeCheck",
    fields: [
      {
        id: "group",
        label: "Group",
        placeholder: "Group",
        component: "inputField",
      },
      {
        id: "brand",
        label: "Brand",
        placeholder: "Brand",
        component: "inputField",
      },
    ],
  },
  {
    id: "cost-details",
    sectionName: "Cost Details",
    icon: "IndianRupee",
    fields: [
      {
        id: "cost",
        label: "Cost",
        placeholder: "Cost",
        component: "inputField",
      },
      {
        id: "mrp",
        label: "Market Retail Price",
        placeholder: "MRP",
        component: "inputField",
      },
      {
        id: "purchaseRate",
        label: "Purchase Rate",
        placeholder: "Purchase Rate",
        component: "inputField",
      },
      {
        id: "salesRate",
        label: "Sales Rate",
        placeholder: "Sales Rate",
        component: "inputField",
      },
    ],
  },
  {
    id: "gst-details",
    sectionName: "GST Details",
    icon: "HandCoins",
    fields: [
      {
        id: "gstPurchase",
        label: "GST Purchase",
        placeholder: "GST Purchase",
        component: "inputField",
      },
      {
        id: "gstSales",
        label: "GST Sales",
        placeholder: "GST Sales",
        component: "inputField",
      },
      {
        id: "igstPurchase",
        label: "IGST Purchase",
        placeholder: "IGST Purchase",
        component: "inputField",
      },
      {
        id: "igstSales",
        label: "IGST Sales",
        placeholder: "IGST Sales",
        component: "inputField",
      },
      {
        id: "hsnCode",
        label: "HSN Code",
        placeholder: "HSN Code",
        component: "inputField",
      },
    ],
  },
  {
    id: "stock-details",
    sectionName: "Stock Details",
    icon: "Layers",
    fields: [
      {
        id: "openStock",
        label: "Open Stock",
        placeholder: "Open Stock",
        component: "inputField",
      },
      {
        id: "stockValue",
        label: "Stock Value",
        placeholder: "Stock Value",
        component: "inputField",
      },
    ],
  },
];
