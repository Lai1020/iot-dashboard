import React from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";



import WorkOrderTrendChart from "../../components/workorder/WorkOrderTrendChart";
import FaultTypePieChart from "../../components/workorder/FaultTypePieChart";
import WorkOrderHeatmap  from "../../components/workorder/WorkOrderHeatmap";



export default function WorkOrderOverviewView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ===== 顶部指标卡 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="今日新增工单"
          value="28"
          trend="+12%"
          trendType="up"
          icon={<FileText />}
        />
        <StatCard
          title="平均修复时长"
          value="4.2h"
          trend="-8%"
          trendType="down"
          icon={<Clock />}
        />
        <StatCard
          title="工单完成率"
          value="94.5%"
          trend="+1.2%"
          trendType="up"
          icon={<CheckCircle />}
        />
        <StatCard
          title="当前积压"
          value="5"
          trend="+2"
          trendType="danger"
          icon={<AlertCircle />}
        />
      </div>

      {/* ===== 中部：趋势 + 类型分布 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 趋势图 */}
        <div className="xl:col-span-2">
          <WorkOrderTrendChart />
        </div>

        {/* 类型分布 */}
        <FaultTypePieChart />
      </div>


      {/* ===== 底部：排行榜 + 热力图 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-700 mb-4">
            本周维修之星（Top 5）
          </h3>
          <RankingItem name="李强" count="15 单" score="98" />
          <RankingItem name="王建国" count="12 单" score="96" />
          <RankingItem name="张伟" count="11 单" score="94" />
        </div>

        <WorkOrderHeatmap />
      </div>
    </div>
  );
}

/* ===== 子组件 ===== */

function StatCard({ title, value, trend, trendType, icon }) {
  const trendColor =
    trendType === "up"
      ? "text-emerald-600"
      : trendType === "down"
      ? "text-sky-600"
      : "text-red-600";

  return (
    <div className="bg-white rounded-xl border p-4 flex justify-between items-center">
      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className={`text-xs mt-1 ${trendColor}`}>
          {trend} 较昨日
        </div>
      </div>
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
        {icon}
      </div>
    </div>
  );
}

function RankingItem({ name, count, score }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-slate-400">{count}</div>
      </div>
      <div className="text-sm text-emerald-600 font-semibold">
        {score} 分
      </div>
    </div>
  );
}

function ChartPlaceholder({ text }) {
  return (
    <div className="h-64 rounded-lg bg-slate-50 border flex items-center justify-center text-slate-400 text-sm">
      {text}
    </div>
  );
}
