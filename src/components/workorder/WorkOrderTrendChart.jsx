import React from "react";
import ReactECharts from "echarts-for-react";

export default function WorkOrderTrendChart() {
  const option = {
    tooltip: { trigger: "axis" },
    legend: {
      data: ["报修量", "完成量"],
      right: 0,
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 40,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "报修量",
        type: "bar",
        data: [18, 14, 32, 29, 23, 22, 25],
        itemStyle: { color: "#60a5fa" },
        barWidth: "40%",
      },
      {
        name: "完成量",
        type: "bar",
        data: [19, 29, 16, 21, 24, 25, 19],
        itemStyle: { color: "#34d399" },
        barWidth: "40%",
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border p-4 h-[320px]">
      <div className="font-semibold text-slate-700 mb-2">
        近7日工单趋势分析
      </div>
      <ReactECharts option={option} style={{ height: "260px" }} />
    </div>
  );
}
