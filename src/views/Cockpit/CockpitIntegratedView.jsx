import React from "react";
import {
  Cpu,
  Zap,
  Wrench,
  AlertTriangle,
  Video,
} from "lucide-react";

import HealthStatusPanel from "../../components/cockpit/HealthStatusPanel";
import AlarmLevelPanel from "../../components/cockpit/AlarmLevelPanel";


          {/* 地图占位 */}
       // ① 先定义函数（在组件 return 外面）
function FakeGISMap() {
  const points = [
    { id: 1, x: 20, y: 30, status: "normal", label: "BRT 1号线站点" },
    { id: 2, x: 55, y: 45, status: "normal", label: "车辆段 A" },
    { id: 3, x: 70, y: 65, status: "alarm", label: "充电站异常" },
    { id: 4, x: 35, y: 60, status: "warning", label: "配电箱温度偏高" },
  ];

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-100">
      {/* 地图底纹 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom,rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 区域名称 */}
      <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-medium text-slate-600">
        主城区 · BRT 1号线
      </div>

      {/* 设备点位 */}
      {points.map((p) => (
        <MapPoint key={p.id} {...p} />
      ))}
    </div>
  );
}

// ② 点位组件
function MapPoint({ x, y, status, label }) {
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
      <div
        className={`w-3 h-3 rounded-full ${colorMap[status]} shadow-lg`}
      />

      <div className="absolute left-4 top-1 hidden group-hover:block bg-white text-xs text-slate-600 px-2 py-1 rounded shadow whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}


export default function CockpitIntegratedView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ===== KPI 总览 ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          title="在线设备总数"
          value="12,845"
          unit="个"
          icon={<Cpu />}
          color="emerald"
        />
        <KpiCard
          title="今日能耗"
          value="45,230"
          unit="kWh"
          icon={<Zap />}
          color="amber"
        />
        <KpiCard
          title="活跃工单"
          value="142"
          unit="单"
          icon={<Wrench />}
          color="blue"
        />
        <KpiCard
          title="紧急告警"
          value="3"
          unit="条"
          icon={<AlertTriangle />}
          color="red"
        />
      </div>

      {/* ===== 健康态势 + 告警结构 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <HealthStatusPanel />
        <AlarmLevelPanel />
      </div>

      {/* ===== GIS + 右侧监控区 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* GIS 区域 */}
       <div className="xl:col-span-2 bg-white rounded-xl border p-4 h-[420px] relative">
        <h3 className="font-bold text-slate-700 mb-2">
          区域监控态势（GIS）
        </h3>

        <FakeGISMap />

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white">
            实时追踪
          </button>
          <button className="px-3 py-1 text-xs rounded-md bg-white border">
            历史回放
          </button>
        </div>
      </div>

        {/* 右侧：重点区域 / 视频 */}
        <div className="bg-white rounded-xl border p-4">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Video size={16} />
            重点区域监控
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {["摄像头 1", "摄像头 2", "摄像头 3", "摄像头 4"].map(
              (name) => (
                <div
                  key={name}
                  className="relative h-24 rounded-lg bg-slate-900 flex items-center justify-center text-slate-300 text-xs"
                >
                  {name}
                  <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                    Live
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== 实时告警列表 ===== */}
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-bold text-slate-700 mb-3">实时告警</h3>

        <div className="space-y-2">
          <AlarmItem
            color="red"
            text="3号场站配电箱温度异常"
            time="10:42"
          />
          <AlarmItem
            color="amber"
            text="公交车沪A-88291 胎压告警"
            time="10:38"
          />
          <AlarmItem
            color="blue"
            text="5号门禁系统离线"
            time="10:15"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= 子组件 ================= */

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

      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>
    </div>
  );
}

function AlarmItem({ color, text, time }) {
  const dotColor = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
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
