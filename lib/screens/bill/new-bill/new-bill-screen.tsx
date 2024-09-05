"use client";

import { ShopDetailsSchema } from "@/lib/form-schema";
import { ViewBillTemplate, PageHeader } from "@/lib/components";
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
import { StateCodes } from "@/lib/constants";
import { MultiplSelectButton } from "@/components/ui/multiple-select-button";
import { exportToPdf } from "@/lib/utils-helper/export/pdf";
import TemplateOne from "@/lib/templates/tax-invoice/template-1";

export default function NewBillScreen({ billDetails, billId, session }: any) {
  const [currentTab, setCurretTab] = useState("bill");

  const Bank = billDetails?.Bank || {};
  const Customer = billDetails?.Customer || {};
  const bankId = billDetails?.bankId || "";
  const customerId = billDetails?.customerId || "";
  const { Shop, ...rest } = billDetails;

  const getStateCode = (state: any) => {
    return StateCodes?.find((item: any) => item?.label === state)?.value;
  };

  if (Shop) {
    billDetails.Shop.address.stateCode = getStateCode(Shop?.address?.state);
  }

  let defaultValues: any = {
    date: new Date(),
  };

  if (customerId) {
    const customerStateCode = getStateCode(Customer?.address?.state);
    Customer.address.stateCode = customerStateCode;
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
  defaultValues = { ...defaultValues, ...rest };

  const form = useForm<FormData>({
    defaultValues,
  });

  const { mutate: onSubmit } = useAddEditDeleteBill({
    billId,
    method: "FINAL",
  });

  const handleSaveBill = ({ dataStatus, effectStock }: any) => {
    onSubmit({ dataStatus, effectStock, shopId: session?.shopId });
  };

  const handlePrintBills = () => handlePrintBill({ data: form.getValues() });

  const handleGenerate = ({effectStock} : any) => {
    handleSaveBill({ dataStatus: "COMPLETED", effectStock });
    handlePrintBills();
  };

  const handleDownloadBill = async () =>
    await exportToPdf({
      data: [billDetails],
      exportOptions: [
        {
          templateId: "billTemplate",
          pdfNameField: "billNumber",
          template: TemplateOne,
        },
      ],
    });

  const items : any = form.watch("items");
  console.log({ items });

  const multipleSelectList = [
    {
      id: "stock-effect",
      label: "Stock Impacts",
      icon: "Users",
      items: [
        {
          id: "generate-bill",
          onClick: ()=>handleGenerate({effectStock : true}),
          label: "Generate Bill",
          icon: "Route",
          disabled: !items?.length,
          description: "Save and Print the Bill",
        },
        {
          id: "save-bill",
          label: "Save Bill",
          icon: "Save",
          onClick: () =>
            handleSaveBill({ dataStatus: "COMPLETED", effectStock: true }),
          disabled: !items?.length,
          description: "Save the Bill",
        },
        {
          id: "save-as-draft",
          label: "Save As Draft",
          icon: "FileBox",
          onClick: () =>
            handleSaveBill({ dataStatus: "DRAFT", effectStock: true }),
          disabled: !items?.length,
          description: "Save the Bill as Draft",
        },
      ],
    },
    {
      id: "no-stock-effect",
      label: "Without Stock Impacts",
      icon: "Users",
      items: [
        {
          id: "no-effect-generate-bill",
          onClick: ()=>handleGenerate({effectStock : false}),
          label: "Generate Bill (No Effect)",
          icon: "Route",
          disabled: !items?.length,
          description: "Save and Print the Bill",
        },
        {
          id: "no-effect-save-bill",
          label: "Save Bill (No Effect)",
          icon: "Save",
          onClick: () =>
            handleSaveBill({ dataStatus: "COMPLETED", effectStock: false }),
          disabled: !items?.length,
          description: "Save the Bill",
        },
        {
          id: "no-effect-save-as-draft",
          label: "Save As Draft (No Effect)",
          icon: "FileBox",
          onClick: () =>
            handleSaveBill({ dataStatus: "DRAFT", effectStock: false }),
          disabled: !items?.length,
          description: "Save the Bill as Draft",
        },
      ],
    },
    {
      id: "others",
      label: "Other Actions",
      icon: "Users",
      items: [
        {
          id: "print-bill",
          label: "Print Bill",
          icon: "Printer",
          onClick: handlePrintBills,
          disabled: !items?.length,
          description: "Print the Bill",
        },
        {
          id: "download-bill",
          label: "Download Bill",
          icon: "Download",
          onClick: handleDownloadBill,
          disabled: !items?.length,
          description: "Download the Bill",
        },
      ],
    },
  ];
  

  return (
    <div className="flex flex-1 h-full flex-col gap-4">
      <Form {...form}>
        <form>
          <div className="flex md:flex-row flex-col justify-between">
            <PageHeader title={`New Bill`} />
            <div className="flex items-center gap-2 h-full ">
              <ViewBillTemplate billDetails={{ ...form.getValues(), Shop }} />

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

              <MultiplSelectButton list={multipleSelectList} />
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
            <BillDetailsSlot session={session} form={form} billId={billId} />
          )}
        </form>
      </Form>
    </div>
  );
}
