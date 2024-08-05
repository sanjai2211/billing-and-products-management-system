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
import Chart from "@/lib/charts";
import { getArrayWithFieldValues } from "@/lib/utils-helper/screens/getArrayWithFieldValues";
import { generateRandomColors } from "@/lib/utils-helper/charts/generateRandomColors";
import { getGrouppedTableData } from "@/lib/utils-helper/screens/getGroupedData";

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

  console.log({ productDetails, session, reports });

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

  const colors = generateRandomColors(reports.length);
  const tableData = getGrouppedTableData(
    reports,
    "Stock/Customer/customerName",
    "customerName"
  );
  console.log({ tableData });

  const parseData = (data) => {
    const labels = [];
    const stackedCosts = [];
    const nonStackedCosts = [];

    data.forEach(item => {
        if (item.Stock && item.Stock.Customer) {
            labels.push(item.Stock.Customer.customerName);
            if (item.items) {
                stackedCosts.push(item.items.map(subItem => subItem.cost));
            } else {
                nonStackedCosts.push(item.cost);
            }
        }
    });

    return { labels, stackedCosts, nonStackedCosts };
};

const { labels, stackedCosts, nonStackedCosts } = parseData(tableData);

const transformData = (data: any) => {
  // Flatten the items array into a single array
  return data.tableData.flatMap((item: any) => {
    if (item.items) {
      return item.items.map((subItem: any) => ({
        ...subItem,
        supplier: subItem.Stock.Customer.customerName,
        createdAt: new Date(subItem.Stock.createdAt).toLocaleDateString(),
      }));
    } else {
      return {
        ...item,
        supplier: item.Stock.Customer.customerName,
        createdAt: new Date(item.Stock.createdAt).toLocaleDateString(),
      };
    }
  });
};


const transformedData = transformData(reports);


  const chartData = [
    {
      type: "bar",
      data: {
        labels: getArrayWithFieldValues(
          tableData,
          "Stock/Customer/customerName"
        ),
        datasets: [
          {
            label: "Stacked Cost",
            data: [4, 4, 3], // Example data for stacked bars
            backgroundColor: ["rgba(255, 99, 132, 0.1)","rgba(75, 192, 192, 0.4)"],
            borderColor: ["rgba(255, 99, 132, 1)","rgba(75, 192, 192, 1)"],
            borderWidth: 1,
            stack: "stack1", // Assign to stack group
          },
          {
            label: "Stacked Cost",
            data: [10,2,0],
            backgroundColor: ["rgba(255, 99, 132, 0.2)","rgba(75, 192, 192, 0.6)"],
            borderColor: ["rgba(255, 99, 132, 2)","rgba(75, 192, 192, 2)"],
            borderWidth: 1,
            stack: "stack1", // Assign to stack group
          },
          {
            label: "Stacked Cost",
            data: [14,2,0],
            backgroundColor: ["rgba(255, 99, 132, 0.3)","rgba(75, 192, 192, 0.6)"],
            borderColor: ["rgba(255, 99, 132, 2)","rgba(75, 192, 192, 2)"],
            borderWidth: 1,
            stack: "stack1", // Assign to stack group
          },
        ],

      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Stacked and Non-stacked Bar Chart",
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            stacked: true, // Enable stacking for the x-axis
          },
          y: {
            beginAtZero: true,
            stacked: false, // Disable stacking for the y-axis
          },
        },
      },
    },
    {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [
              ...stackedCosts.map((costs, index) => ({
                  label: `Stacked Cost ${index + 1}`,
                  data: costs,
                  backgroundColor: `rgba(255, 99, 132, 0.2)`,
                  borderColor: `rgba(255, 99, 132, 1)`,
                  borderWidth: 1,
                  stack: 'stack1'
              })),
              {
                  label: 'Non-stacked Cost',
                  data: nonStackedCosts,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                  stack: 'stack2'
              }
          ]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Stacked and Non-stacked Bar Chart'
              }
          },
          scales: {
              x: {
                  beginAtZero: true,
                  stacked: true
              },
              y: {
                  beginAtZero: true,
                  stacked: false
              }
          }
      }
  },
    {
      type: "doughnut",
      className: "h-80 w-fit border rounded-lg p-4 bg-background",
      data: {
        labels: getArrayWithFieldValues(
          tableData,
          "Stock/Customer/customerName"
        ),
        datasets: [
          {
            data: getArrayWithFieldValues(tableData, "quantity"),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Quantity Supplied by Different Suppliers",
          },
        },
      },
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

      <div className="flex gap-4 w-full">
      <div className="w-full">
          <DataTable data={transformedData} columns={columns} />
        </div>
        <div className="space-y-4 w-full">
          <div className={`h-56 w-full  rounded-lg  bg-background`}>
            <Chart data={chartData[0]} />
          </div>
          <div className={`h-56 w-full  rounded-lg`}>
            <Chart data={chartData[1]} />
          </div>
        </div>
       
      </div>
    </div>
  );
}
