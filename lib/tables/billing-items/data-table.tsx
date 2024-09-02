"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Icon } from "@/lib/icons";
import { DynamicInputField, EditDeleteContainer } from "@/lib/components";
import { DataTableRowActions } from "./data-table-row-actions";
import { DynamicTableInputField } from "@/lib/components/dynamic-table-input-field";

interface DataTableProps<TData, TValue> {
  data: TData[];
  handleDelete?: any;
  handleEdit?: any;
  columns?: any;
  editAndDeletable?: boolean;
  setSelectedTab?: any;
  total?: any;
  dynamicFields?: any;
  form?: any;
}

export function DynamicAddTable<TData, TValue>({
  data,
  handleDelete,
  handleEdit,
  columns,
  editAndDeletable = true,
  setSelectedTab,
  total = [],
  form,
  dynamicFields = [],
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [hoveredRow, setHoveredRow] = React.useState<string | number | null>(
    null
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-84px)] w-full ">
      <DataTableToolbar table={table} setSelectedTab={setSelectedTab} total={total} />
      <div className="rounded-md border h-full overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-x divide divide-y">
            <TableRow className="hover:bg-inherit p-0">
              {dynamicFields?.map((item: any) => (
                <TableCell key={item.id} className={item.className}>
                  <DynamicInputField form={form} data={item} />
                </TableCell>
              ))}
            </TableRow>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="relative"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {editAndDeletable && hoveredRow === row.id && (
                    <DataTableRowActions
                      row={row}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-72 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}
