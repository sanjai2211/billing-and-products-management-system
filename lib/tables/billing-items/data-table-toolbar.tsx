"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DynamicInputField, FieldWithBoxValues } from "@/lib/components";
import { calculateTotals } from "@/lib/utils-helper/calculation/calculateTotal";
import { Icon } from "@/lib/icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSelectedTab?: any;
  total?: any;
}

export function DataTableToolbar<TData>({
  table,
  setSelectedTab,
  total,
}: DataTableToolbarProps<TData>) {
  // const totalAmount = calculateTotals({
  //   data: total,
  //   fields: ["total", "taxableValue", "cgstTotal", "sgstTotal", "igstTotal"],
  // });

  const discountField = {
    id: "total",
    label: "Total",
    value: total,
    disabled: true,
    component: "inputField",
  };

  return (
    <div className="flex items-center gap-2 justify-between ">
      <Tabs defaultValue="items" className="w-fit ">
        <TabsList className="h-11 w-fit">
          <TabsTrigger
            value="items"
            className="h-full w-fit"
            onClick={() => setSelectedTab("items")}
          >
            <Icon name="ShoppingBasket" className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger
            value="total"
            className="h-full w-fit"
            onClick={() => setSelectedTab("total")}
          >
            <Icon name="DiamondPercent" className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* <div className="flex items-end gap-2">
        <FieldWithBoxValues
          title="Taxable Value"
          value={totalAmount?.taxableValue}
          edgeCaseValue={"0.0"}
          color="purple"
        />{" "}
        <p className="mb-1.5">+</p>
        <FieldWithBoxValues
          title="CSGT"
          value={totalAmount?.cgstTotal}
          edgeCaseValue={"0.0"}
          color="pink"
        />{" "}
        <p className="mb-1.5">+</p>
        <FieldWithBoxValues
          title="SSGT"
          value={totalAmount?.sgstTotal}
          edgeCaseValue={"0.0"}
          color="orange"
        />{" "}
        <p className="mb-1.5">+</p>
        <FieldWithBoxValues
          title="IGST"
          value={totalAmount?.igstTotal}
          edgeCaseValue={"0.0"}
          color="fuchsia"
        />{" "}
        <p className="mb-1.5">=</p>
        <p className="text-xl border rounded-sm px-2.5 py-1.5 font-semibold text-green-500">
          &#8377; {totalAmount?.total || "00.00"}
        </p>
      </div> */}
    </div>
  );
}
