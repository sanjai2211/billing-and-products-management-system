import { CustomerTypes } from "../customers";
import { ProductCategories, ProductStatuses } from "../products";

export const FilterProductData = [
  {
    id: "status",
    sectionName: "Type",
    icon: "Grid2x2Check",
    component: "select",
    placeholder: "Status",
    list: ProductStatuses,
  },
  {
    id: "category",
    sectionName: "Category",
    icon: "LayoutList",
    component: "select",
    placeholder: "Category",
    list: ProductCategories,
  },

  {
    id: "createdAt",
    sectionName: "Created At",
    icon: "Pencil",
    component: "datePicker",
    isMultipleDate: true,
  },
];

export const SearchProductData = [
  {
    value: "code",
    label: "Product Code",
    icon: "ScanBarcode",
  },
  {
    value: "productName",
    label: "Product Name",
    icon: "FileBox",
  },
  {
    value: "group",
    label: "Group",
    icon: "Target",
  },
  {
    value: "brand",
    label: "Brand",
    icon: "Ribbon",
  },
  {
    value: "hsnCode",
    label: "HSN Code",
    icon: "SquareKanban",
  },
];
