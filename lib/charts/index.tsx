// Chart.js
import React from "react";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register components in ChartJS
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Chart = ({ data }: any) => {
  const { type, ...rest } = data;
  switch (type) {
    case "line":
      return <Line {...rest} />;
    case "bar":
      return <Bar {...rest} />;
    case "doughnut":
      return <Doughnut {...rest} />;
    case "pie":
      return <Pie {...rest} />;

    default:
      return null;
  }
};

export default Chart;
