"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatDate } from "@/lib/utils-helper/date/formatDate";
import { getBadge } from "../components/table-badge";
import { DataStatuses } from "@/lib/constants";
import { calculateTotalNewStockValue } from "@/lib/utils-helper/calculation/caculateTotalNewStockValue";
import {
  BankDetails,
  PeopleDetails,
  TotalValue,
} from "../components/table-components";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "sNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.index + 1}</div>,
  },
  {
    accessorKey: "stockCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[40px]">{row.getValue("stockCode") || "-"}</div>
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier" />
    ),
    cell: ({ row }) => (
      <PeopleDetails data={row?.original?.Customer} people="Supplier" />
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }) => {
      const total = calculateTotalNewStockValue(row?.original?.stockItems);
      return <TotalValue total={total} />;
    },
  },
  {
    accessorKey: "dataStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="w-28">
        {getBadge("dataStatus", row.getValue("dataStatus"), DataStatuses) ||
          "-"}
      </div>
    ),
  },
  {
    accessorKey: "bank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank Details" />
    ),
    cell: ({ row }) => <BankDetails data={row?.original?.Bank} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="w-40">{formatDate(row.getValue("createdAt")) || "-"}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => (
      <div className="w-40">
        {row.getValue("updatedAt") !== row.getValue("createdAt")
          ? formatDate(row.getValue("updatedAt"))
          : "-"}
      </div>
    ),
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
];
