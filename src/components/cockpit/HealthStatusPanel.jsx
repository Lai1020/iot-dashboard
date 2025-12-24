import React from "react";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

export default function HealthStatusPanel() {
  const data = [
    {
      label: "健康",
      value: 10432,
      percent: 81,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: <ShieldCheck size={18} />,
    },
    {
      label: "亚健康",
      value: 1982,
      percent: 15,
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: <ShieldAlert size={18} />,
    },
    {
      label: "风险",
      value: 431,
      percent: 4,
      color: "text-red-600",
      bg: "bg-red-50",
      icon: <ShieldX size={18} />,
    },
  ];

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-bold text-slate-700 mb-3">设备健康态势</h3>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-3 py-2 rounded-lg ${item.bg}`}
          >
            <div className={`flex items-center gap-2 ${item.color}`}>
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>

            <div className="text-right">
              <div className="font-bold text-slate-700">
                {item.value.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">{item.percent}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
