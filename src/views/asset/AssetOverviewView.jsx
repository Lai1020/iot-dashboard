import React from "react";

import AssetCategoryChart from "../../components/asset/AssetCategoryChart";
import AssetStatusDonut from "../../components/asset/AssetStatusDonut";
import AssetHealthTopList from "../../components/asset/AssetHealthTopList";
import AssetQuickActions from "../../components/asset/AssetQuickActions";
import AssetRecentActivity from "../../components/asset/AssetRecentActivity";

/* ================= 主视图 ================= */

export default function AssetOverviewView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ===== ① 资产 KPI 总览 ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard title="资产总数" value="12,486" unit="项" />
        <KpiCard title="在用资产" value="8,942" unit="项" />
        <KpiCard title="异常资产" value="216" unit="项" highlight />
        <KpiCard title="高风险资产" value="38" unit="项" danger />
      </div>

      {/* ===== ② 分类结构 + 状态占比 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AssetCategoryChart />
        </div>
        <AssetStatusDonut />
      </div>

      {/* ===== ③ 健康预警 + 操作区 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AssetHealthBlock />
        </div>

        <div className="space-y-6">
          <AssetQuickActions />
          <AssetRecentActivity />
        </div>
      </div>

      {/* ===== ④ 系统自动解读 ===== */}
      <SystemInsight />
    </div>
  );
}

/* ================= 子模块（新增） ================= */

function KpiCard({ title, value, unit, highlight, danger }) {
  const style =
    danger
      ? "bg-red-50 text-red-600"
      : highlight
      ? "bg-amber-50 text-amber-600"
      : "bg-white text-slate-700";

  return (
    <div className={`rounded-xl border p-4 ${style}`}>
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-2xl font-bold">
        {value}
        <span className="text-sm font-normal text-slate-400 ml-1">
          {unit}
        </span>
      </div>
    </div>
  );
}

/* ===== 资产健康区（加趋势标签） ===== */

function AssetHealthBlock() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-700">
          资产健康预警（Top 5 低分）
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600">
          ⚠️ 风险较上周 +12%
        </span>
      </div>

      <AssetHealthTopList />
    </div>
  );
}

/* ===== 系统自动解读 ===== */

function SystemInsight() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
      📊 <span className="font-medium text-slate-700">系统解读：</span>
      当前资产整体运行态势平稳，但高风险资产数量较上周有所上升，
      主要集中在
      <span className="font-medium text-slate-700">
        {" "}营运车辆
      </span>
      与
      <span className="font-medium text-slate-700">
        {" "}场站设施
      </span>
      ，建议优先安排专项检修与替换评估。
    </div>
  );
}
