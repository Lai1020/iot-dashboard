import React from "react";
import ReactECharts from "echarts-for-react";

export default function FaultTypePieChart() {
  const option = {
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      left: "center",
    },
    series: [
      {
        name: "故障类型",
        type: "pie",
        radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: "142\n本月总计",
          fontSize: 18,
          fontWeight: "bold",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
          },
        },
        labelLine: { show: false },
        data: [
          { value: 50, name: "车载设备" },
          { value: 35, name: "场站设施" },
          { value: 28, name: "供电系统" },
          { value: 29, name: "其他" },
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border p-4 h-[320px]">
      <div className="font-semibold text-slate-700 mb-2">
        故障类型分布
      </div>
      <ReactECharts option={option} style={{ height: "260px" }} />
    </div>
  );
}
