"use client";

import {
  columns,
  customerStockReportsColumns,
  productStockReportsColumns,
} from "@/lib/tables/stock-reports/columns";
import { DataTable } from "@/lib/tables/my-stocks/data-table";
import Chart from "@/lib/charts";
import RunningNumber from "@/lib/components/running-number";
import { sortAscending } from "@/lib/utils-helper/data/sort";
import {
  attachColors,
  generateColors,
} from "@/lib/utils-helper/charts/chart-colors";
import { generateGraphData } from "@/lib/utils-helper/charts/generate-graph-data";
import { generateStackGraphData } from "@/lib/utils-helper/charts/generate-stack-graph-data";
import { getValuesWithObject } from "@/lib/utils-helper/data/get-values-with-object";
import TextDisplay from "@/lib/components/text-display";
import {
  calculateTotal,
  calculateTotalByField,
} from "@/lib/utils-helper/data/get-total";
import { groupDataByField } from "@/lib/utils-helper/screens/getGroupedData";
import { useMemo, useState } from "react";
import { CustomizedTab } from "@/components/ui/tabs";

export default function CustomerStockReports({ reports, details }: any) {
  const [currentTab, setCurrentTab] = useState("stocks");

  const idObject: any = {};
  const index = -1;

  const getParsedTableData = (data: any, colors: any, type: any) => {
    const field = type === "stock" ? "Stock" : "product";

    const attachColors = (list: any) => {
      const stockId = list?.Stock?.id;
      const productId = list?.product?.Product?.id;

      const getNextColor = () => {
        return colors[index + 1];
      };

      const stockColor = idObject[stockId] || getNextColor();
      const productColor = idObject[productId] || getNextColor();

      if (!idObject[stockId]) {
        idObject[stockId] = stockColor;
      }
      if (!idObject[productId]) {
        idObject[productId] = productColor;
      }

      return {
        stockColor,
        productColor,
      };
    };

    return data?.map((list: any, index: number) => {
      if (!list?.items?.length) {
        const newColors = attachColors(list);

        return {
          ...list,
          totalValue: list.cost * list?.quantity,
          ...newColors,
        };
      }
      const items = list?.items;
      const totalCostArray = getCostTotalData(items);
      const totalValue = calculateTotal(totalCostArray);
      const quantity = calculateTotalByField(items, "quantity");
      const data = list?.items[0]?.[field];

      items?.map((item: any) => {
        const newColors = attachColors(list);
        return { ...item, ...newColors };
      });

      return {
        quantity,
        totalValue,
        [field]: data,
        items,
      };
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
        console.log({ segment, pathSegments, value });
        if (value?.[segment] !== undefined) {
          value = value[segment];
        } else {
          value = null;
          break;
        }
      }
      console.log({ valuess: value });

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

  console.log({ groupedStockData, groupedProductData, reports });

  const colors = useMemo(
    () => generateColors(groupedStockData?.length + groupedProductData?.length),
    [groupedStockData?.length + groupedProductData?.length]
  );

  //   Parsing the grouped data for the table
  const parsedTableData =
    getParsedTableData(groupedStockData, colors, "stock") || [];
  const parsedProductTableData =
    getParsedTableData(groupedProductData, colors, "product") || [];

  console.log({ parsedTableData, parsedProductTableData });

  const stockLabels = getValuesWithObject(parsedTableData, "Stock/stockCode");

//   const productColors = useMemo(
//     () => generateColors(parsedProductTableData?.length),
//     [parsedProductTableData?.length]
//   );

//   const getMergedStockColors = generateMapData(
//     parsedTableData,
//     stockColors.slice(0, parsedTableData?.length),
//     "Stock/id"
//   );
//   const getMergedProductColors = generateMapData(
//     parsedProductTableData,
//     stockColors,
//     "product/Product/id"
//   );

//   const colors = { ...getMergedStockColors, ...getMergedProductColors };

//   console.log({ getMergedProductColors, getMergedStockColors });
//   const stockTableData = attachColors(parsedTableData, stockColors);
//   const productTableData = attachColors(parsedProductTableData, productColors);

  const productLabels = getValuesWithObject(
    parsedProductTableData,
    "product/Product/productName"
  );

  const productCodeLabels = getValuesWithObject(
    parsedProductTableData,
    "product/Product/code"
  );

  const stockCode = getNestedValues(parsedProductTableData, "Stock/stockCode");
  console.log({ aaaa: stockCode });

  // Total value Graph

  const totalValueData = getValuesWithObject(parsedTableData, "totalValue");
  const totalValueDataset = generateGraphData([totalValueData], colors);

  // Total value based on Product
  const totalValueProductData = getValuesWithObject(
    parsedProductTableData,
    "totalValue"
  );
  const totalValueProductDataset = generateGraphData(
    [totalValueProductData],
    colors
  );
  console.log({ totalValueData, totalValueDataset, parsedTableData });

  const totalStockValue = calculateTotalByField(parsedTableData, "totalValue");

  console.log({ parsedTableData });

  // Extract stock names for the X-axis
  const stockNames = getValuesWithObject(parsedTableData, "Stock/stockCode");

  // Product Cost graph

  const stackedProductCostData = generateStackGraphData(
    parsedProductTableData,
    "cost"
  );
  const productCostGraph = generateGraphData(
    stackedProductCostData,
    colors,
    "bar",
    { stockCode }
  );

  // Product Quantity Graph

  const productQuantityGraphData = getTotalData(
    parsedProductTableData,
    "quantity"
  );
  const productQuantityGraph = generateGraphData(
    [productQuantityGraphData],
    colors,
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
              console.log({ context });
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
  ];

  console.log({ chartData: chartData[0] });

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

  console.log({ chartData });

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 w-full">
        <div className="w-full space-y-4">
          <DataTable
            data={currentTab === "stocks" ? parsedTableData : parsedProductTableData}
            columns={
              currentTab === "stocks"
                ? customerStockReportsColumns(colors)
                : productStockReportsColumns(colors)
            }
          />
          <div className="flex gap-4">
            <div
              className={`w-full border rounded-lg bg-background p-4 space-y-4`}
            >
              <TextDisplay
                heading="Cost"
                subHeading="Distribution of Product Cost purchased from each suppliers"
              />
              <Chart data={chartData[0]} />
              <div />
            </div>
            <div
              className={`w-full border rounded-lg bg-background p-4 space-y-4`}
            >
              <div className="flex gap-2 justify-between">
                <TextDisplay
                  heading="Quantity"
                  subHeading="Distribution of Total Quantity purchased from each suppliers"
                />
                {/* <div className="space-y-2 rounded-sm">
                  <RunningNumber
                    endNumber={calculateTotal(quantityGraphData) * 989}
                    duration={1}
                    fontSize="text-xs"
                    startColor="text-green-500"
                  />
                  <p className="text-xs opacity-50 text-right">
                    {details?.unit}
                  </p>
                </div> */}
              </div>

              <Chart data={chartData[1]} />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
        <div className="space-y-4 w-full">
          <div className=" flex gap-2  justify-between items-center w-full border rounded-md divide divide-x flex-1">
            <div className="flex-1 justify-center pl-2">
              <CustomizedTab
                defaultValue="stocks"
                data={tabData}
                setTab={setCurrentTab}
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <div className="flex gap-1 items-center justify-center">
                <p>&#8377;</p>
                <RunningNumber
                  endNumber={totalStockValue} // Count up to 100
                  duration={2} // Complete in 10 seconds
                  fontSize="text-xl"
                />
              </div>
              <p className="text-center text-xs">Total Stock value</p>
            </div>
            <div className="flex flex-col justify-center p-2 flex-1">
              <div className="flex gap-1 items-center justify-center">
                <p>&#8377;</p>
                <RunningNumber
                  endNumber={totalStockValue} // Count up to 100
                  duration={2} // Complete in 10 seconds
                  fontSize="text-xl"
                />
              </div>
              <p className="text-center text-xs">Total Stock value</p>
            </div>
            {/* <div className="flex justify-between divide divide-x flex-1">
              <div className="flex flex-col justify-center flex-1 p-2 ">
                <div className="flex gap-1 items-center justify-center">
                  <p>&#8377;</p>
                  <RunningNumber
                    endNumber={details?.salesRate} // Count up to 100
                    duration={2} // Complete in 10 seconds
                    fontSize="text-xl"
                  />
                </div>

                <p className="text-center text-sm opacity-50">
                  Current Sales Rate
                </p>
              </div>
              <div className="flex flex-col justify-center  flex-1 p-4">
                <div className="flex gap-1 items-center justify-center">
                  <p>&#8377;</p>
                  <RunningNumber
                    endNumber={details?.salesRate * details?.stockValue} // Count up to 100
                    duration={2} // Complete in 10 seconds
                    fontSize="text-xl"
                  />
                </div>

                <p className="text-center text-sm opacity-50">
                  Total Stock Value
                </p>
              </div>
            </div> */}
          </div>
          <div
            className={`w-full h-[454px] border rounded-lg bg-background p-4`}
          >
            <div className="flex gap-2 justify-between">
              <TextDisplay
                heading="Total Cost"
                subHeading="Distribution of Tost value purchased from each supplier"
              />
              <div className="space-y-2 rounded-sm">
                <div className="flex gap-1">
                  <p className="text-xs">&#8377;</p>

                  <RunningNumber
                    endNumber={calculateTotal([]) * 989}
                    duration={1}
                    fontSize="text-xs"
                    startColor="text-green-500"
                  />
                </div>

                <p className="text-xs opacity-50 text-right">Total Cost</p>
              </div>
            </div>

            <Chart data={chartData[2]} />
          </div>
          <div
            className={`w-full h-[454px] border rounded-lg bg-background p-4`}
          >
            <div className="flex gap-2 justify-between">
              <TextDisplay
                heading="Total Cost"
                subHeading="Distribution of Tost value purchased from each supplier"
              />
              <div className="space-y-2 rounded-sm">
                <div className="flex gap-1">
                  <p className="text-xs">&#8377;</p>

                  <RunningNumber
                    endNumber={calculateTotal([]) * 989}
                    duration={1}
                    fontSize="text-xs"
                    startColor="text-green-500"
                  />
                </div>

                <p className="text-xs opacity-50 text-right">Total Cost</p>
              </div>
            </div>

            <Chart data={chartData[3]} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
