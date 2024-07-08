export const MenuData = [
  {
    id: "base",
    items: [
      {
        name: "Dashboard",
        icon: "LayoutDashboard",
        path: "/",
      },
    ],
  },

  // {
  //   id: "billing",
  //   sectionName: "Billing",
  //   items: [
  //     {
  //       name: "New Bill",
  //       icon: "ClipboardList",
  //       path: "/new-bill",
  //     },
  //   ],
  // },
  {
    id: "products",
    sectionName: "Products",
    icon: "Boxes",
    items: [
      {
        name: "Add Product",
        icon: "ListPlus",
        path: "/new-product",
      },
      {
        name: "My Products",
        icon: "ListTodo",
        path: "/products",
      },
    ],
  },
  {
    id: "reports",
    sectionName: "Reports",
    icon: "BarChart3",
    items: [
      {
        name: "Bill Details",
        icon: "ListTodo",
        path: "/reports/products",
      },
      {
        name: "Products Details",
        icon: "FileBarChart",
        path: "/reports/products",
      },
      {
        name: "Purchase Details",
        icon: "Cable",
        path: "/reports/products",
      },
    ],
  },
  {
    id: "settings",
    sectionName: "Settings",
    icon: "Settings",
    items: [
      {
        name: "Bill Settings",
        icon: "ListTodo",
        path: "/reports/products",
      },
      {
        name: "Products Settings",
        icon: "FileBarChart",
        path: "/reports/products",
      },
      {
        name: "Purchase Details",
        icon: "Cable",
        path: "/reports/products",
      },
    ],
  },
];
