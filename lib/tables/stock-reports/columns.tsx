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
  // Column for expanding rows
  {
    id: "expander",
    header: () => null,
    cell: ({ row }: any) => {
      console.log({ row, aaa: row?.getParentRow() });
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="text-blue-500"
        >
          {/* {row.getIsExpanded() ? "Collapse" : "Expand"} */}
        </button>
      ) : null;
    },
  },
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

export const productStockReportsColumns = (colors: any) => {
  return [
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
            color={row.original?.color}
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
        return row?.subRows?.length && row?.depth == 0 ? (
          <TextDisplay
            heading={row?.original?.items?.length}
            subHeading={"Total Stock Items"}
            color={row.original?.color}
          />
        ) : (
          <div
            style={{
              color:
                row?.getParentRow()?.original?.color || row?.original?.color,
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
        return row?.subRows?.length && row?.depth === 0 ? (
          <TextDisplay
            heading={row.getValue("quantity")}
            subHeading={"Total Quantity"}
            color={row.original?.color}
          />
        ) : (
          <div
            style={{
              color:
                row?.getParentRow()?.original?.color || row?.original?.color,
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
        return row?.subRows?.length && row?.depth === 0 ? (
          <TextDisplay
            heading={`₹  ${row.getValue("totalValue")}`}
            subHeading={"Total Value"}
            color={row.original?.color}
          />
        ) : (
          <div
            style={{
              color:
                row?.getParentRow()?.original?.color || row?.original?.color,
            }}
          >
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
          />
        );
      },
    },
  ];
};
export const customerStockReportsColumns = (colors: any) => {

  const getColors = (row: any, type: any) => {
    console.log({row,type,aaab : row?.orginal?.stockColor})
    if (type === "stock") return colors[row?.original?.stockColor];
    else return colors[row?.original?.productColor];
  };

  return [
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
          <div className="pl-4">
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
            color={getColors(row,'stock')}
          />
        ) : (
          <div className="pl-4">
            <ProductDetails
              data={row.original?.product?.Product}
              color={getColors(row,'product')}
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
        console.log({aaab :               getColors(row,'product')})
        return row?.depth === 0 ? (
          <TextDisplay
            heading={row?.original?.items?.length}
            subHeading={"Total Stock Items"}
            color={getColors(row,'stock')}
          />
        ) : (
          <div
            className="pl-4"
            style={{
              color:getColors(row,'product')
              ,
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
            color={getColors(row,'stock')}
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
            color={getColors(row,'stock')}
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
};
