"use client";

import BankDetailsSection from "../../bill/new-bill/sections/bank-details-section";
import CustomerDetailsSection from "../../bill/new-bill/sections/customer-details-section";


export default function StockDetailsSlot({ session, form }: any) {
  return (
    <div>
      <CustomerDetailsSection form={form} session={session} />
      <BankDetailsSection form={form} session={session} />
    </div>
  );
}
