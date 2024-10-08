"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
// import { formatDate } from "@/lib/utils-helper";
import { DataTableRowActions } from "../data-table-row-actions";
import { ShowDetails } from "@/lib/components";
import { Badge } from "@/components/ui/badge";
import { BillTypes, PaymentTypes } from "@/lib/constants";
import { formatDate } from "@/lib/utils-helper/date/formatDate";
import { billCalculation } from "@/lib/utils-helper/calculation/calculateTotal";
import TotalDetails from "@/lib/screens/bill/new-bill/total-details";
import { TableFooterCell } from "../../components/table-footer-cell";

const getColor = (field: any, value: any) => {
  switch (field) {
    case "type":
      if (value === "QUOTATION") return "voilet";
      else if (value === "TAX_INVOICE") return "amber";
      else if (value === "BILL") return "rose";
      else return "red";
    case "paymentTerms":
      if (value === "CASH") return "green";
      else if (value === "CREDIT") return "orange";
      else return "red";
    case "totalValue":
      if (value <= 0) return "red";
      else if (value < 50) return "orange";
      else if (value >= 150 && value <= 300) return "yellow";
      else return "green";
    default:
      return "gray";
  }
};

const getBadge = (field: any, value: any, data: any) => {
  const type = data?.find((item: any) => item?.value === value)?.label;

  const color = getColor(field, value);
  const className = `border-${color}-500 border text-${color}-500 hover:bg-background bg-background border-2 text-center`;

  return <Badge className={className}>{type || "-"}</Badge>;
};

export const StockColumns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "sNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Code" />
    ),
    cell: ({ row }) => {
      console.log({ row });
      return (
        <div className="w-[80px]">{row?.original?.product?.code || "-"}</div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[380px]">
        {row?.original?.product?.productName || "-"}
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]"> &#8377; {row.getValue("cost") || "-"}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("quantity") || "-"}</div>
    ),
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Cost" />
    ),
    cell: ({ row }: any) => (
      <div className="w-[80px] text-violet-500">
        &#8377; {parseFloat(row.getValue("quantity") || 0) * parseFloat(row.getValue("cost") || 0) || "0.00"}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HSN Code" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.product?.hsnCode || "-"}</div>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" className="hidden" />
    ),
    cell: ({ row }) => (
      <div className="w-[1px] hidden">{row.getValue("id")}</div>
    ),
  },
  

  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-40">{formatDate(row.getValue("createdAt"))}</div>
  //   ),
  //   size: 48,
  // },
  // {
  //   id: "actions",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Actions" />
  //   ),
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
