import React, { useState } from "react";
import {
  ArrowLeft,
  FileDown,
  Edit,
  BatteryCharging,
  MapPin,
} from "lucide-react";

export default function AssetProfileView() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ===== 顶部操作栏 ===== */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} />
          返回资产列表
        </button>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm rounded-md border bg-white">
            <FileDown size={14} className="inline mr-1" />
            导出档案 PDF
          </button>
          <button className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white">
            <Edit size={14} className="inline mr-1" />
            编辑信息
          </button>
        </div>
      </div>

      {/* ===== 主体 ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* ===== 左侧资产身份 ===== */}
        <div className="space-y-4">
            <AssetBaseCard />
            <AssetHealthCard />
        </div>

        {/* ===== 右侧内容 ===== */}
        <div className="xl:col-span-3 space-y-4">
        <AssetTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" && <AssetOverviewTab />}
        {activeTab === "maintenance" && <MaintenanceTab />}
        {activeTab === "bom" && <BomTab />}
        {activeTab === "tco" && <TcoTab />}
        {activeTab === "iot" && <IotTab />}
        </div>
      </div>
    </div>
  );
}

function AssetBaseCard() {
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      {/* 图标 + 状态 */}
      <div className="flex items-center justify-between">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
          🚍
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600">
          运营中
        </span>
      </div>

      {/* 标题 */}
      <div>
        <div className="text-lg font-bold text-slate-800">
          纯电动客车（12m）
        </div>
        <div className="text-xs text-slate-400">
          ZC-2023-001 · 自编号 88291
        </div>
      </div>

      {/* 基础信息 */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <InfoItem label="品牌 / 型号" value="宇通 / ZK6120" />
        <InfoItem label="所属部门" value="客运一部" />
        <InfoItem label="启用日期" value="2023-01-15" />
        <InfoItem label="保修截止" value="2028-01-14" />
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className="font-medium text-slate-700">{value}</div>
    </div>
  );
}

function AssetHealthCard() {
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col items-center">
      <div className="text-sm text-slate-500 mb-3">
        资产健康指数（AHI）
      </div>

      <div className="w-28 h-28 rounded-full border-[8px] border-blue-500 flex items-center justify-center">
        <div className="text-3xl font-bold text-blue-600">92</div>
      </div>

      <div className="text-xs text-slate-400 mt-2">
        满分 100
      </div>
    </div>
  );
}

function BatteryStatusCard() {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium text-slate-700">
          ⚡ 实时动力电池
        </div>
        <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-600">
          充电中
        </span>
      </div>

      <div className="text-3xl font-bold text-slate-800">
        88%
      </div>

      <div className="h-2 bg-slate-100 rounded">
        <div className="h-full bg-amber-400 rounded" style={{ width: "88%" }} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div>总电压：580V</div>
        <div>电流：120A</div>
        <div>最高温度：32℃</div>
        <div>SOH：98%</div>
      </div>
    </div>
  );
}


function LifeCycleTimeline() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="font-medium text-slate-700 mb-3">
        ⏱ 近期全生命周期大事记
      </div>

      <div className="space-y-4 border-l-2 border-slate-100 pl-4">
        <TimelineItem
          title="季度例行保养（一级）"
          desc="更换齿轮油，检查制动系统"
          date="2023-10-15"
        />
        <TimelineItem
          title="车辆保险续期"
          desc="保单号：2023-PA-882"
          date="2023-09-02"
        />
      </div>
    </div>
  );
}

function TimelineItem({ title, desc, date }) {
  return (
    <div className="relative">
      <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-blue-500" />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
      <div className="text-xs text-slate-400 mt-1">{date}</div>
    </div>
  );
}


import mapImg from "../../assets/maps/city-route.png";


function LocationCard() {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-3">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="font-medium text-slate-700 flex items-center gap-2">
          <MapPin size={16} />
          实时位置与里程
        </div>
        <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-500">
          GPS：强
        </span>
      </div>

      {/* 地图 */}
      <div className="relative h-[160px] rounded-lg overflow-hidden bg-slate-100">
        <img
          src={mapImg}
          alt="map"
          className="w-full h-full object-cover opacity-90"
        />

        {/* 行驶轨迹 */}
        <svg className="absolute inset-0">
          <path
            d="M20 120 Q120 40 260 80"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="6 4"
          />
        </svg>

        {/* 定位点 */}
        <div className="absolute left-[65%] top-[45%]">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping absolute" />
          <div className="w-3 h-3 bg-blue-600 rounded-full relative" />
        </div>
      </div>

      {/* 里程 */}
      <div className="flex justify-between text-sm text-slate-600">
        <div>今日里程：<span className="font-medium">128 km</span></div>
        <div>总里程：<span className="font-medium">45.2k km</span></div>
      </div>
    </div>
  );
}


function AssetTabs({ active, onChange }) {
  const tabs = [
    { key: "overview", label: "全息概览" },
    { key: "maintenance", label: "维修履历" },
    { key: "bom", label: "零部件 BOM" },
    { key: "tco", label: "TCO 成本" },
    { key: "iot", label: "物联数据" },
  ];

  return (
    <div className="bg-white rounded-xl border px-4">
      <div className="flex gap-6 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`py-3 border-b-2 transition ${
              active === tab.key
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AssetOverviewTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BatteryStatusCard />
        <LocationCard />
      </div>

      <LifeCycleTimeline />
    </div>
  );
}

function MaintenanceTab() {
  return (
    <Placeholder title="维修履历">
      这里将展示维修记录时间轴 / 工单列表
    </Placeholder>
  );
}

function BomTab() {
  return (
    <Placeholder title="零部件 BOM">
      这里将展示资产零部件结构树
    </Placeholder>
  );
}

function TcoTab() {
  return (
    <Placeholder title="TCO 成本">
      这里将展示采购、运维、能耗、折旧等成本分析
    </Placeholder>
  );
}

function IotTab() {
  return (
    <Placeholder title="物联数据">
      这里将展示实时 / 历史传感器数据
    </Placeholder>
  );
}

function Placeholder({ title, children }) {
  return (
    <div className="bg-white rounded-xl border p-6 text-slate-500 text-sm">
      <div className="font-medium text-slate-700 mb-2">{title}</div>
      {children}
    </div>
  );
}






