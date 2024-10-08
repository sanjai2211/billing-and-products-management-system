"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { formatDate } from "@/lib/utils-helper";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { CustomerTypes } from "@/lib/constants";
import { formatDate } from "@/lib/utils-helper/date/formatDate";
import TextDisplay from "@/lib/components/text-display";

const getColor = (field: any, value: any) => {
  switch (field) {
    case "customerType":
      if (value === "SUPPLIER") return "voilet";
      else if (value === "AGENT") return "orange";
      else if (value === "CUSTOMER") return "rose";
      else return "red";
  }
};

const getBadge = (field: any, value: any, data: any) => {
  const type = data?.find((item: any) => item?.value === value)?.label;

  const color = getColor(field, value);
  const className = `border-${color}-500 border text-${color}-500 hover:bg-background bg-background border-2 text-center`;

  return <Badge className={className}>{type || "-"}</Badge>;
};

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
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => (
      <div className="w-40">{row.getValue("customerName") || "-"}</div>
    ),
  },
  {
    accessorKey: "printName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Print Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("printName") || "-"}</div>,
  },
  {
    accessorKey: "customerType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div>{getBadge("customerType", row.getValue("customerType"), CustomerTypes) || "-"}</div>
    ),
  },
  {
    accessorKey: "phoneNumbers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumbers") || "-"} </div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email") || "-"}</div>,
  },
  {
    accessorKey: "gstIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GST in Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("gstIn") || "-"}</div>,
  },
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
