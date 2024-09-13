import React from "react";
import TextDisplay from "../components/text-display";
import Chart from "@/lib/charts";
import { RunningNumberWithText } from "../components/running-number";

const ChartBlock = ({ heading, subHeading, chartData, runningNumber }: any) => {
  return (
    <div className={`w-full flex-1 border rounded-lg bg-background p-4 space-y-8`}>
      <div className="flex gap-2 justify-between">
        <TextDisplay heading={heading} subHeading={subHeading} />
        {runningNumber ? <RunningNumberWithText {...runningNumber} /> : null}
      </div>
      <Chart data={chartData} />
    </div>
  );
};

export default ChartBlock;
