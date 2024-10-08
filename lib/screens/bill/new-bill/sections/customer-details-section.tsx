"use client";

import { DisabledAddressSection } from "@/lib/constants";
import { SectionWithDynamicFields } from "@/lib/components";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomersByShopId } from "@/apicall";
import { useAddEditDeleteBill } from "@/lib/hooks";
import { getList } from "@/lib/utils-helper/data/get-list";

export default function CustomerDetailsSection({
  session,
  form,
  onSubmit,
  customer = "CUSTOMER",
}: any) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["customers", session?.shopId],
    queryFn: () =>
      getCustomersByShopId(
        session?.shopId,
        `customerType=${customer}&customerType=BOTH`
      ),
    enabled: !!session?.shopId,
  });

  const handleCustomerSelect = async (selectedProduct: any) => {
    const { value } = selectedProduct;
    await onSubmit({ customerId: value, method: "PATCH" });
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
        sectionName: "Supplier Details",
        icon: "User",
        fields: [
          {
            id: "customerName",
            label: "Supplier Name",
            placeholder: "Supplier Name",
            list: getList(data, "customerName", "phoneNumbers"),
            ...commonField,
          },
          {
            id: "phoneNumbers",
            label: "Phone Number",
            placeholder: "Phone Number",
            list: getList(data, "phoneNumbers", "customerName"),
            ...commonField,
          },
          {
            id: "email",
            label: "Email",
            placeholder: "Email",
            list: getList(data, "email", "customerName"),
            ...commonField,
          },
          {
            id: "gstIn",
            label: "GSTIN",
            placeholder: "GSTIN",
            list: getList(data, "gstIn", "customerName"),
            ...commonField,
          },
        ],
      },
      {
        ...DisabledAddressSection,
        sectionName: "Supplier Address",
      },
    ],
    [isFetching, isLoading, data]
  );

  return CustomerDetails?.map((item: any) => (
    <SectionWithDynamicFields data={item} form={form} />
  ));
}
