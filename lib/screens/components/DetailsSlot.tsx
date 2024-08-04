"use client";

import { SectionWithDynamicFields } from "@/lib/components";
import CustomerDetailsSection from "../bill/new-bill/sections/customer-details-section";
import BankDetailsSection from "../bill/new-bill/sections/bank-details-section";

export default function DetailsSlot({ session, form, basicDetails = {} }: any) {
  return (
    <div>
      <SectionWithDynamicFields data={basicDetails} form={form} />
      <CustomerDetailsSection form={form} session={session} />
      <BankDetailsSection form={form} session={session} />
    </div>
  );
}
