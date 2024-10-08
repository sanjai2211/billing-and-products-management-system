"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { formatDate } from "@/lib/utils-helper";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate } from "@/lib/utils-helper/date/formatDate";
import { ProductCategories, ProductStatuses, ProductUnits } from "@/lib/constants/products";
import { getBadge, getValues } from "../components/table-badge";
import TextDisplay from "@/lib/components/text-display";

export const columns: ColumnDef<any>[] = [
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
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("code") || "-"}</div>
    ),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("productName") || "-"} </div>,
  },
  {
    accessorKey: "printName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Print Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("printName") || "-"}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="w-28">
    {getBadge("status", row.getValue("status"), ProductStatuses) || "-"}
  </div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-36">
        {getBadge("category", row.getValue("category"), ProductCategories) || "-"}
      </div>
    ),
  },

  {
    accessorKey: "openStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open Stock" />
    ),
    cell: ({ row }) => <div>{row.getValue("openStock") || "0"}  {getValues(row.original.unit, ProductUnits) || "-"}</div>,
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => <div>{row.getValue("group") || "-"}</div>,
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    cell: ({ row }) => <div>{row.getValue("brand") || "-"}</div>,
  },
  // {
  //   accessorKey: "cost",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Cost" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("cost") || 0}</div>,
  // },
  {
    accessorKey: "mrp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MRP" />
    ),
    cell: ({ row }) => <div>{row.getValue("mrp") || 0}</div>,
  },
  {
    accessorKey: "purchaseRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase Rate" />
    ),
    cell: ({ row }) => <div>{row.getValue("purchaseRate") || 0}</div>,
  },
  {
    accessorKey: "salesRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Rate" />
    ),
    cell: ({ row }) => <div>{row.getValue("salesRate") || 0}</div>,
  },
  // {
  //   accessorKey: "gstPurchase",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="GST Purchase" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("gstPurchase") || 0} %</div>,
  // },
  {
    accessorKey: "gstSales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GST Sales" />
    ),
    cell: ({ row }) => <div>{row.getValue("gstSales") || 0} %</div>,
  },
  // {
  //   accessorKey: "igstPurchase",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="IGST Purchase" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("igstPurchase") || 0} %</div>,
  // },
  // {
  //   accessorKey: "igstSales",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="IGST Sales" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("igstSales") || 0} %</div>,
  // },
  {
    accessorKey: "hsnCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HSN Code" />
    ),
    cell: ({ row }) => <div>{row.getValue("hsnCode") || "-"}</div>,
  },
  
  // {
  //   accessorKey: "stockValue",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Stock Value" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("stockValue") || "-"}</div>,
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const { date, time } = formatDate(row.getValue("createdAt"));
      return <TextDisplay heading={date} subHeading={time} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      const { date, time } =
        row.getValue("updatedAt") !== row.getValue("createdAt")
          ? formatDate(row.getValue("updatedAt"))
          : { date: "-", time: "" };
      return <TextDisplay heading={date} subHeading={time} />;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" className="hidden" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] hidden">{row.getValue("id")}</div>
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
