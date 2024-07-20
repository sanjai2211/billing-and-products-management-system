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
      component: "inputField",
      disabled: true,
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
      ...commonFieds
    },
    {
      id: "addressLine2",
      label: "Address Line 2",
      placeholder: "Enter address line 2",
      ...commonFieds
    },
    {
      id: "city",
      label: "City",
      placeholder: "Enter city",
      ...commonFieds
    },
    {
      id: "state",
      label: "State",
      placeholder: "Enter state",
      ...commonFieds
    },
    {
      id: "zip",
      label: "ZIP Code",
      placeholder: "Enter ZIP code",
      ...commonFieds
    },
  ],
};
