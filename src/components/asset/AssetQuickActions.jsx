import React from "react";

export default function AssetQuickActions() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-bold text-slate-700 mb-3">
        快捷入口
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <ActionCard title="资产入库" />
        <ActionCard title="盘点作业" />
      </div>
    </div>
  );
}

function ActionCard({ title }) {
  return (
    <div className="h-20 rounded-lg bg-slate-50 hover:bg-blue-50 cursor-pointer flex items-center justify-center text-blue-600 font-medium">
      {title}
    </div>
  );
}
