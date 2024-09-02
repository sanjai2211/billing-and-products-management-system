"use client";

import { columns } from "@/lib/tables/stock-reports/columns";
import { DataTable } from "@/lib/tables/my-stocks/data-table";
import Chart from "@/lib/charts";
import { groupDataByField } from "@/lib/utils-helper/screens/getGroupedData";
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
import { calculateTotal } from "@/lib/utils-helper/data/get-total";
import { useMemo } from "react";

export default function ProductStockReports({ reports, details }: any) {
  const getParsedTableData = (data: any) => {
    return data?.map((list: any, index: number) => {
      if (!list?.items?.length) {
        return list;
      }
      const [firstItem, ...restItems] = sortAscending(list?.items, "createdAt");
      return {
        ...firstItem,
        items: restItems,
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

  // Grouping the data based on supplier
  console.log({ reports });
  const groupedData = groupDataByField(
    reports || [],
    "Stock/Customer/id",
    "id"
  );
  // Parsing the grouped data for the table
  const parsedTableData = getParsedTableData(groupedData) || [];
  //Sorting the data
  const sortTableData: any = sortAscending(parsedTableData, "cost") || [];
  // Generating the colors
  const colors = useMemo(
    () => generateColors(groupedData?.length),
    [groupedData?.length]
  );
  // Attaching the generated colors
  const tableData = attachColors(sortTableData, colors) || [];

  // Dhonugt Graph
  const totalCostData = getCostTotalData(tableData) || [];
  const totalCost = generateGraphData([totalCostData], colors);

  // Cost Graph
  const stackedCostData = generateStackGraphData(tableData, "cost");
  const costGraph = generateGraphData(stackedCostData, colors);

  // Quantity Graph
  const quantityGraphData = getTotalData(tableData, "quantity");
  const quantityGraph = generateGraphData([quantityGraphData], colors, "line");

  console.log({ quantityGraph });

  // Labels for each graph
  const labels = getValuesWithObject(
    sortTableData,
    "Stock/Customer/customerName"
  );

  const chartData = [
    {
      type: "bar",
      data: {
        labels,
        datasets: costGraph,
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
        labels,
        datasets: quantityGraph,
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
        labels,
        datasets: totalCost,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
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

  return (
    <div className="flex gap-4 w-full">
      <div className="w-full space-y-4">
        <DataTable data={tableData} columns={columns} />
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
        <div className="w-full border rounded-md divide divide-y">
          <div className="flex flex-col justify-center p-2">
            <p className="text-center text-xs opacity-50">Current Stock</p>
            <RunningNumber
              endNumber={details?.openStock}
              duration={1}
              fontSize="text-xl"
            />
            <p className="text-center text-xs">{details?.unit}</p>
          </div>
          <div className="flex justify-between divide divide-x flex-1">
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
          </div>
        </div>
        <div className={`w-full h-[424px] border rounded-lg bg-background p-4`}>
          <div className="flex gap-2 justify-between">
            <TextDisplay
              heading="Total Value"
              subHeading="Distribution of Tost value purchased from each supplier"
            />
            <div className="space-y-2 rounded-sm">
              <div className="flex gap-1">
                <p className="text-xs">&#8377;</p>

                <RunningNumber
                  endNumber={calculateTotal(totalCostData) * 989}
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
        <div className={`w-full h-[424px] border rounded-lg bg-background p-4`}>
          <div className="flex gap-2 justify-between">
            <TextDisplay
              heading="Total Value"
              subHeading="Distribution of Tost value purchased from each supplier"
            />
            <div className="space-y-2 rounded-sm">
              <div className="flex gap-1">
                <p className="text-xs">&#8377;</p>

                <RunningNumber
                  endNumber={calculateTotal(totalCostData) * 989}
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
      </div>
    </div>
  );
}
