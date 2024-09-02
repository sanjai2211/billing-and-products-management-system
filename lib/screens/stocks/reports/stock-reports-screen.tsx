"use client";

import { useForm } from "react-hook-form";

import { DynamicInputField, PageHeader } from "@/lib/components";
import { Form } from "@/components/ui/form";

import {
  CustomizedTab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomersByShopId, getProductsByShopId } from "@/apicall";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getList } from "@/lib/utils-helper/data/get-list";
import ProductStockReports from "./product-stock-reports";
import CustomerStockReports from "./customer-stock-reports";

export default function StockReportsScreen({ reports, details, session }: any) {

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const [currentTab, setCurretTab] = useState(params.get('produtId') ? "products" : "customers");
  

  const form = useForm();

  // const { data, isLoading, isFetching } = useQuery({
  //   queryKey: [`${currentTab}-stock-reports`, session?.shopId],
  //   queryFn: () =>
  //     currentTab === "products"
  //       ? getProductsByShopId(session?.shopId)
  //       : getCustomersByShopId(session?.shopId),
  //   enabled: !!session?.shopId,
  // });
  const data: never[]= []

  const handleSelect = (selectedProduct: any) => {
    console.log({ selectedProduct });
    const fieldName = currentTab === "products" ? "productId" : "customerId";
    const deleteParam = currentTab === "products" ? "customrId" : "productId";

    const params = new URLSearchParams(searchParams);
    params.delete(deleteParam);
    params.set(fieldName, selectedProduct?.value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const commonFields = {
    // isLoading: isFetching || isLoading,
    onSelect: handleSelect,
    component: "searchableField",
  };

  const dynamicFields =
    currentTab === "products"
      ? [
          {
            id: "code",
            placeholder: "Product Code",
            list: getList(data, "code", "printName"),
            className: "w-40",
            ...commonFields,
          },
          {
            id: "productName",
            placeholder: "Product Name",
            list: getList(data, "productName"),
            className: "w-80",
            ...commonFields,
          },
          {
            id: "printName",
            placeholder: "Print Name",
            list: getList(data, "printName"),
            className: "w-80",
            ...commonFields,
          },
        ]
      : [
          {
            id: "customerName",
            placeholder: "Customer Name",
            list: getList(data, "customerName"),
            className: "w-80",
            ...commonFields,
          },
        ];

        console.log({reports})

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <PageHeader title={`Stocks Reports`} />
        {/* <Form {...form}>
          <form className="flex gap-4 items-center">
            <DynamicInputSelctionField data={dynamicFields} form={form} />
          </form>
        </Form> */}
        <div className="flex gap-2 items-center">
          <div>
            <Form {...form}>
              <form className="grid grid-cols-3 items-center gap-4 px-2">
                {dynamicFields?.map((item: any) => (
                  <DynamicInputField form={form} data={item} />
                ))}
              </form>
            </Form>
          </div>
          

          <Tabs defaultValue="products" className="w-fit">
            <TabsList className="h-10 rounded-md">
              <TabsTrigger
                value="stocks"
                onClick={() => setCurretTab("products")}
                className="h-full"
              >
                Product
              </TabsTrigger>
              <TabsTrigger
                value="details"
                onClick={() => setCurretTab("customers")}
                className="h-full"
              >
                Customer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {currentTab === "products" ? (
        <ProductStockReports reports={reports} details={details} />
      ) : (
        <CustomerStockReports reports={reports} details={details} />
      )}
    </div>
  );
}
