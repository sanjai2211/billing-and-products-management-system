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
import { useAddEditDeleteBill, useAddEditDeleteBillItems, useAddEditShop } from "@/lib/hooks";
import { handlePrintBill } from "@/lib/utils-helper/export/print-bill";
import { RecordType, StateCodes } from "@/lib/constants";
import { MultiplSelectButton } from "@/components/ui/multiple-select-button";
import { exportToPdf } from "@/lib/utils-helper/export/pdf";
import TemplateOne from "@/lib/templates/tax-invoice/template-1";
import { billCalculation } from "@/lib/utils-helper/calculation/calculateTotal";
import { getBillData } from "@/lib/utils-helper/screens/getBillData";

export default function NewBillScreen({ billDetails, billId, session }: any) {
  const [currentTab, setCurretTab] = useState("bill");
  console.log({ billDetailsssssss: billDetails });

  const Bank = billDetails?.Bank || {};
  const Customer = billDetails?.Customer || {};
  const bankId = billDetails?.bankId || "";
  const customerId = billDetails?.customerId || "";
  const { Shop, ...rest } = billDetails;
  const sessionName = (RecordType as any)[billDetails?.type];
  console.log({ sessionName });
  console.log({ sessionName });

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

  const { mutate: onBillItemsSubmit } = useAddEditDeleteBillItems({
    billId,
    method: "CLEAR",
  });

  const handleSaveBill = ({ dataStatus, effectStock }: any) => {
    onSubmit({ dataStatus, effectStock, shopId: session?.shopId });
  };

  const handlePrintBills = () => handlePrintBill({ data: form.getValues() });

  const handleGenerate = ({ effectStock }: any) => {
    handleSaveBill({ dataStatus: "COMPLETED", effectStock });
    handlePrintBills();
  };

  const handleDownloadBill = async () =>
    await exportToPdf({
      data: [
        {
          ...form.getValues(),
          ...billData,
        },
      ],
      exportOptions: [
        {
          templateId: "billTemplate",
          pdfNameField: "billNumber",
          template: TemplateOne,
        },
      ],
    });

  const multipleSelectList = [
    {
      id: "stock-effect",
      label: "Stock Impacts",
      icon: "Users",
      items: [
        {
          id: "generate-bill",
          onClick: () => handleGenerate({ effectStock: true }),
          label: `Generate ${sessionName}`,
          icon: "Route",
          disabled: !billDetails?.items?.length,
          description: `Save and Print the ${sessionName}`,
        },
        {
          id: "save-bill",
          label: `Save ${sessionName}`,
          icon: "Save",
          onClick: () =>
            handleSaveBill({ dataStatus: "COMPLETED", effectStock: true }),
          disabled: !billDetails?.items?.length,
          description: `Save the ${sessionName}`,
        },
        // {
        //   id: "save-as-draft",
        //   label: "Save As Draft",
        //   icon: "FileBox",
        //   onClick: () =>
        //     handleSaveBill({ dataStatus: "DRAFT", effectStock: true }),
        //   disabled: !billDetails?.items?.length,
        //   description: `Save the ${sessionName} as Draft`,
        // },
      ],
    },
    {
      id: "no-stock-effect",
      label: "Without Stock Impacts",

      icon: "Users",
      items: [
        {
          id: "no-effect-generate-bill",
          onClick: () => handleGenerate({ effectStock: false }),
          label: `Generate ${sessionName} (No Effect)`,
          icon: "Route",
          disabled: !billDetails?.items?.length,
          description: `Save and Print the ${sessionName}`,
        },
        {
          id: "no-effect-save-bill",
          label: `Save ${sessionName} (No Effect)`,
          icon: "Save",
          onClick: () =>
            handleSaveBill({ dataStatus: "COMPLETED", effectStock: false }),
          disabled: !billDetails?.items?.length,
          description: `Save the ${sessionName}`,
        },
        // {
        //   id: "no-effect-save-as-draft",
        //   label: "Save As Draft (No Effect)",
        //   icon: "FileBox",
        //   onClick: () =>
        //     handleSaveBill({ dataStatus: "DRAFT", effectStock: false }),
        //   disabled: !billDetails?.items?.length,
        //   description: `Save the ${sessionName} as Draft`,
        // },
      ],
    },
    {
      id: "others",
      label: "Other Actions",
      icon: "Users",
      items: [
        {
          id: "print-bill",
          label: `Print ${sessionName}`,
          icon: "Printer",
          onClick: handlePrintBills,
          disabled: !billDetails?.items?.length,
          description: `Print the ${sessionName}`,
        },
        {
          id: "download-bill",
          label: `Download ${sessionName}`,
          icon: "Download",
          onClick: handleDownloadBill,
          disabled: !billDetails?.items?.length,
          description: `Download the ${sessionName}`,
        },
      ],
    },
  ];
  console.log({ multipleSelectList });

  const billData = getBillData({...form.getValues(),Shop});
  console.log({billData})

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="space-y-2">
          <div className="flex md:flex-row flex-col justify-between">
            <PageHeader title={`New ${sessionName}`} />
            <div className="flex items-center gap-2 h-full ">
              <ViewBillTemplate billDetails={billData} />
              <ToolTip
                trigger={
                  <p className="text-xl border px-2 py-1.5 rounded-md cursor-pointer">
                    {billDetails?.billNumber}
                  </p>
                }
                content={`${sessionName} Number`}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  onBillItemsSubmit({ billId })
                }
                disabled={
                  !billDetails?.items.length &&
                  !billDetails?.bankId &&
                  !billDetails?.customerId
                }
              >
                <Icon name="CircleX" className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Tabs defaultValue="bill" className="w-fit">
                <TabsList className="h-11">
                  <TabsTrigger
                    value="bill"
                    onClick={() => setCurretTab("bill")}
                    className="h-full"
                  >
                    {sessionName}
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
              cumulativeReport={billData?.cumulativeReport}
            />
          ) : (
            <BillDetailsSlot session={session} form={form} billId={billId} />
          )}
        </form>
      </Form>
    </div>
  );
}
