export const StateCodes = [
  { value: 37, label: "Andhra Pradesh", subField: "State Code - 37" },
  { value: 12, label: "Arunachal Pradesh", subField: "State Code - 12" },
  { value: 18, label: "Assam", subField: "State Code - 18" },
  { value: 10, label: "Bihar", subField: "State Code - 10" },
  { value: 22, label: "Chhattisgarh", subField: "State Code - 22" },
  { value: 30, label: "Goa", subField: "State Code - 30" },
  { value: 24, label: "Gujarat", subField: "State Code - 24" },
  { value: 6, label: "Haryana", subField: "State Code - 6" },
  { value: 2, label: "Himachal Pradesh", subField: "State Code - 2" },
  { value: 20, label: "Jharkhand", subField: "State Code - 20" },
  { value: 29, label: "Karnataka", subField: "State Code - 29" },
  { value: 32, label: "Kerala", subField: "State Code - 32" },
  { value: 23, label: "Madhya Pradesh", subField: "State Code - 23" },
  { value: 27, label: "Maharashtra", subField: "State Code - 27" },
  { value: 14, label: "Manipur", subField: "State Code - 14" },
  { value: 17, label: "Meghalaya", subField: "State Code - 17" },
  { value: 15, label: "Mizoram", subField: "State Code - 15" },
  { value: 13, label: "Nagaland", subField: "State Code - 13" },
  { value: 21, label: "Odisha", subField: "State Code - 21" },
  { value: 3, label: "Punjab", subField: "State Code - 3" },
  { value: 8, label: "Rajasthan", subField: "State Code - 8" },
  { value: 11, label: "Sikkim", subField: "State Code - 11" },
  { value: 33, label: "Tamil Nadu", subField: "State Code - 33" },
  { value: 36, label: "Telangana", subField: "State Code - 36" },
  { value: 16, label: "Tripura", subField: "State Code - 16" },
  { value: 9, label: "Uttar Pradesh", subField: "State Code - 9" },
  { value: 5, label: "Uttarakhand", subField: "State Code - 5" },
  { value: 19, label: "West Bengal", subField: "State Code - 19" },
  { value: 35, label: "Andaman and Nicobar Islands", subField: "Union Teritory Code - 35" },
  { value: 4, label: "Chandigarh", subField: "Union Teritory Code - 4" },
  { value: 26, label: "Dadra and Nagar Haveli and Daman and Diu", subField: "Union Teritory Code - 26" },
  { value: 7, label: "Delhi", subField: "Union Teritory Code - 7" },
  { value: 1, label: "Jammu and Kashmir", subField: "Union Teritory Code - 1" },
  { value: 38, label: "Ladakh", subField: "Union Teritory Code - 38" },
  { value: 31, label: "Lakshadweep", subField: "Union Teritory Code - 31" },
  { value: 34, label: "Puducherry", subField: "Union Teritory Code - 34" },
  { value: 99, label: "Centre Jurisdiction", subField: "Code - 99" },
  { value: 97, label: "Other Territory", subField: "Code - 97" },
];


export const AddressDetails = {
  id: "address-details",
  sectionName: "Address Details",
  icon: "MapPinned",
  fields: [
    {
      id: "addressLine1",
      label: "Address Line 1",
      placeholder: "Enter address line 1",
      component: "inputField",
    },
    {
      id: "addressLine2",
      label: "Address Line 2",
      placeholder: "Enter address line 2",
      component: "inputField",
    },
    {
      id: "city",
      label: "City",
      placeholder: "Enter city",
      component: "inputField",
    },
    {
      id: "state",
      label: "State",
      placeholder: "Enter state",
      component: "searchableField",
      list: StateCodes,
    },
    {
      id: "zip",
      label: "ZIP Code",
      placeholder: "Enter ZIP code",
      component: "inputField",
    },
  ],
};

const commonFieds = {
  component: "inputField",
  disabled: true,
};

export const DisabledAddressSection = {
  id: "address-details",
  sectionName: "Address Details",
  icon: "MapPinned",
  fields: [
    {
      id: "addressLine1",
      label: "Address Line 1",
      placeholder: "Enter address line 1",
      ...commonFieds,
    },
    {
      id: "addressLine2",
      label: "Address Line 2",
      placeholder: "Enter address line 2",
      ...commonFieds,
    },
    {
      id: "city",
      label: "City",
      placeholder: "Enter city",
      ...commonFieds,
    },
    {
      id: "state",
      label: "State",
      placeholder: "Enter state",
      ...commonFieds,
    },
    {
      id: "zip",
      label: "ZIP Code",
      placeholder: "Enter ZIP code",
      ...commonFieds,
    },
  ],
};
