"use client";

import { BillBasicDetails } from "@/lib/constants";
import { SectionWithDynamicFields } from "@/lib/components";

import CustomerDetailsSection from "./sections/customer-details-section";
import BankDetailsSection from "./sections/bank-details-section";
import { useAddEditDeleteBill } from "@/lib/hooks";

export default function BillDetailsSlot({ session, form, billId }: any) {
  const { mutate: onSubmit } = useAddEditDeleteBill({
    billId,
    method: "PATCH",
  });

  

  const onChange = async(data: any, event: any) => {
    let value;

    switch (data?.component) {
      case "select":
        value = event;
        break;
      case "datePicker":
        value = new Date(event);
        break;
      default:
        break;
    }
    console.log({fieldvalueee :form.getValues()})
    if (value) {
      console.log({ fieldValue: value });
      await onSubmit({ [data?.id]: value });
    }
    // handle(data?.id, value);
  };

  return (
    <div>
      <SectionWithDynamicFields
        data={BillBasicDetails}
        form={form}
        billId={billId}
        onChange={onChange}

      />
      <CustomerDetailsSection form={form} session={session} billId={billId} onSubmit={onSubmit}/>
      <BankDetailsSection form={form} session={session} billId={billId} onSubmit={onSubmit} />
    </div>
  );
}
