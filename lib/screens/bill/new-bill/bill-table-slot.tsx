"use client";
import { useState } from "react";
import { DynamicAddTable } from "@/lib/tables/billing-items/data-table";
import { itemsColumns, totalColumns } from "@/lib/tables/billing-items/columns";


export default function BillTableSlot({
  items,
  total,
  handleEdit,
  handleDelete,
  isIntraTrade
}: any) {
  const [selecetdTab, setSelectedTab] = useState("items");
  return (
    <DynamicAddTable
      data={selecetdTab === "items" ? items : total}
      total={total}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      columns={selecetdTab === "items" ? itemsColumns : totalColumns(isIntraTrade)}
      editAndDeletable={selecetdTab === "items"}
      setSelectedTab={setSelectedTab}
    />
  );
}
