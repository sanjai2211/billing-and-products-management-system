const billDetails = {
  id: "bill-details",
  name: "Bill Details",
  icon: "ClipboardList",
  description: "Get the details of your bill",
  page: "single",
  fields: [
    { id: "billNumber", fieldName: "Bill Number", default: true },
    {
      id: "phoneNumbers",
      fieldName: "Phone Number",
    },
  ],
};

const purchasedProductDetails = {
  id: "purchased-product-details",
  name: "Purchased Product Details",
  icon: "Package",
  description: "Get the purchased poducts of the each bill",
  page: "multiple",
  fields: [
    { id: "billNumber", fieldName: "Bill Number", default: true },
    {
      id: "phoneNumbers",
      fieldName: "Phone Number",
    },
  ],
};
export const ExportOptionsMyBills = {
  id: "my-bills",
  section: [
    {
      id: "excel",
      name: "Check",
      component: "check",
      icon: "Sheet",
      options: [
        billDetails,
        purchasedProductDetails,
        {
          id: "bill-details-purchased-product-details",
          name: "Bill Details and Purchsed Product Details",
          isMultipleDetails: true,
          details: [billDetails, purchasedProductDetails],
          description:
            "Get the details of your bill and purchased poducts of the each bill.",
        },
      ],
    },
    {
      id: "csv",
      name: "Radio",
      component: "radio",
      icon: "FileSpreadsheet",
      options: [
        billDetails,
        purchasedProductDetails,
        {
          id: "bill-details-purchased-product-details",
          name: "Bill Details and Purchsed Product Details",
          isMultipleDetails: true,
          details: [billDetails, purchasedProductDetails],
          description:
            "Get the details of your bill and purchased poducts of the each bill.",
        },
      ],
    },
    {
      id: "pdf",
      name: "check -check",
      component: "check",
      icon: "FileText",
      options: [
        {
          id: "bill-details",
          name: "Bill Details 5",
          icon: "Eye",
          description: "Get the details of your bill",
          isCombined: true,
          component: "check",
          options: [
            {
              id: "bill-details",
              name: "Bill Details 6",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "single",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
            {
              id: "purchased-product-details",
              name: "Purchased Product Details",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "multiple",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
          ],
        },
        {
          id: "bill-details-purchased-product-details",
          name: "Bill Details and Purchsed Product Details",
          isMultipleDetails: true,
          details: [billDetails, purchasedProductDetails],
          description:
            "Get the details of your bill and purchased poducts of the each bill.",
        }
      ],
    },
    {
      id: "pdf1",
      name: "check -radio",
      component: "check",
      icon: "FileText",
      options: [
        {
          id: "bill-details",
          name: "Bill Details 5",
          icon: "Eye",
          description: "Get the details of your bill",
          isCombined: true,
          component: "radio",
          options: [
            {
              id: "bill-details",
              name: "Bill Details 6",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "single",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
            {
              id: "purchased-product-details",
              name: "Purchased Product Details",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "multiple",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
          ],
        },
        {
          id: "bill-details-purchased-product-details",
          name: "Bill Details and Purchsed Product Details",
          isMultipleDetails: true,
          details: [billDetails, purchasedProductDetails],
          description:
            "Get the details of your bill and purchased poducts of the each bill.",
        }
      ],
    },
    {
      id: "pdf123",
      name: "radio -check",
      component: "radio",
      icon: "FileText",
      options: [
        {
          id: "bill-details",
          name: "Bill Details 5",
          icon: "Eye",
          description: "Get the details of your bill",
          isCombined: true,
          component: "check",
          options: [
            {
              id: "bill-details",
              name: "Bill Details 6",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "single",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
            {
              id: "purchased-product-details",
              name: "Purchased Product Details",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "multiple",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
          ],
        },
        {
          id: "bill-details-purchased-product-details",
          name: "Bill Details and Purchsed Product Details",
          isMultipleDetails: true,
          details: [billDetails, purchasedProductDetails],
          description:
            "Get the details of your bill and purchased poducts of the each bill.",
        }
      ],
    },
    {
      id: "pdf12",
      name: "radio -radio",
      component: "radio",
      icon: "FileText",
      options: [
        {
          id: "bill-details",
          name: "Bill Details 5",
          icon: "Eye",
          description: "Get the details of your bill",
          isCombined: true,
          component: "radio",
          options: [
            {
              id: "bill-details",
              name: "Bill Details 6",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "single",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
            {
              id: "purchased-product-details",
              name: "Purchased Product Details",
              icon: "Eye",
              description: "Get the details of your bill",
              page: "multiple",
              component: "check",
              fields: [
                { id: "billNumber", fieldName: "Bill Number", default: true },
                {
                  id: "phoneNumbers",
                  fieldName: "Phone Number",
                },
              ],
            },
          ],
        },
        {
          id: "bill-details-purchased-product-details",
          name: "Bill Details and Purchsed Product Details",
          isMultipleDetails: true,
          details: [billDetails, purchasedProductDetails],
          description:
            "Get the details of your bill and purchased poducts of the each bill.",
        }
      ],
    },
    
    
    {
      id: "json",
      name: "JSON",
      component: "radio",
      icon: "Braces",
    },
  ],
};
