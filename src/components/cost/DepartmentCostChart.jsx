import React from "react";
import ReactECharts from "echarts-for-react";

export default function DepartmentCostChart({ data }) {
  const option = {
    grid: { left: 80, right: 40, top: 20, bottom: 20 },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: data.map((d) => d.name),
    },
    series: [
      {
        type: "bar",
        data: data.map((d) => d.value),
        barWidth: 16,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-bold mb-2">部门成本对比</h3>
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
}
