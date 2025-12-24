import React from "react";
import {
  Server,
  Activity,
  AlertTriangle,
  Wifi,
} from "lucide-react";


/** * 网络监控视图（UI骨架 + 拓扑态势）*/

function NetworkTopology() {
  const nodes = [
    { id: 1, x: 50, y: 30, label: "调度中心", status: "normal" },
    { id: 2, x: 30, y: 60, label: "BRT 1号线", status: "warning" },
    { id: 3, x: 70, y: 60, label: "车辆段 A", status: "alarm" },
  ];

  const links = [
    { from: 1, to: 2, status: "warning" },
    { from: 1, to: 3, status: "alarm" },
  ];

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-100">
      {/* 网格背景 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 链路 */}
      <svg className="absolute inset-0 w-full h-full">
        {links.map((l, i) => {
          const from = nodes.find(n => n.id === l.from);
          const to = nodes.find(n => n.id === l.to);
          const color =
            l.status === "alarm"
              ? "#ef4444"
              : l.status === "warning"
              ? "#f59e0b"
              : "#10b981";

          return (
            <line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={color}
              strokeWidth="3"
            />
          );
        })}
      </svg>

      {/* 节点 */}
      {nodes.map((n) => (
        <NetworkNode key={n.id} {...n} />
      ))}
    </div>
  );
}

function NetworkNode({ x, y, label, status }) {
  const colorMap = {
    normal: "bg-emerald-500",
    warning: "bg-amber-500",
    alarm: "bg-red-500 animate-pulse",
  };

  return (
    <div
      className="absolute group"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={`w-4 h-4 rounded-full ${colorMap[status]} shadow-lg`} />
      <div className="absolute left-5 top-1 hidden group-hover:block bg-white text-xs px-2 py-1 rounded shadow whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

function KpiCard({ title, value, unit, icon, color }) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
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
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
}

function NodeCard({ name, status, delay, loss }) {
  const statusMap = {
    normal: "text-emerald-600",
    warning: "text-amber-600",
    alarm: "text-red-600",
  };

  return (
    <div className="p-3 rounded-lg bg-slate-50">
      <div className="flex justify-between items-center">
        <span className="font-medium text-slate-700">{name}</span>
        <span className={`text-xs font-bold ${statusMap[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div className="text-xs text-slate-500 mt-1">
        延迟：{delay} ｜ 丢包：{loss}
      </div>
    </div>
  );
}

function EventItem({ level, text, time, impact }) {
  const levelMap = {
    normal: "bg-emerald-500",
    warning: "bg-amber-500",
    alarm: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50">
      <span className={`w-2 h-2 rounded-full ${levelMap[level]}`} />
      <div className="flex-1 text-sm text-slate-600">
        {text}
        <span className="ml-2 text-xs text-slate-400">
          影响：{impact}
        </span>
      </div>
      <div className="text-xs text-slate-400">{time}</div>
    </div>
  );
}



export default function NetworkMonitorView() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* ================= KPI 总览 ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard title="在线网络节点" value="286" unit="个" icon={<Server />} color="emerald" />
        <KpiCard title="网络健康度" value="97.2" unit="%" icon={<Activity />} color="blue" />
        <KpiCard title="关键链路异常" value="2" unit="条" icon={<AlertTriangle />} color="amber" />
        <KpiCard title="今日网络告警" value="5" unit="条" icon={<Wifi />} color="red" />
      </div>

      {/* ================= 拓扑 + 节点 ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 网络态势 */}
        <div className="xl:col-span-2 bg-white rounded-xl border p-4 h-[420px] relative">
          <h3 className="font-bold text-slate-700 mb-2">
            网络运行态势（逻辑拓扑）
          </h3>

          <NetworkTopology />

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white">
              实时态势
            </button>
            <button className="px-3 py-1 text-xs rounded-md bg-white border">
              历史回放
            </button>
          </div>
        </div>

        {/* 核心节点 */}
        <div className="bg-white rounded-xl border p-4">
          <h3 className="font-bold text-slate-700 mb-3">
            核心网络节点
          </h3>

          <div className="space-y-3">
            <NodeCard name="调度中心核心交换机" status="normal" delay="12ms" loss="0%" />
            <NodeCard name="BRT 1号线通信节点" status="warning" delay="68ms" loss="0.8%" />
            <NodeCard name="车辆段 A 汇聚网关" status="alarm" delay="--" loss="100%" />
          </div>
        </div>
      </div>

      {/* ================= 网络事件 ================= */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-bold text-slate-700 mb-3">
          网络事件与链路异常
        </h3>

        <div className="space-y-2">
          <EventItem level="alarm" text="车辆段 A 网络链路中断" time="10:36" impact="视频、调度" />
          <EventItem level="warning" text="BRT 1号线通信延迟升高" time="10:12" impact="实时定位" />
          <EventItem level="normal" text="调度中心出口抖动恢复" time="09:40" impact="无" />
        </div>
      </div>
    </div>
  );
}
