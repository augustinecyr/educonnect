import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            label: "API Calls",
            data: data.map((entry) => entry.calls),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
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

  return <canvas ref={chartRef} id="api-calls" />;
};

export default LineGraph;
