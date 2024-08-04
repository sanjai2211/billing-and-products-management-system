"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterBillData, FilterCustomerData, FilterProductData, FilterStockData, SearchBillData, SearchCustomerData, SearchProductData, SearchStockData } from "@/lib/constants";
import { DynamicFilterField } from "@/lib/components/dynamic-filter-field";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { DynamicInputSearchField } from "@/lib/components/dynamic-input-search-field";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const form = useForm<FormData>({});

  return (
    <div className="flex items-center justify-between mx-2">
      <div className="flex flex-1 items-center space-x-2">
       <DynamicInputSearchField data={SearchStockData} form={form}/>
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Form {...form}>
        <form className="flex gap-4 items-center">
          {FilterStockData?.map((item: any) => (
            <DynamicFilterField data={item} form={form} key={item?.id} />
          ))}
        </form>
      </Form>

      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
