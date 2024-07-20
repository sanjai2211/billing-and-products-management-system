"use client";

import { BillBasicDetails } from "@/lib/constants";
import { SectionWithDynamicFields } from "@/lib/components";

import CustomerDetailsSection from "./sections/customer-details-section";
import BankDetailsSection from "./sections/bank-details-section";

export default function BillDetailsSlot({ session, form }: any) {
  return (
    <div>
      <SectionWithDynamicFields data={BillBasicDetails} form={form} />
      <CustomerDetailsSection form={form} session={session} />
      <BankDetailsSection form={form} session={session} />
    </div>
  );
}
