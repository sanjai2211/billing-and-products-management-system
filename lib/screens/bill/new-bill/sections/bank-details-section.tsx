"use client";
import { SectionWithDynamicFields } from "@/lib/components";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBankDetailsById } from "@/apicall";
import { useAddEditDeleteBill } from "@/lib/hooks";

export default function BankDetailsSection({ session, form,billId,onSubmit }: any) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["bank", session?.shopId],
    queryFn: () => getBankDetailsById(session?.shopId),
    enabled: !!session?.shopId,
  });


  const list = data?.map((item: any) => ({
    value: item?.id,
    label: item?.bankName,
  }));

  const handleCustomerSelect = async(selectedProduct: any) => {
    const { value } = selectedProduct;
    await onSubmit({bankId : value,method : "PATCH"})
    const { id, bankName,shopId,customerId, ...rest } = data?.find(
      (item: any) => item?.id === value
    );
    Object.entries({
      bankName: { value, label: bankName },
      ...rest,
    }).forEach(([field, value]: any) => {
      form.setValue(field, value);
    });
  };

  const field = useMemo(
    () => ({
      id: "bank-details",
      sectionName: "Bank Details",
      icon: "Landmark",
      fields: [
        {
          id: "bankName",
          label: "Choose Bank",
          placeholder: "Bank Name",
          component: "searchableField",
          list,
          isLoading: isFetching || isLoading,
          onSelect: handleCustomerSelect,
        },
        {
          id: "accountNumber",
          label: "Account Number",
          placeholder: "Account Number",
          component: "inputField",
          disabled: true,
        },
        {
          id: "branchName",
          label: "Branch Name",
          placeholder: "Branch Name",
          component: "inputField",
          disabled: true,
        },
        {
          id: "ifscCode",
          label: "IFSC Code",
          placeholder: "IFSC Code",
          component: "inputField",
          disabled: true,
        },
      ],
    }),
    [isFetching, isLoading, data]
  );

  return <SectionWithDynamicFields data={field} form={form} />;
}
