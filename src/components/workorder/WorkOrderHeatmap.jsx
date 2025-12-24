import React from "react";
import ReactECharts from "echarts-for-react";

export default function WorkOrderHeatmap() {
  const hours = [
    "00-03", "03-06", "06-09", "09-12",
    "12-15", "15-18", "18-21", "21-24",
  ];

  const days = [
    "周一", "周二", "周三", "周四",
    "周五", "周六", "周日",
  ];

  // [xIndex, yIndex, value]
  const data = [
    [0, 0, 2], [1, 0, 1], [2, 0, 3], [3, 0, 6],
    [4, 0, 4], [5, 0, 5], [6, 0, 3], [7, 0, 2],

    [0, 1, 1], [1, 1, 2], [2, 1, 4], [3, 1, 7],
    [4, 1, 5], [5, 1, 6], [6, 1, 4], [7, 1, 3],

    [0, 2, 0], [1, 2, 1], [2, 2, 2], [3, 2, 5],
    [4, 2, 6], [5, 2, 7], [6, 2, 5], [7, 2, 4],

    [0, 3, 1], [1, 3, 1], [2, 3, 3], [3, 3, 6],
    [4, 3, 5], [5, 3, 6], [6, 3, 4], [7, 3, 3],

    [0, 4, 2], [1, 4, 3], [2, 4, 5], [3, 4, 8],
    [4, 4, 7], [5, 4, 6], [6, 4, 5], [7, 4, 4],

    [0, 5, 3], [1, 5, 4], [2, 5, 6], [3, 5, 9],
    [4, 5, 8], [5, 5, 7], [6, 5, 6], [7, 5, 5],

    [0, 6, 2], [1, 6, 2], [2, 6, 4], [3, 6, 6],
    [4, 6, 5], [5, 6, 4], [6, 6, 3], [7, 6, 2],
  ];

  const option = {
    tooltip: {
      position: "top",
      formatter: ({ value }) =>
        `${days[value[1]]} ${hours[value[0]]}<br/>工单数：${value[2]}`,
    },
    grid: {
      left: 60,
      right: 20,
      top: 40,
      bottom: 20,
    },
    xAxis: {
      type: "category",
      data: hours,
      splitArea: { show: true },
    },
    yAxis: {
      type: "category",
      data: days,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      inRange: {
        color: ["#e0f2fe", "#60a5fa", "#1e40af"],
      },
    },
    series: [
      {
        name: "维修工单密度",
        type: "heatmap",
        data,
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border p-5 h-[380px]">
      <div className="font-semibold text-slate-700 mb-3">
        维修工时热力图（时段分布）
      </div>
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
}
