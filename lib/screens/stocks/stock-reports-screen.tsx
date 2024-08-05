"use client";

import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { DynamicInputField, PageHeader } from "@/lib/components";
import { Form } from "@/components/ui/form";

import {
  CustomizedTab,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsByShopId } from "@/apicall";
import { getList } from "@/lib/utils-helper/screens/getList";
import { columns } from "@/lib/tables/stock-reports/columns";
import { DataTable } from "@/lib/tables/my-stocks/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StockReportsScreen({ reports, session }: any) {
  const [currentTab, setCurretTab] = useState("products");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();



  const form = useForm();

  const {
    data: productDetails,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products-stock-reports", session?.shopId],
    queryFn: () => getProductsByShopId(session?.shopId),
    enabled: !!session?.shopId,
  });

  console.log({ productDetails, session,reports });

  

  const handleSelect = (selectedProduct: any) => {
    console.log({ selectedProduct });
    const params = new URLSearchParams(searchParams);
    params.set("productId", selectedProduct?.value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const commonFields = {
    isLoading: isFetching || isLoading,
    onSelect: handleSelect,
    component: "searchableField",
  };

  const dynamicFields = [
    {
      id: "code",
      placeholder: "Product Code",
      list: getList(productDetails, "code", "printName"),
      className: "w-40",
      ...commonFields,
    },
    {
      id: "productName",
      placeholder: "Product Name",
      list: getList(productDetails, "productName"),
      className: "w-80",
      ...commonFields,
    },
    {
      id: "printName",
      placeholder: "Print Name",
      list: getList(productDetails, "printName"),
      className: "w-80",
      ...commonFields,
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <PageHeader title={`Stocks Reports`} />
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
      <div>
        <Form {...form}>
          <form className="grid grid-cols-3 items-center gap-4 px-2">
            {dynamicFields?.map((item: any) => (
              <DynamicInputField form={form} data={item} />
            ))}
          </form>
        </Form>
      </div>
      <DataTable data={reports} columns={columns} />
    </div>
  );
}
