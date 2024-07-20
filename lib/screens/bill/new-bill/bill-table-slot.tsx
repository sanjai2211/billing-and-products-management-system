"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ShopDetailsSchema } from "@/lib/form-schema";
import { BillData, BillDetails, ShopDetails } from "@/lib/constants";
import {
  PageHeader,
  SectionWithDynamicFields,
  SectionWithAddableFields,
  Section,
  DynamicInputField,
  FieldWithBoxValues,
} from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEditShop } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AddBill from "./add-bill";
import { DataTable } from "@/lib/tables/billing-items/data-table";
import { itemsColumns, totalColumns } from "@/lib/tables/billing-items/columns";
import { getTaxCalculationByHsn } from "@/lib/utils-helper/calculation/getTaxCalculation";

type FormData = z.infer<typeof ShopDetailsSchema>;

export default function BillTableSlot({
  items,
  total,
  handleEdit,
  handleDelete,
}: any) {
  const [selecetdTab, setSelectedTab] = useState("items");

  return (
    <div>
      <DataTable
        data={selecetdTab === "items" ? items : total}
        total={total}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        columns={selecetdTab === "items" ? itemsColumns : totalColumns}
        editAndDeletable={selecetdTab === "items"}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
}
