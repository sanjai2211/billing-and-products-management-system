"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { formatDate } from "@/lib/utils-helper";
import { DataTableRowActions } from "./data-table-row-actions";
import { ShowDetails } from "@/lib/components";
import { Badge } from "@/components/ui/badge";
import { BillTypes, DataStatuses, PaymentTypes } from "@/lib/constants";
import { formatDate } from "@/lib/utils-helper/date/formatDate";
import { billCalculation } from "@/lib/utils-helper/calculation/calculateTotal";
import TotalDetails from "@/lib/screens/bill/new-bill/total-details";

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
    accessorKey: "billNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("billNumber") || "-"}</div>
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }) => {
      console.log("row", row, row?.getValue("Customer"));
      const isIntraTrade =
        row?.original?.Customer?.address?.state ===
        row?.original?.Shop?.address?.state;
      const totalDetails: any = billCalculation({
        data: row?.original?.items,
        isIntraTrade,
      });
      const color = getColor(
        "totalValue",
        parseInt(totalDetails?.discountedRounded?.total)
      );
      return (
        <div className="flex justify-between gap-4 w-[120px]">
          <div className={`w-[80px] text-${color}-500`}>
            &#8377; {totalDetails?.discountedRounded?.total || "0.00"}
          </div>
          <ShowDetails
            title={"Bill value Details"}
            component={<TotalDetails totalDetails={totalDetails} />}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Type" />
    ),
    cell: ({ row }) => (
      <div>{getBadge("type", row.getValue("type"), BillTypes) || "-"}</div>
    ),
  },
  {
    accessorKey: "Customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const customer = row?.original?.Customer;

      if (!customer) {
        return <p className="text-sm">No customer data</p>;
      }

      const { address, id, shopId, bankId, createdAt, updatedAt, ...rest } =
        customer;
      const data = {
        ...rest,
        address: address
          ? `${address?.addressLine1},<br/>${address?.addressLine2},<br/>${address?.city},<br/>${address?.state},<br/>India - ${address?.zip}`
          : "-",
      };

      return (
        <div className="flex justify-between gap-4 w-[240px]">
          <div className="flex flex-col gap-1">
            <p className="text-sm">{rest?.customerName}</p>
            <p className="text-xs opacity-50">{rest?.phoneNumbers}</p>
          </div>
          <ShowDetails title={"Customer Details"} data={data} />
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Dated" />
    ),
    cell: ({ row }) => {
      if (row.getValue("type") === "QUOTATION") {
        return (
          <div className="flex flex-col w-40">
            <p className="text-xs">
              <span className="text-xs opacity-50">Dated : </span>
              {formatDate(row.getValue("date"), false) || "-"}
            </p>
            <p className="text-xs">
              <span className="text-xs opacity-50">Dued : </span>
              {formatDate(row.getValue("date"), false) || "-"}
            </p>
          </div>
        );
      } else {
        return (
          <div className="w-40">
            {formatDate(row.getValue("date"), false) || "-"}
          </div>
        );
      }
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
    accessorKey: "paymentTerms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => (
      <div>
        {getBadge("paymentTerms", row.getValue("paymentTerms"), PaymentTypes) ||
          "-"}
      </div>
    ),
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
