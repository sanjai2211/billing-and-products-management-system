"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { PeopleDetails } from "../components/table-components";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "sNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier" />
    ),
    cell: ({ row }) => (
      <PeopleDetails data={row.original.Stock.Customer} people="Supplier" />
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("cost")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row } : any) => (
      <div className="">
        &#8377; {row.getValue("cost") * row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="">{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
  },
];
