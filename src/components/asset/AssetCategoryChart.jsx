import React from "react";

const data = [
  { name: "营运车辆", current: 80, previous: 90 },
  { name: "IT设施", current: 45, previous: 30 },
  { name: "场站设施", current: 65, previous: 55 },
  { name: "维修工具", current: 38, previous: 20 },
  { name: "办公用品", current: 28, previous: 15 },
  { name: "其他资产", current: 24, previous: 14 },
];

export default function AssetCategoryChart() {
  return (
    <div className="bg-white rounded-xl border p-4 h-[320px]">
      <h3 className="font-bold text-slate-700 mb-4">
        资产分类结构对比
      </h3>

      <div className="h-full flex items-end gap-6 px-4">
        {data.map((item) => (
          <div key={item.name} className="flex-1">
            <div className="flex items-end gap-1 h-[200px]">
              <div
                className="w-3 bg-blue-500 rounded"
                style={{ height: `${item.current}%` }}
              />
              <div
                className="w-3 bg-blue-200 rounded"
                style={{ height: `${item.previous}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 text-center mt-2">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
