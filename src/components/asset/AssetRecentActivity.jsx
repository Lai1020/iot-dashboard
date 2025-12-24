import React from "react";

const logs = [
  "张三 领用了 手持POS机 V2 · 10分钟前",
  "李四 报修了 71路-沪A9921 · 35分钟前",
  "系统 自动入库 采购合同 HT-2024-001 · 2小时前",
];

export default function AssetRecentActivity() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-bold text-slate-700 mb-3">
        近期资产变动
      </h3>

      <div className="space-y-2 text-sm text-slate-600">
        {logs.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-blue-500">•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
