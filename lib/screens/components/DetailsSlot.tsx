"use client";

import { SectionWithDynamicFields } from "@/lib/components";
import CustomerDetailsSection from "../bill/new-bill/sections/customer-details-section";
import BankDetailsSection from "../bill/new-bill/sections/bank-details-section";

export default function DetailsSlot({
  session,
  form,
  onSubmit,
  basicDetails = {},
  customer
}: any) {
  const onChange = async (data: any, event: any) => {
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
    console.log({ data, value });
    if (value) {
      console.log({ fieldValue: value });
      await onSubmit({ [data?.id]: value, method: "PATCH" });
    }
  };

  return (
    <div>
      {/* <SectionWithDynamicFields
        data={basicDetails}
        form={form}
        onChange={onChange}
      /> */}
      <CustomerDetailsSection
        form={form}
        session={session}
        onSubmit={onSubmit}
        customer={customer}
      />
      <BankDetailsSection form={form} session={session} onSubmit={onSubmit} />
    </div>
  );
}
