"use client";

import { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { PeopleDetails, ProductDetails } from "../components/table-components";
import TextDisplay from "@/lib/components/text-display";

export const columns: ColumnDef<any>[] = [  
  {
    accessorKey: "sNo",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <div className="">
          {row.index + 1}{" "}
          {row.getCanExpand() && (
            <span
              style={{ cursor: "pointer" }}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? "👇" : "👉"}
            </span>
          )}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "supplier",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Supplier" />
    ),
    // Conditionally hide customer details if row has subrows (expandable)
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <PeopleDetails
          data={row.original?.Stock?.Customer}
          people="Supplier"
          color={row.original?.color}
        />
      ) : (
        <div>
          {parseInt((row as any).parentId) + 1 + "." + (row?.index + 1)}
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }: any) => (
      <div
        style={{
          color: row.original?.color || row?.getParentRow()?.original?.color,
        }}
      >
        {" "}
        &#8377; {row.getValue("cost")}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }: any) => (
      <div
        style={{
          color: row.original?.color || row?.getParentRow()?.original?.color,
        }}
      >
        {row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }: any) => (
      <div
        style={{
          color: row.original?.color || row?.getParentRow()?.original?.color,
        }}
      >
        &#8377; {row.getValue("cost") * row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }: any) => (
      <TextDisplay
        heading={row?.original?.Stock?.stockCode}
        subHeading={new Date(
          row?.original?.Stock?.createdAt
        ).toLocaleDateString()}
        // color="red"
      />
    ),
  },
];

export const productStockReportsColumns = [
  {
    accessorKey: "sNo",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <div className="">
          {row.index + 1}{" "}
          {row.getCanExpand() && (
            <span
              style={{ cursor: "pointer" }}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? "👇" : "👉"}
            </span>
          )}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "supplier",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <ProductDetails
          data={row.original?.product?.Product}
          color={row.original?.productColor}
        />
      ) : (
        <div className="pl-4">
          {parseInt((row as any).parentId) + 1 + "." + (row?.index + 1)}
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }: any) => {
      const color = row.original?.productColors;
      return row?.subRows?.length && row?.depth == 0 ? (
        <TextDisplay
          heading={row?.original?.items?.length}
          subHeading={"Total Stock Items"}
          color={row.original?.productColor}
        />
      ) : (
        <div
          style={{
            color,
          }}
        >
          &#8377; {row.getValue("cost")}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }: any) => {
      const color = row.original?.productColors;

      return row?.subRows?.length && row?.depth === 0 ? (
        <TextDisplay
          heading={row.getValue("quantity")}
          subHeading={"Total Quantity"}
          color={row.original?.productColor}
        />
      ) : (
        <div style={{ color }}>
          {row.getValue("quantity")} {row?.original?.product?.Product?.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "totalValue",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }: any) => {
      const color = row.original?.productColors;

      return row?.subRows?.length && row?.depth === 0 ? (
        <TextDisplay
          heading={`₹  ${row.getValue("totalValue")}`}
          subHeading={"Total Value"}
          color={row.original?.productColor}
        />
      ) : (
        <div style={{ color }}>
          &#8377; {row.getValue("cost") * row.getValue("quantity")}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }: any) => {
      return row?.subRows?.length && row?.depth === 0 ? null : (
        <TextDisplay
          heading={row?.original?.Stock?.stockCode}
          subHeading={new Date(
            row?.original?.Stock?.createdAt
          ).toLocaleDateString()}
          color={row.original?.stockColor}
        />
      );
    },
  },
];

export const customerStockReportsColumns = [
  {
    accessorKey: "sNo",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="S.No" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <div className="">
          {row.index + 1}{" "}
          {row.getCanExpand() && (
            <span
              style={{ cursor: "pointer" }}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? "👇" : "👉"}
            </span>
          )}
        </div>
      ) : (
        <div className="pl-4" >
          {parseInt((row as any).parentId) + 1 + "." + (row?.index + 1)}
        </div>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <TextDisplay
          heading={row?.original?.Stock?.stockCode}
          subHeading={new Date(
            row?.original?.Stock?.createdAt
          ).toLocaleDateString()}
          color={row?.original?.stockColor}
        />
      ) : (
        <div className="pl-4">
          <ProductDetails
            data={row.original?.product?.Product}
            color={row?.original?.productColor}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    cell: ({ row }: any) => {
      console.log({ aaab: row?.original?.productColor });
      return row?.depth === 0 ? (
        <TextDisplay
          heading={row?.original?.items?.length}
          subHeading={"Total Stock Items"}
          color={row?.original?.stockColor}
        />
      ) : (
        <div
          className="pl-4"
          style={{
            color: row?.original?.productColors,
          }}
        >
          &#8377; {row.getValue("cost")}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <TextDisplay
          heading={row.getValue("quantity")}
          subHeading={"Total Quantity"}
          color={row?.original?.stockColor}
        />
      ) : (
        <div
          className="pl-4"
          style={{
            color: row?.getParentRow()?.original?.color,
          }}
        >
          {row.getValue("quantity")} {row?.original?.product?.Product?.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "totalValue",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }: any) => {
      return row?.depth === 0 ? (
        <TextDisplay
          heading={`₹  ${row.getValue("totalValue")}`}
          subHeading={"Total Value"}
          color={row?.original?.stockColor}
        />
      ) : (
        <div
          className="pl-4"
          style={{
            color: row?.getParentRow()?.original?.color,
          }}
        >
          &#8377; {row.getValue("cost") * row.getValue("quantity")}
        </div>
      );
    },
  },
];
