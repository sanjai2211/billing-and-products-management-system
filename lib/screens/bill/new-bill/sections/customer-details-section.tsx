"use client";

import { DisabledAddressSection } from "@/lib/constants";
import { SectionWithDynamicFields } from "@/lib/components";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomersByShopId } from "@/apicall";

export default function CustomerDetailsSection({ session, form }: any) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["customers", session?.shopId],
    queryFn: () => getCustomersByShopId(session?.shopId),
    enabled: !!session?.shopId,
  });

  const getList = (field: string, subField = "name") => {
    return data?.map((item: any) => ({
      value: item?.id,
      label: item[field],
      subField: item[subField],
    }));
  };

  const handleCustomerSelect = (selectedProduct: any) => {
    const { value } = selectedProduct;
    const {
      id,
      address,
      bankDetails,
      shopId,
      name,
      phoneNumbers,
      email,
      gstIn,
      ...restCustomer
    } = data?.find((item: any) => item?.id === value);
    Object.entries({
      ...address,
      name: { value, label: name },
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
            id: "name",
            label: "Customer Name",
            placeholder: "Customer Name",
            list: getList("name", "phoneNumbers"),
            ...commonField,
          },
          {
            id: "phoneNumbers",
            label: "Phone Number",
            placeholder: "Phone Number",
            list: getList("phoneNumbers"),
            ...commonField,
          },
          {
            id: "email",
            label: "Email",
            placeholder: "Email",
            list: getList("email"),
            ...commonField,
          },
          {
            id: "gstIn",
            label: "GSTIN",
            placeholder: "GSTIN",
            list: getList("gstIn"),
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
