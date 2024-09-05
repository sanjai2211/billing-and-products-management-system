"use client";
import { useState } from "react";
import { DynamicAddTable } from "@/lib/tables/billing-items/data-table";
import { itemsColumns, totalColumns } from "@/lib/tables/billing-items/columns";
import { calculateTotals } from "@/lib/utils-helper/calculation/calculateTotal";


export default function BillTableSlot({
  items,
  total,
  handleEdit,
  handleDelete,
  isIntraTrade
}: any) {
  const [selecetdTab, setSelectedTab] = useState("items");
  const totalAmount = calculateTotals({
    data: total,
    fields: ["total", "taxableValue", "cgstTotal", "sgstTotal", "igstTotal"],
  });

  console.log({totalAmount})

  return (
    <DynamicAddTable
      data={selecetdTab === "items" ? items : total}
      totalAmount={totalAmount}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      columns={selecetdTab === "items" ? itemsColumns(totalAmount) : totalColumns(isIntraTrade,totalAmount)}
      editAndDeletable={selecetdTab === "items"}
      setSelectedTab={setSelectedTab}
    />
  );
}
