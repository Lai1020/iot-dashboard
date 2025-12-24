import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function EnergyTrendChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      grid: { left: 20, right: 20, top: 20, bottom: 20 },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [32000, 34000, 38000, 36000, 45230, 43000, 41000],
          type: "line",
          smooth: true,
          symbol: "circle",
          lineStyle: { width: 3 },
        },
      ],
    });

    return () => chart.dispose();
  }, []);

  return <div ref={chartRef} className="w-full h-full" />;
}
