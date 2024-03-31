import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = data.labels || [];
    const datasets = data.datasets || [];

    const chart = new Chart(chartRef.current, {
      type: "radar",
      data: {
        labels: labels,
        datasets: datasets.map((dataset) => ({
          label: dataset.label || "",
          data: dataset.data || [],
          backgroundColor: dataset.backgroundColor || "rgba(66, 133, 244)",
          borderColor: dataset.borderColor || "rgba(66, 133, 244)",
          borderWidth: dataset.borderWidth || 1,
        })),
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} id="radar-chart" />;
};

export default RadarChart;
