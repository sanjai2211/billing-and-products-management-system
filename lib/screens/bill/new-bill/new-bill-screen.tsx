"use client";

import { ShopDetailsSchema } from "@/lib/form-schema";
import { BillTemplate, PageHeader } from "@/lib/components";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ToolTip } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

import BillDetailsSlot from "./bill-details-slot";
import BillSlot from "./bill-slot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useAddEditDeleteBill, useAddEditShop } from "@/lib/hooks";
import { handlePrintBill } from "@/lib/utils-helper/export/print-bill";

export default function NewBillScreen({ billDetails, billId, session }: any) {
  const [currentTab, setCurretTab] = useState("bill");

  const Bank = billDetails?.Bank || {};
  const Customer = billDetails?.Customer || {};
  const bankId = billDetails?.bankId || "";
  const customerId = billDetails?.customerId || "";
  const rest = { ...billDetails };

  let defaultValues: any = {
    date: new Date(),
    ...rest,
  };

  if (customerId) {
    defaultValues = {
      ...defaultValues,
      name: { value: customerId, label: Customer?.name } || "",
      phoneNumbers: { value: customerId, label: Customer?.phoneNumbers } || "",
      email: { value: customerId, label: Customer?.email } || "",
      gstIn: { value: customerId, label: Customer?.gstIn } || "",
      ...Customer?.address,
      ...Customer,
    };
  }

  if (bankId) {
    defaultValues = {
      ...defaultValues,
      ...Bank,
      bankName: { value: bankId, label: Bank?.bankName } || "",
    };
  }

  const form = useForm<FormData>({
    defaultValues,
  });

  const { mutate: onSubmit } = useAddEditDeleteBill({
    billId,
    method: "FINAL",
  });

  const handleSubmitBill = (data: any) => {
    if (data?.items?.length === 0) {
      toast({
        title: "No items on Bill !",
        description: "Atleat add one item to create the bill",
      });
      return;
    }
    onSubmit({ ...data, shopId: session?.shopId });
  };

  return (
    <div className="flex flex-1 h-full flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitBill)}>
          <div className="flex md:flex-row flex-col justify-between">
            <PageHeader title={`New Bill`} />
            <div className="flex items-center gap-2 h-full ">
              <BillTemplate billDetails={billDetails} />

              <ToolTip
                trigger={
                  <p className="text-xl border px-2 py-1.5 rounded-md cursor-pointer">
                    {billDetails?.billNumber}
                  </p>
                }
                content={"Bill Number"}
              />
              <Tabs defaultValue="bill" className="w-fit">
                <TabsList className="h-11">
                  <TabsTrigger
                    value="bill"
                    onClick={() => setCurretTab("bill")}
                    className="h-full"
                  >
                    Bill
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    onClick={() => setCurretTab("details")}
                    className="h-full"
                  >
                    Details
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button type="submit" className="flex items-center gap-2 ">
                <p>Create Bill</p>
                <Icon name="ClipboardPlus" className="h-4 w-4" />
              </Button>
              <Button type="button" className="flex items-center gap-2 " onClick={()=>handlePrintBill({data: form.getValues()})}>
                <p>Print Bill</p>
                <Icon name="ClipboardPlus" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {currentTab === "bill" ? (
            <BillSlot
              billId={billId}
              billDetails={billDetails}
              session={session}
              form={form}
            />
          ) : (
            <BillDetailsSlot session={session} form={form} />
          )}
        </form>
      </Form>
    </div>
  );
}
