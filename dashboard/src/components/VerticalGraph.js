
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Holdings - Current Value",
    },
    tooltip: {
      callbacks: {
        label: (context) =>
          `Value: ₹${Number(context.raw).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Value (₹)",
      },
    },
  },
};

export function VerticalGraph({ data }) {
  if (!data || !data.labels || data.labels.length === 0) {
    return <p>No holdings available to display in the graph.</p>;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "350px" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
