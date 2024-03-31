import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !data.datasets || !data.labels) {
      return;
    }

    const chart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          label: dataset.label || "",
          data: dataset.data || [],
          backgroundColor: dataset.backgroundColor || [],
          hoverOffset: dataset.hoverOffset || 0,
        })),
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;
