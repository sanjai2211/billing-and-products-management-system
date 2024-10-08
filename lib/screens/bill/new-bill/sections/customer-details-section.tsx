"use client";

import { DisabledAddressSection } from "@/lib/constants";
import { SectionWithDynamicFields } from "@/lib/components";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomersByShopId } from "@/apicall";
import { getList } from "@/lib/utils-helper/screens/getList";
import { useAddEditDeleteBill } from "@/lib/hooks";


export default function CustomerDetailsSection({ session, form,billId }: any) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["customers", session?.shopId],
    queryFn: () => getCustomersByShopId(session?.shopId),
    enabled: !!session?.shopId,
  });

  const { mutate: onSubmit } = useAddEditDeleteBill({
    billId,
    method: "PATCH",
  });

  const handleCustomerSelect = async(selectedProduct: any) => {
    const { value } = selectedProduct;
    await onSubmit({customerId : value})
    const {
      id,
      address,
      bankDetails,
      shopId,
      customerName,
      phoneNumbers,
      email,
      gstIn,
      ...restCustomer
    } = data?.find((item: any) => item?.id === value);
    Object.entries({
      ...address,
      customerName: { value, label: customerName },
      phoneNumbers: { value, label: phoneNumbers },
      email: { value, label: email },
      gstIn: { value, label: gstIn },
      customerBankDetails: bankDetails,
      ...restCustomer,
    }).forEach(([field, value]: any) => {
      form.setValue(field, value);
    });
  };

  const commonField = {
    component: "searchableField",
    isLoading: isFetching || isLoading,
    onSelect: handleCustomerSelect,
  };

  const CustomerDetails = useMemo(
    () => [
      {
        id: "customer-details",
        sectionName: "Customer Details",
        icon: "User",
        fields: [
          {
            id: "customerName",
            label: "Customer Name",
            placeholder: "Customer Name",
            list: getList(data,"customerName", "phoneNumbers"),
            ...commonField,
          },
          {
            id: "phoneNumbers",
            label: "Phone Number",
            placeholder: "Phone Number",
            list: getList(data,"phoneNumbers","customerName"),
            ...commonField,
          },
          {
            id: "email",
            label: "Email",
            placeholder: "Email",
            list: getList(data,"email","customerName"),
            ...commonField,
          },
          {
            id: "gstIn",
            label: "GSTIN",
            placeholder: "GSTIN",
            list: getList(data,"gstIn","customerName"),
            ...commonField,
          },
        ],
      },
      {
        ...DisabledAddressSection,
        sectionName: "Customer Address",
      },
    ],
    [isFetching, isLoading, data]
  );

  return CustomerDetails?.map((item: any) => (
    <SectionWithDynamicFields data={item} form={form} />
  ));
}
