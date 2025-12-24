import React from "react";
import {
  Zap,
  TrendingUp,
  Factory,
  AlertTriangle,
} from "lucide-react";


import EnergyTrendChart from "../../components/cockpit/EnergyTrendChart";  
import EnergyStructureChart from "../../components/cockpit/EnergyStructureChart";

/* ================= 主视图 ================= */

export default function EnergyMonitorView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ===== KPI 总览 ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          title="今日总用电量"
          value="45,230"
          unit="kWh"
          icon={<Zap />}
          color="amber"
        />
        <KpiCard
          title="较昨日变化"
          value="+6.2"
          unit="%"
          icon={<TrendingUp />}
          color="emerald"
        />
        <KpiCard
          title="高耗能场站"
          value="3"
          unit="个"
          icon={<Factory />}
          color="blue"
        />
        <KpiCard
          title="能耗异常"
          value="2"
          unit="条"
          icon={<AlertTriangle />}
          color="red"
        />
      </div>

      {/* ===== 用电趋势 + 能耗结构 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <EnergyTrendPanel />
        <EnergyStructurePanel />
      </div>

      {/* ===== 线路 / 场站能耗排名 ===== */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-bold text-slate-700 mb-3">
         重点线路 / 场站能耗对比
        </h3>

        <div className="space-y-3">
          {[
            { name: "BRT 1号线", value: 12840 },
            { name: "BRT 2号线", value: 10420 },
            { name: "东部车辆段", value: 8920 },
            { name: "西部充电站", value: 7650 },
          ].map((item) => (
            <BarItem key={item.name} {...item} />
          ))}
        </div>
      </div>

      {/* ===== 实时能耗告警 ===== */}
    <div className="bg-white rounded-xl border p-4">
    <h3 className="font-bold text-slate-700 mb-3">
        能耗异常与工单联动
    </h3>
    

         <div className="space-y-3">
            <EnergyAlarmItem
            level="red"
            text="西部充电站瞬时功率异常升高"
            target="西部充电站"
            time="10:18"
            />
            <EnergyAlarmItem
            level="amber"
            text="BRT 2号线用电量超出日均阈值"
            target="BRT 2号线"
            time="09:52"
            />
         </div>
      </div>
    </div>
  );
}

/* ================= 子组件 ================= */

function KpiCard({ title, value, unit, icon, color }) {
  const colorMap = {
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-2xl font-bold text-slate-700">
          {value}
          <span className="text-sm font-normal text-slate-400 ml-1">
            {unit}
          </span>
        </div>
      </div>

      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>
    </div>
  );
}

function EnergyRankItem({ name, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span>{name}</span>
        <span>{value} kWh</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${Math.min(value / 150, 100)}%` }}
        />
      </div>
    </div>
  );
}


function EnergyTrendPanel() {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-4">
      <h3 className="font-bold text-slate-700">
        用电趋势分析（近7日）
      </h3>

      {/* ① 趋势图区域 */}
      <div className="h-[220px]">
        <EnergyTrendChart />
      </div>

      {/* ② 分析解读 */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-slate-600 leading-relaxed">
        <div className="font-medium text-slate-700 mb-1">
          📌 关键洞察
        </div>
        近7日整体用电量呈上升趋势，周五达到峰值
        <span className="font-semibold text-slate-800"> 45,230 kWh</span>，
        局部时段存在阶段性异常。
        <br />
        建议重点关注：
        <span className="text-blue-600 font-medium">
          西部充电站、BRT 2号线
        </span>
      </div>

   
    </div>
  );
}


function EnergyStructurePanel() {
  return (
    <div className="bg-white rounded-xl border p-4 h-[260px]">
      <h3 className="font-bold text-slate-700 mb-3">
        能耗结构占比
      </h3>

      <EnergyStructureChart />
    </div>
  );
}


function BarItem({ name, value }) {
  const percent = Math.min(value / 150, 100);

  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span>{name}</span>
        <span>{value} kWh</span>
      </div>

      <div className="h-2 rounded bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function EnergyAlarmItem({ level, text, target, time }) {
  const levelMap = {
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
      <div className="flex items-start gap-3">
        <span
          className={`w-2 h-2 mt-1 rounded-full ${
            level === "red" ? "bg-red-500" : "bg-amber-500"
          }`}
        />
        <div>
          <div className="text-sm text-slate-700">{text}</div>
          <div className="text-xs text-slate-400">
            对象：{target} · {time}
          </div>
        </div>
      </div>

      <button
        className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => alert("已生成工单（示例）")}
      >
        生成工单
      </button>
    </div>
  );
}



function AlarmItem({ color, text, time }) {
  const dotColor = {
    red: "bg-red-500",
    amber: "bg-amber-500",
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50">
      <span
        className={`w-2 h-2 rounded-full ${dotColor[color]}`}
      />
      <div className="flex-1 text-sm text-slate-600">
        {text}
      </div>
      <div className="text-xs text-slate-400">{time}</div>
    </div>
  );
}
