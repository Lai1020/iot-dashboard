import React, { useState } from "react";
import { Siren, Activity, AlertTriangle, Map, Video, ListTodo, Package } from "lucide-react";

export default function EmergencyCommandView() {
  const [activeIncident, setActiveIncident] = useState(null);

  const incidents = [
    {
      id: "EM-20240520-01",
      title: "71路车辆轻微擦碰",
      level: "IV级",
      loc: "延安西路江苏路路口",
      status: "active",
      time: "10:45",
      resources: ["交警已到场", "施救车在途"],
    },
    {
      id: "EM-20240519-03",
      title: "暴雨积水预警",
      level: "III级",
      loc: "全线低洼路段",
      status: "standby",
      time: "昨天 16:00",
      resources: ["防汛队待命"],
    },
  ];

  return (
    // ✅ 注意：这里已移除 -m-6，避免顶部标题被裁切
    <div className="space-y-6 animate-fade-in bg-slate-900 p-6 min-h-screen text-slate-100">
      {/* Top Header Row */}
      <div className="flex justify-between items-end border-b border-slate-700 pb-4 mb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Siren className="text-red-500 animate-pulse" size={32} />
            <span>应急指挥调度中心</span>
            <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-600">
              ECC - Emergency Command Center
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1 ml-11">实时监控 • 快速响应 • 统筹调度 • 数据决策</p>
        </div>
        <div className="flex gap-8 items-center">
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider">安全运行天数</p>
            <p className="text-3xl font-mono font-bold text-emerald-400">
              1,208 <span className="text-sm text-slate-500">天</span>
            </p>
          </div>
          <div className="h-10 w-px bg-slate-700"></div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider">当前响应等级</p>
            <p className="text-3xl font-bold text-blue-400">IV级</p>
          </div>
          <div className="h-10 w-px bg-slate-700"></div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider">当前时间</p>
            <p className="text-xl font-mono font-bold text-white">14:32:05</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        {/* Left Column: Metrics & Analysis */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Key Indicators */}
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex-1 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Activity size={16} /> 实时运行监测
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>在线车辆</span>
                  <span>98.2%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[98.2%] h-full bg-emerald-500"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>准点率</span>
                  <span>94.5%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[94.5%] h-full bg-blue-500"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>车厢拥挤度</span>
                  <span>42% (舒适)</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-emerald-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl h-1/3 flex flex-col">
            <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} /> 今日预警概况
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
              {[
                { type: "超速告警", count: 12 },
                { type: "胎压异常", count: 5 },
                { type: "疲劳驾驶", count: 2 },
                { type: "非站停靠", count: 8 },
              ].map((w, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-700/50 p-2 rounded">
                  <span className="text-xs text-slate-300">{w.type}</span>
                  <span className="text-xs font-bold text-slate-400">{w.count} 起</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Map */}
        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl relative overflow-hidden group shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
              <Map size={64} />
            </div>
            <div className="text-slate-500 font-mono text-sm">GIS 实时地图与车辆轨迹监控</div>
          </div>
          <div className="h-40 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-600"
              >
                <Video size={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Incident List */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-slate-800/50 border border-slate-700 p-0 rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ListTodo size={16} /> 突发事件列表
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
              {incidents.map((evt, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-600 bg-slate-700/50">
                  <h4 className="font-bold text-slate-200 mb-1">{evt.title}</h4>
                  <span className="text-xs text-slate-400">
                    {evt.status} | {evt.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl h-1/3 flex flex-col">
            <h3 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
              <Package size={16} /> 应急资源状态
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>应急救援车</span>
                <span className="text-emerald-400">5/5 待命</span>
              </div>
              <div className="flex justify-between">
                <span>防汛沙袋</span>
                <span className="text-emerald-400">充足</span>
              </div>
              <div className="flex justify-between">
                <span>融雪剂</span>
                <span className="text-emerald-400">充足</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
