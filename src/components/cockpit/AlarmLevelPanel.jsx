import React from "react";
import { AlertTriangle, BellRing, Bell } from "lucide-react";

export default function AlarmLevelPanel() {
  const alarms = [
    {
      level: "紧急",
      count: 3,
      color: "text-red-600",
      bg: "bg-red-50",
      icon: <AlertTriangle size={16} />,
    },
    {
      level: "重要",
      count: 12,
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: <BellRing size={16} />,
    },
    {
      level: "一般",
      count: 48,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: <Bell size={16} />,
    },
  ];

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-bold text-slate-700 mb-3">告警等级分布</h3>

      <div className="space-y-2">
        {alarms.map((item) => (
          <div
            key={item.level}
            className={`flex items-center justify-between px-3 py-2 rounded-lg ${item.bg}`}
          >
            <div className={`flex items-center gap-2 ${item.color}`}>
              {item.icon}
              <span className="font-medium">{item.level}</span>
            </div>

            <span className="font-bold text-slate-700">
              {item.count} 条
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
