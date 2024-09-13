"use client";

import { useForm } from "react-hook-form";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DynamicInputField, PageHeader } from "@/lib/components";
import { Form } from "@/components/ui/form";
import { CustomizedTab } from "@/components/ui/tabs";

import { getCustomersByShopId, getProductsByShopId } from "@/apicall";
import { getList } from "@/lib/utils-helper/data/get-list";

import ProductStockReports from "./product-stock-reports";
import CustomerStockReports from "./customer-stock-reports";
import GeneralStockReports from "./general-stock-reports";

export default function StockReportsScreen({ reports, details, session }: any) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const [currentTab, setCurrentTab] = useState("general");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`${currentTab}-stock-reports`, session?.shopId],
    queryFn: () =>
      currentTab === "products"
        ? getProductsByShopId(session?.shopId)
        : getCustomersByShopId(session?.shopId),
    enabled: !!session?.shopId,
  });

  const getDefaultValues = useCallback(
    (tab: string, field: string) => {
      const value = params.get(tab);
      if (!data || !value) return "";
      return data.find((item: any) => item.id === value)?.[field] || "";
    },
    [data, params]
  );

  const form = useForm();

  const handleSelect = useCallback(
    (selectedProduct: any) => {
      const fieldName = currentTab === "products" ? "productId" : "customerId";
      const deleteParam =
        currentTab === "products" ? "customerId" : "productId";

      const updatedParams = new URLSearchParams(params);
      updatedParams.delete(deleteParam);
      updatedParams.set(fieldName, selectedProduct?.value);
      router.replace(`${pathName}?${updatedParams.toString()}`);
    },
    [currentTab, pathName, params, router]
  );

  const getDynamicFields = useCallback(() => {
    const commonFields = {
      isLoading: isFetching || isLoading,
      className: "w-80",
      onSelect: handleSelect,
      component: "searchableField",
    };
    switch (currentTab) {
      case "products":
        return [
          {
            id: "code",
            placeholder: "Product Code",
            list: getList(data, "code", "printName"),
            ...commonFields,
          },
          {
            id: "productName",
            placeholder: "Product Name",
            list: getList(data, "productName", "printName"),
            ...commonFields,
          },
        ];
      case "customers":
        return [
          {
            id: "customerName",
            placeholder: "Customer Name",
            list: getList(data, "customerName", "phoneNumbers"),
            ...commonFields,
          },
          {
            id: "gstIn",
            placeholder: "GST IN",
            list: getList(data, "gstIn", "customerName"),
            ...commonFields,
          },
        ];

      default:
        return [];
    }
  }, [currentTab,isLoading,isFetching,handleSelect]);

  
  const getReportsTab = useCallback(() => {
    const componentProps = { reports, details, params };
    switch (currentTab) {
      case "general":
        return <GeneralStockReports {...componentProps} />;
      case "products":
        return <ProductStockReports {...componentProps} />;
      case "customers":
        return <CustomerStockReports {...componentProps} />;
      default:
        return null;
    }
  }, [currentTab, reports, details, params]);

  const dynamicFields = useMemo(getDynamicFields, [currentTab,isLoading,isFetching,handleSelect]);

  const tabData = [
    { value: "general", label: "General" },
    { value: "products", label: "Products" },
    { value: "customers", label: "Customers" },
  ];

  return (
    <div className="w-full h-full space-y-4">
      <div className="flex justify-between items-center">
        <PageHeader title={`Stocks Reports`} />

        <div className="flex gap-x-2 items-center">
          <Form {...form}>
            <form className="grid grid-cols-2 items-center gap-x-2 mb-2">
              {dynamicFields?.map((item: any) => (
                <DynamicInputField key={item.id} form={form} data={item} />
              ))}
            </form>
          </Form>

          <CustomizedTab
            defaultValue={currentTab}
            data={tabData}
            setTab={setCurrentTab}
          />
        </div>
      </div>
      {getReportsTab()}
    </div>
  );
}
