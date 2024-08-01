export const ProductStatuses = [
  { value: "AVAILABLE", label: "Available" },
  // { value: "BACKORDER", label: "Backorder" },
  // { value: "CLEARANCE", label: "Clearance" },
  { value: "COMING_SOON", label: "Coming Soon" },
  // { value: "DISCONTINUED", label: "Discontinued" },
  // { value: "DRAFT", label: "Draft" },
  // { value: "IN_PRODUCTION", label: "In Production" },
  // { value: "LIMITED_EDITION", label: "Limited Edition" },
  { value: "NEW_ARRIVAL", label: "New Arrival" },
  // { value: "ON_SALE", label: "On Sale" },
  // { value: "OUT_OF_SEASON", label: "Out of Season" },
  { value: "OUT_OF_STOCK", label: "Out of Stock" },
  // { value: "PENDING", label: "Pending" },
  // { value: "PREORDER", label: "Preorder" },
  // { value: "RECALLED", label: "Recalled" },
  // { value: "RESERVED", label: "Reserved" },
  { value: "UNAVAILABLE", label: "Unavailable" },
];

export const ProductUnits = [
  { value: "PIECE", label: "Piece" },
  // { value: "KILOGRAM", label: "Kilogram" },
  // { value: "GRAM", label: "Gram" },
  // { value: "LITER", label: "Liter" },
  // { value: "METER", label: "Meter" },
  // { value: "CENTIMETER", label: "Centimeter" },
  // { value: "INCH", label: "Inch" },
  { value: "PACK", label: "Pack" },
  { value: "BOX", label: "Box" },
  { value: "BUNDLE", label: "Bundle" },
  // { value: "SET", label: "Set" },
  // { value: "DOZEN", label: "Dozen" },
  // { value: "GALLON", label: "Gallon" },
  // { value: "BARREL", label: "Barrel" },
  // { value: "CARTON", label: "Carton" },
  // { value: "SQUARE_METER", label: "Square Meter" },
  // { value: "CUBIC_METER", label: "Cubic Meter" },
];

export const ProductCategories = [
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "MACHINARIES", label: "Machinaries" },
  // { value: "FASHION", label: "Fashion" },
  // { value: "HOME_APPLIANCES", label: "Home Appliances" },
  // { value: "BOOKS", label: "Books" },
  // { value: "TOYS", label: "Toys" },
  // { value: "GROCERIES", label: "Groceries" },
  // { value: "HEALTH_BEAUTY", label: "Health & Beauty" },
  // { value: "SPORTS", label: "Sports" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  // { value: "MUSIC", label: "Music" },
  { value: "OFFICE_SUPPLIES", label: "Office Supplies" },
  // { value: "GARDEN", label: "Garden" },
  // { value: "PET_SUPPLIES", label: "Pet Supplies" },
  // { value: "JEWELRY", label: "Jewelry" },
  { value: "TOOLS_HARDWARE", label: "Tools & Hardware" },
  // { value: "TOURISM", label: "Tourism" },
  // { value: "FURNITURE", label: "Furniture" },
  // { value: "KITCHENWARE", label: "Kitchenware" },
  // { value: "ART_CRAFTS", label: "Art & Crafts" },
  // { value: "GAMES", label: "Games" },
  { value: "STATIONERY", label: "Stationery" },
];

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
        list: ProductCategories
      },
      {
        id: "unit",
        label: "Unit",
        placeholder: "Unit",
        component: "select",
        list: ProductUnits
      },
      {
        id: "status",
        label: "Status",
        placeholder: "Status",
        component: "select",
        list: ProductStatuses,
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



