import React from "react";
import ReactECharts from "echarts-for-react";

export default function CostStructureChart({ data }) {
  const option = {
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      icon: "circle",
    },
    series: [
      {
        name: "成本构成",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        data,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-bold mb-2">成本构成分析</h3>
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
}
