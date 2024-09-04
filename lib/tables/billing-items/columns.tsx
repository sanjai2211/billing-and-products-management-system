"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";

const getTotalRate = (data: any) => {
  return (
    (
      data?.getValue("cost") * data?.getValue("quantity") -
      (data?.getValue("cost") *
        data?.getValue("quantity") *
        data?.getValue("discount")) /
        100
    ).toFixed(2) || 0
  );
};

const itemsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "sNo",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row } :any) => <div className="w-[40px]">{row.index + 1}</div>,
  },
  {
    accessorKey: "code",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row } :any) => {
      return <div className="w-[80px]">{row?.original?.product?.code}</div>;
    },
  },
  {
    accessorKey: "product",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row } :any) => {
      return (
        <div className="w-[80px]">{row?.original?.product?.printName}</div>
      );
    },
  },
  {
    accessorKey: "hsnCode",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="HSN Code" />
    ),
    cell: ({ row } :any) => <div>{row?.original?.product?.hsnCode || "-"}</div>,
  },
  {
    accessorKey: "cost",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row } :any) => <div>&#8377; {row.getValue("cost") || "-"} </div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row } :any) => (
      <div>
        {row.getValue("quantity") || "0"} {row?.original?.product?.unit}
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row } :any) => <div>{row.getValue("discount") || "0"} %</div>,
  },
  {
    accessorKey: "rate",
    header: ({ column} :any) => (
      <DataTableColumnHeader
        column={column}
        title="Rate"
        className="text-purple-500"
      />
    ),
    cell: ({ row } :any) => (
      <div className="text-purple-500">&#8377; {getTotalRate(row)}</div>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column} :any) => (
      <DataTableColumnHeader column={column} title="Id" className="hidden" />
    ),
    cell: ({ row } :any) => <div className="hidden">{row.getValue("id")}</div>,
  },
  // {
  //   accessorKey: "gst",
  //   header: ({ column} :any) => (
  //     <DataTableColumnHeader column={column} title="Unit" />
  //   ),
  //   cell: ({ row } :any) => <div>{row.getValue("stockValue") || "-"}</div>,
  // },

  // {
  //   accessorKey: "gstSales",
  //   header: ({ column} :any) => (
  //     <DataTableColumnHeader column={column} title="GST Sales" />
  //   ),
  //   cell: ({ row } :any) => <div>{row.getValue("gstSales") || 0} %</div>,
  // },

  // {
  //   accessorKey: "igstSales",
  //   header: ({ column} :any) => (
  //     <DataTableColumnHeader column={column} title="IGST Sales" />
  //   ),
  //   cell: ({ row } :any) => <div>{row.getValue("igstSales") || 0} %</div>,
  // },
];

const totalColumns = (isIntraTrade: any) => {
  return [
    {
      accessorKey: "sNo",

      header: ({ column} :any) => (
        <DataTableColumnHeader column={column} title="S.No" />
      ),
      cell: ({ row } :any) => <div className="w-[40px]">{row.index + 1}</div>,
    },
    {
      accessorKey: "hsnCode",
      header: ({ column} :any) => (
        <DataTableColumnHeader column={column} title="HSN Code" />
      ),
      cell: ({ row } :any) => {
        return <div className="w-[80px]">{row.getValue("hsnCode")}</div>;
      },
    },
    {
      accessorKey: "taxableValue",
      header: ({ column} :any) => (
        <DataTableColumnHeader
          column={column}
          title="Taxable Value"
          className="text-purple-500"
        />
      ),
      cell: ({ row } :any) => {
        return (
          <div className="w-[80px] text-purple-500">
            &#8377; {row.getValue("taxableValue")}
          </div>
        );
      },
    },
    {
      header: "CGST",
      columns: [
        {
          accessorKey: "rateOfCgst",
          header: "Rate",
          cell: ({ row } :any) => {
            return (
              <div className="w-[80px] divide-x divide divide-y">
                {isIntraTrade ? row.getValue("rateOfCgst") : 0} %
              </div>
            );
          },
        },
        {
          accessorKey: "cgstTotal",
          header: ({ column} :any) => (
            <DataTableColumnHeader
              column={column}
              title="Amount"
              className="text-pink-500"
            />
          ),
          cell: ({ row } :any) => {
            return (
              <div className="w-[80px] text-pink-500">
                &#8377; {isIntraTrade ? row.getValue("cgstTotal") : 0}
              </div>
            );
          },
        },
      ],
    },
    {
      header: "SGST",
      columns: [
        {
          accessorKey: "rateOfSgst",
          header: "Rate",
          cell: ({ row } :any) => {
            return (
              <div className="w-[80px] divide-x divide divide-y">
                {isIntraTrade ? row.getValue("rateOfSgst") : 0} %
              </div>
            );
          },
        },
        {
          accessorKey: "sgstTotal",
          header: ({ column} :any) => (
            <DataTableColumnHeader
              column={column}
              title="Amount"
              className="text-orange-500"
            />
          ),
          cell: ({ row } :any) => {
            return (
              <div className="w-[80px] text-orange-500">
                &#8377; {isIntraTrade ? row.getValue("sgstTotal") : 0}
              </div>
            );
          },
        },
      ],
    },
    {
      header: "IGST",
      columns: [
        {
          accessorKey: "rateOfIgst",
          header: "Rate",
          cell: ({ row } :any) => {
            return (
              <div className="w-[80px] divide-x divide divide-y">
                {!isIntraTrade ? row.getValue("rateOfIgst") : 0} %
              </div>
            );
          },
        },
        {
          accessorKey: "igstTotal",
          header: ({ column} :any) => (
            <DataTableColumnHeader
              column={column}
              title="Amount"
              className="text-fuchsia-500"
            />
          ),
          cell: ({ row } :any) => {
            return (
              <div className="w-[80px] text-fuchsia-500 ">
                &#8377; {!isIntraTrade ? row.getValue("igstTotal") : 0}
              </div>
            );
          },
        },
      ],
    },
    {
      accessorKey: "total",
      header: ({ column} :any) => (
        <DataTableColumnHeader
          column={column}
          title="Total"
          className="text-yellow-500"
        />
      ),
      cell: ({ row } :any) => (
        <div className="w-[80px] text-yellow-500 ">
          &#8377; {row.getValue("total")}
        </div>
      ),
    },
    // {
    //   accessorKey: "id",
    //   header: ({ column} :any) => (
    //     <DataTableColumnHeader column={column} title="Id" className="hidden" />
    //   ),
    //   cell: ({ row } :any) => <div className="hidden">{row.getValue("id")}</div>,
    // },
    // {
    //   accessorKey: "gst",
    //   header: ({ column} :any) => (
    //     <DataTableColumnHeader column={column} title="Unit" />
    //   ),
    //   cell: ({ row } :any) => <div>{row.getValue("stockValue") || "-"}</div>,
    // },

    // {
    //   accessorKey: "gstSales",
    //   header: ({ column} :any) => (
    //     <DataTableColumnHeader column={column} title="GST Sales" />
    //   ),
    //   cell: ({ row } :any) => <div>{row.getValue("gstSales") || 0} %</div>,
    // },

    // {
    //   accessorKey: "igstSales",
    //   header: ({ column} :any) => (
    //     <DataTableColumnHeader column={column} title="IGST Sales" />
    //   ),
    //   cell: ({ row } :any) => <div>{row.getValue("igstSales") || 0} %</div>,
    // },
  ];
};

export { itemsColumns, totalColumns };
