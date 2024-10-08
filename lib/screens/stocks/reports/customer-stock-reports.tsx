"use client";

import {
  customerStockReportsColumns,
  productStockReportsColumns,
} from "@/lib/tables/stock-reports/columns";
import { DataTable } from "@/lib/tables/my-stocks/data-table";
import {
  RunningNumberWithText,
} from "@/lib/components/running-number";
import {
  generateColors,
} from "@/lib/utils-helper/charts/chart-colors";
import { generateGraphData } from "@/lib/utils-helper/charts/generate-graph-data";
import {
  generateStackGraphData,
  generateStackGraphGroupData,
} from "@/lib/utils-helper/charts/generate-stack-graph-data";
import { getValuesWithObject } from "@/lib/utils-helper/data/get-values-with-object";
import {
  calculateTotal,
  calculateTotalByField,
} from "@/lib/utils-helper/data/get-total";
import { groupDataByField } from "@/lib/utils-helper/screens/getGroupedData";
import { useMemo, useState } from "react";
import { CustomizedTab } from "@/components/ui/tabs";
import ChartBlock from "@/lib/charts/chart-block";
import { EdgeCase } from "@/lib/components/edge-case";

export default function CustomerStockReports({ reports, details,params }: any) {

  if (!params?.get("customerId")) {
    return (
      <div className="flex w-full justify-center items-center flex-1  h-[calc(100vh-110px)]">
        <EdgeCase
          heading="Select Customer"
          subHeading="Select any Customer to view the analytics."
        />
      </div>
    );
  }
   
  const [currentTab, setCurrentTab] = useState("products");

  const getParsedTableData = (data: any, type: any) => {
    const field = type === "stock" ? "Stock" : "product";
    return data?.map((list: any) => {
      if (!list?.items?.length) {
        return { ...list, totalValue: list.cost * list?.quantity };
      }
      const items = list?.items;
      const totalCostArray = getCostTotalData(items);
      const totalValue = calculateTotal(totalCostArray);
      const quantity = calculateTotalByField(items, "quantity");
      const data = list?.items[0]?.[field];

      return {
        quantity,
        totalValue,
        [field]: data,
        items,
      };
    });
  };

  const attachColorById = (data: any) => {
    const addColors = (list: any) => {
      if (list?.Stock?.id) {
        list["stockColor"] = colors[list?.Stock?.id];
      }
      if (list?.product?.Product?.id) {
        list["productColor"] = colors[list?.product?.Product?.id];
      }
    };
    return data?.map((list: any) => {
      addColors(list);
      if (list?.items) {
        list?.items?.map((item: any) => addColors(item));
      }
      return list;
    });
  };

  const getCostTotalData = (data: any) => {
    return data?.map((list: any) => {
      const total = list?.cost * list?.quantity;
      if (list?.items) {
        const totalCost = list?.items.reduce((sum: any, item: any) => {
          return sum + (item?.cost * item?.quantity || 0);
        }, 0);
        return total + totalCost;
      }
      return total;
    });
  };

  const getTotalData = (data: any, field: any) => {
    return data?.map((list: any) => {
      const total = list?.[field];
      if (list?.items) {
        const listTotal = list?.items.reduce((sum: any, item: any) => {
          return sum + (item?.[field] * item?.quantity || 0);
        }, 0);
        return total + listTotal;
      }
      return total;
    });
  };

  const getNestedValues = (data: any[], field: string) => {
    const getFieldValue = (obj: any, fieldPath: string) => {
      const keys = fieldPath.split("/"); // Split the field by '/'
      return keys.reduce((acc: any, key: string) => {
        return acc?.[key]; // Navigate through the nested fields
      }, obj);
    };

    return data.map((list: any) => {
      const value = getFieldValue(list, field); // Get the value from the top-level object

      if (list?.items) {
        // If 'items' exists, map over them and retrieve the field value for each item
        return list?.items.map((item: any) => getFieldValue(item, field));
      }

      return value;
    });
  };

  function generateMapData(data: any[], mapData: string[], path: string) {
    const pathSegments = path.split("/"); // Split the path into segments

    return data.reduce((result: any, item: any, index: number) => {
      if (index >= mapData.length) return result; // Stop if there are no more colors

      // Traverse the path to get the value of the field
      let value = item;
      for (const segment of pathSegments) {
        if (value?.[segment] !== undefined) {
          value = value[segment];
        } else {
          value = null;
          break;
        }
      }

      // If the field is found, map it to the corresponding color
      if (value) {
        result[value] = mapData[index];
      }

      return result;
    }, {});
  }

  // Grouping the data based on supplier
    const groupedStockData = groupDataByField(reports || [], "Stock/id", "id");
  const groupedProductData = groupDataByField(
    reports || [],
    "product/Product/id",
    "id"
  );

  //   Parsing the grouped data for the table
  const parsedTableData = getParsedTableData(groupedStockData, "stock") || [];
  const parsedProductTableData =
    getParsedTableData(groupedProductData, "product") || [];

  const stockLabels = getValuesWithObject(parsedTableData, "Stock/stockCode");
  const productLabels = getValuesWithObject(
    parsedProductTableData,
    "product/Product/productName"
  );

  const productCodeLabels = getValuesWithObject(
    parsedProductTableData,
    "product/Product/code"
  );

  const stockCode = getNestedValues(parsedProductTableData, "Stock/stockCode");

  const stockColors = useMemo(
    () =>
      generateColors(parsedTableData?.length + parsedProductTableData?.length),
    [parsedTableData?.length]
  );
  const productColors = useMemo(
    () => generateColors(parsedProductTableData?.length, stockColors),
    [parsedProductTableData?.length]
  );

  const getMergedStockColors = generateMapData(
    parsedTableData,
    stockColors,
    "Stock/id"
  );
  const getMergedProductColors = generateMapData(
    parsedProductTableData,
    productColors,
    "product/Product/id"
  );

  const colors = { ...getMergedStockColors, ...getMergedProductColors };

  const stockTableData = attachColorById(parsedTableData);
  const productTableData = attachColorById(parsedProductTableData);

  const getStockProductGraph = (data: any, field: any) => {
    let obj: any = {};
    let productIndex: any = {};

    data?.map((list: any) => {
      list?.items?.map((item: any) => {
        const product = item?.product?.Product;
        const productId = product?.id;

        if (obj.hasOwnProperty(productId)) {
          const index = Object.keys(obj)?.indexOf(productId);
          obj[productId]["data"][index] = product?.[field];
        } else {
          obj[productId] = {
            backgroundColor: colors[productId],
            data: [product?.[field]],
            label: product?.productCode,
          };
        }
      });
    });
    return Object?.values(obj);
  };

  const stockProductData = getStockProductGraph(parsedTableData, "cost");

  // Total value Graph

  const totalValueData = getValuesWithObject(parsedTableData, "totalValue");
  const totalValueDataset = generateGraphData([totalValueData], stockColors);

  // Total value based on Product
  const totalValueProductData = getValuesWithObject(
    parsedProductTableData,
    "totalValue"
  );
  const totalValueProductDataset = generateGraphData(
    [totalValueProductData],
    productColors
  );

  const totalStockValue = calculateTotalByField(parsedTableData, "totalValue");

  // Extract stock names for the X-axis
  const productCodes = getValuesWithObject(
    parsedProductTableData,
    "product/Product/code"
  );

  // Product Cost graph

  const stackedProductCostData = generateStackGraphData(
    parsedProductTableData,
    "cost"
  );

  const stackedProductQuantityData = generateStackGraphData(
    parsedTableData,
    "quantity"
  );

  const productCostGraph = generateGraphData(
    stackedProductCostData,
    productColors,
    { stockCode }
  );

  const stockBasedProductGraphData = generateStackGraphGroupData({
    data: parsedProductTableData,
    rows: parsedProductTableData?.length,
    columns: parsedTableData?.length,
    fields: ["cost", "quantity"],
    groupBy: "Stock/stockCode",
    colors,
    colorsPath: "product/Product/id",
    labelPath: "product/Product/code",
  });

  const productBasedStockCostGraphData = generateStackGraphGroupData({
    data: parsedTableData,
    rows: parsedTableData?.length,
    columns: parsedProductTableData?.length,
    fields: ["cost", "quantity"],
    groupBy: "product/Product/code",
    colors,
    colorsPath: "Stock/id",
    labelPath: "Stock/stockCode",
    grouppedData: productCodes,
  });

  // Product Quantity Graph

  const productQuantityGraphData = getTotalData(
    parsedProductTableData,
    "quantity"
  );
  const productQuantityGraph = generateGraphData(
    [productQuantityGraphData],
    productColors,
    "line"
  );

  const chartData = [
    {
      type: "bar",
      data: {
        labels: productCodeLabels,
        datasets: productCostGraph,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right", // Position the legend on the right side
            labels: {
              boxWidth: 10, // Customize the width of the legend box
              padding: 20, // Add some padding between legend items
            },
          },
          title: {
            display: true,
            text: "Quantity Supplied by Different Suppliers",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: {
                datasetIndex: number;
                dataIndex: number;
                dataset: { stockCode: any[] };
                raw: number;
              }) {
                const { datasetIndex, dataIndex, dataset, raw } = tooltipItem;

                const stockCodeData = dataset.stockCode[dataIndex];

                const stockCode = Array.isArray(stockCodeData)
                  ? stockCodeData[datasetIndex - 1]
                  : stockCodeData;
                return `Stock Code: ${stockCode}, Quantity: ${raw}`;
              },
            },
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
      type: "line",
      data: {
        labels: productCodeLabels,
        datasets: productQuantityGraph,
      },
      options: {
        responsive: true,
        tooltip: {
          callbacks: {
            label: function (context: { label: string; raw: string }) {
              // Modify tooltip label content
              return "Sales in " + context.label + ": $" + context.raw;
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              boxWidth: 10, // Customize the width of the legend box
              padding: 20, // Add some padding between legend items
            },
          },
          title: {
            display: true,
            text: "Quantity Supplied by Different Suppliers",
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            stacked: true,
          },
          y: {
            beginAtZero: true,
            stacked: false,
          },
        },
      },
    },
    {
      type: "doughnut",
      className: "h-48 w-full",

      data: {
        labels: stockLabels,
        datasets: totalValueDataset,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right", // Position the legend on the right side
            // labels: {
            //   boxWidth: 10, // Customize the width of the legend box
            //   padding: 20, // Add some padding between legend items
            // },
          },
          title: {
            display: true,
            text: "Quantity Supplied by Different Suppliers",
          },
        },
      },
    },
    {
      type: "doughnut",
      className: "h-48 w-full",

      data: {
        labels: productLabels,
        datasets: totalValueProductDataset,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right", // Position the legend on the right side
            labels: {
              boxWidth: 10, // Customize the width of the legend box
              padding: 20, // Add some padding between legend items
            },
          },
          title: {
            display: true,
            text: "Quantity Supplied by Different Suppliers",
          },
        },
      },
    },
    {
      type: "bar",
      data: {
        labels: stockLabels, // Stock names on the X-axis
        datasets: stockBasedProductGraphData?.cost, // Datasets for each product
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        skipNull: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true, // Make sure Y-axis starts at 0
          },
        },
      },
    },
    {
      type: "bar",
      data: {
        labels: stockLabels, // Stock names on the X-axis
        datasets: stockBasedProductGraphData?.quantity, // Datasets for each product
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        skipNull: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true, // Make sure Y-axis starts at 0
          },
        },
      },
    },
    {
      type: "bar",
      data: {
        labels: productCodes, // Stock names on the X-axis
        datasets: productBasedStockCostGraphData?.cost, // Datasets for each product
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        skipNull: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true, // Make sure Y-axis starts at 0
          },
        },
      },
    },
    {
      type: "bar",
      data: {
        labels: productCodes, // Stock names on the X-axis
        datasets: productBasedStockCostGraphData?.quantity, // Datasets for each product
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        skipNull: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true, // Make sure Y-axis starts at 0
          },
        },
      },
    },
    {
      type: "bar",
      data: {
        labels: stockLabels, // Stock names on the X-axis
        datasets: stockBasedProductGraphData?.quantity, // Datasets for each product
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        skipNull: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true, // Make sure Y-axis starts at 0
          },
        },
      },
    },
  ];

  const tabData = [
    {
      value: "stocks",
      label: "Stocks",
    },
    {
      value: "products",
      label: "Products",
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 w-full">
        <DataTable
          data={currentTab === "stocks" ? stockTableData : productTableData}
          columns={
            currentTab === "stocks"
              ? customerStockReportsColumns
              : productStockReportsColumns
          }
        />
        <div className=" flex flex-col gap-2  justify-between items-center w-full border rounded-md divide divide-y flex-1">
          <div className="pt-2 px-2">
            <CustomizedTab
              defaultValue="products"
              data={tabData}
              setTab={setCurrentTab}
            />
          </div>

          <RunningNumberWithText
            endNumber={totalStockValue}
            duration={2}
            fontSize="text-xl"
            leftSymbol={`₹`}
            textContent="Total Stock value"
          />
          <RunningNumberWithText
            endNumber={parsedTableData?.length}
            fontSize="text-base"
            textContent="Total Stocks"
            rightSymbol='Stocks'
            duration={0.5}
          />
          <RunningNumberWithText
            endNumber={parsedProductTableData?.length}
            fontSize="text-base"
            textContent="Total Products Involved"
            rightSymbol='Products'
            duration={0.5}


          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 gap-4 justify-between">
            <ChartBlock
              heading="Total Cost"
              subHeading="Distribution of cost value purchased from each supplier"
              chartData={chartData[0]}
            />

          <div className="flex flex-1 gap-4">
                <ChartBlock
                heading="Total Cost"
                subHeading="Distribution of cost value purchased from each supplier"
                chartData={chartData[2]}
              />
                <ChartBlock
                heading="Total Cost"
                subHeading="Distribution of cost value purchased from each supplier"
                chartData={chartData[3]}
              />
          </div>

            <ChartBlock
              heading="Total Cost"
              subHeading="Distribution of cost value purchased from each supplier"
              chartData={chartData[1]}
            />
        </div>
      </div>
      <div className="flex flex-1 gap-4 justify-between">
        <ChartBlock
          heading="Total Cost"
          subHeading="Distribution of cost value purchased from each supplier"
          chartData={chartData[4]}
        />
        <ChartBlock
          heading="Total Cost"
          subHeading="Distribution of cost value purchased from each supplier"
          chartData={chartData[6]}
        />
      </div>
      <div className="flex flex-1 gap-4 justify-between">
        <ChartBlock
          heading="Total Cost"
          subHeading="Distribution of cost value purchased from each supplier"
          chartData={chartData[5]}
        />
        <ChartBlock
          heading="Total Cost"
          subHeading="Distribution of cost value purchased from each supplier"
          chartData={chartData[7]}
        />
      </div>
    </div>
  );
}
