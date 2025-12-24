import React from "react";

export default function AssetStatusDonut() {
  return (
    <div className="bg-white rounded-xl border p-4 flex flex-col items-center justify-center h-[320px]">
      <div className="relative w-40 h-40 rounded-full border-[10px] border-emerald-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">
            12K
          </div>
          <div className="text-xs text-slate-400">
            资产总数
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Legend color="bg-emerald-500" text="运营中 65%" />
        <Legend color="bg-blue-500" text="维修中 20%" />
        <Legend color="bg-amber-500" text="闲置 10%" />
        <Legend color="bg-slate-400" text="待报废 5%" />
      </div>
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {text}
    </div>
  );
}
