"use client";

import { columns } from "@/lib/tables/stock-reports/columns";
import { DataTable } from "@/lib/tables/my-stocks/data-table";
import Chart from "@/lib/charts";
import { groupDataByField } from "@/lib/utils-helper/screens/getGroupedData";
import {
  RunningNumber,
  RunningNumberWithText,
} from "@/lib/components/running-number";
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
import ChartBlock from "@/lib/charts/chart-block";
import { EdgeCase } from "@/lib/components/edge-case";

export default function ProductStockReports({ reports, details, params }: any) {

  if (!params?.get("productId")) {
    return (
      <div className="flex w-full justify-center items-center flex-1  h-[calc(100vh-110px)]">
        <EdgeCase
          heading="Select Product"
          subHeading="Select any product to view the analytics."
        />
      </div>
    );
  }

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

  

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 w-full">
        <DataTable data={tableData} columns={columns} />
        <div className="flex flex-col gap-2 justify-between items-center w-[210px] border rounded-md divide divide-y">
          <RunningNumberWithText
            endNumber={details?.openStock}
            duration={2}
            fontSize="text-xl"
            rightSymbol={details?.unit}
            textContent="Current Stock"
          />
          <RunningNumberWithText
            endNumber={details?.salesRate}
            fontSize="text-base"
            textContent="Current Sales Rates"
            leftSymbol={`₹`}
          />
          <RunningNumberWithText
            endNumber={details?.salesRate * details?.stockValue} // Count up to 100
            fontSize="text-base"
            textContent="Total Stock Value"
            leftSymbol={`₹`}
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

          <ChartBlock
            heading="Total Cost"
            subHeading="Distribution of cost value purchased from each supplier"
            chartData={chartData[2]}
          />

          <ChartBlock
            heading="Total Cost"
            subHeading="Distribution of cost value purchased from each supplier"
            chartData={chartData[1]}
          />
        </div>
      </div>
    </div>
  );
}
