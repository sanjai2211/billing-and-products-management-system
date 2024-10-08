"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { TableFooterCell } from "../components/table-footer-cell";

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

const itemsColumns = (total: any) => {
  return [
    {
      accessorKey: "sNo",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="S.No" />
      ),
      cell: ({ row }: any) => <div className="w-[40px]">{row.index + 1}</div>,
    },
    {
      accessorKey: "code",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }: any) => {
        return <div className="w-[80px]">{row?.original?.product?.code}</div>;
      },
    },
    {
      accessorKey: "product",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }: any) => {
        return (
          <div className="w-[80px]">{row?.original?.product?.printName}</div>
        );
      },
    },
    {
      accessorKey: "hsnCode",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="HSN Code" />
      ),
      cell: ({ row }: any) => (
        <div>{row?.original?.product?.hsnCode || "-"}</div>
      ),
    },
    {
      accessorKey: "cost",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Cost" />
      ),
      cell: ({ row }: any) => <div>&#8377; {row.getValue("cost") || "-"} </div>,
    },
    {
      accessorKey: "quantity",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: ({ row }: any) => (
        <div>
          {row.getValue("quantity") || "0"} {row?.original?.product?.unit}
        </div>
      ),
    },
    {
      accessorKey: "discount",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Discount" />
      ),
      cell: ({ row }: any) => <div>{row.getValue("discount") || "0"} %</div>,
    },
    {
      accessorKey: "rate",
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title="Rate"
          className="text-purple-500"
        />
      ),
      cell: ({ row }: any) => (
        <div className="text-purple-500">&#8377; {getTotalRate(row)}</div>
      ),
      footer: ({ table }: any) => {
        return (
          <TableFooterCell
            heading="Total"
            value={`₹ ${total?.taxableValue}`}
            valueColor="purple"
          />
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Id" className="hidden" />
      ),
      cell: ({ row }: any) => (
        <div className="hidden">{row.getValue("id")}</div>
      ),
    },
  ];
};

const totalColumns = (isIntraTrade: any, total: any) => {
  console.log({ total });
  return [
    {
      accessorKey: "sNo",

      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="S.No" />
      ),
      cell: ({ row }: any) => <div className="w-[40px]">{row.index + 1}</div>,
    },
    {
      accessorKey: "hsnCode",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="HSN Code" />
      ),
      cell: ({ row }: any) => {
        return <div className="w-[80px]">{row.getValue("hsnCode")}</div>;
      },
    },
    {
      accessorKey: "taxableValue",
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title="Taxable Value"
          className="text-purple-500"
        />
      ),
      cell: ({ row }: any) => {
        return (
          <div className="w-[80px] text-purple-500">
            &#8377; {row.getValue("taxableValue")}
          </div>
        );
      },
      footer: ({ table }: any) => {
        return (
          <TableFooterCell
            value={`₹ ${total?.taxableValue}`}
            valueColor="purple"
          />
        );
      },
    },
    {
      header: "CGST",
      columns: [
        {
          accessorKey: "rateOfCgst",
          header: "Rate",
          cell: ({ row }: any) => {
            return (
              <div className="w-[80px] divide-x divide divide-y">
                {isIntraTrade ? row.getValue("rateOfCgst") : 0} %
              </div>
            );
          },
        },
        {
          accessorKey: "cgstTotal",
          header: ({ column }: any) => (
            <DataTableColumnHeader
              column={column}
              title="Amount"
              className="text-pink-500"
            />
          ),
          cell: ({ row }: any) => {
            return (
              <div className="w-[80px] text-pink-500">
                &#8377; {isIntraTrade ? row.getValue("cgstTotal") : 0}
              </div>
            );
          },
          footer: ({ table }: any) => {
            return (
              <TableFooterCell
                value={`₹ ${total?.cgstTotal}`}
                valueColor="pink"
              />
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
          cell: ({ row }: any) => {
            return (
              <div className="w-[80px] divide-x divide divide-y">
                {isIntraTrade ? row.getValue("rateOfSgst") : 0} %
              </div>
            );
          },
        },
        {
          accessorKey: "sgstTotal",
          header: ({ column }: any) => (
            <DataTableColumnHeader
              column={column}
              title="Amount"
              className="text-orange-500"
            />
          ),
          cell: ({ row }: any) => {
            return (
              <div className="w-[80px] text-orange-500">
                &#8377; {isIntraTrade ? row.getValue("sgstTotal") : 0}
              </div>
            );
          },
          footer: ({ table }: any) => {
            return (
              <TableFooterCell
                value={`₹ ${total?.sgstTotal}`}
                valueColor="orange"
              />
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
          cell: ({ row }: any) => {
            return (
              <div className="w-[80px] divide-x divide divide-y">
                {!isIntraTrade ? row.getValue("rateOfIgst") : 0} %
              </div>
            );
          },
        },
        {
          accessorKey: "igstTotal",
          header: ({ column }: any) => (
            <DataTableColumnHeader
              column={column}
              title="Amount"
              className="text-fuchsia-500"
            />
          ),
          cell: ({ row }: any) => {
            return (
              <div className="w-[80px] text-fuchsia-500 ">
                &#8377; {!isIntraTrade ? row.getValue("igstTotal") : 0}
              </div>
            );
          },
          footer: ({ table }: any) => {
            return (
              <TableFooterCell
                value={`₹ ${total?.igstTotal}`}
                valueColor="fuchsia"
              />
            );
          },
        },
      ],
    },
    {
      accessorKey: "total",
      header: ({ column }: any) => (
        <DataTableColumnHeader
          column={column}
          title="Total"
          className="text-yellow-500"
        />
      ),
      cell: ({ row }: any) => (
        <div className="w-[80px] text-yellow-500 ">
          &#8377; {row.getValue("total")}
        </div>
      ),
      footer: ({ table }: any) => {
        return (
          <TableFooterCell
            heading="Total"
            value={`₹ ${total?.total}`}
            valueColor="yellow"
          />
        );
      },
    },
  ];
};

export { itemsColumns, totalColumns };
