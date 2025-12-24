import React from "react";
import {
  Eye,
  User,
  Flame,
  Users2,
  Thermometer,
  Shield,
  Truck,
  Video,
  MapPin,
  Clock,
} from "lucide-react";

export default function EmergencyRiskView() {
  const risks = [
    {
      id: "R-001",
      type: "行为识别",
      title: "驾驶员疲劳/分神",
      loc: "71路-沪A99821",
      time: "10:42:05",
      level: "高",
      img: "bg-slate-800",
      icon: User,
    },
    {
      id: "R-002",
      type: "环境监测",
      title: "配电房烟雾预警",
      loc: "申昆路停车场-B区",
      time: "10:41:30",
      level: "高",
      img: "bg-slate-700",
      icon: Flame,
    },
    {
      id: "R-003",
      type: "客流分析",
      title: "站台客流超载",
      loc: "外滩终点站",
      time: "10:35:12",
      level: "中",
      img: "bg-slate-600",
      icon: Users2,
    },
    {
      id: "R-004",
      type: "设备诊断",
      title: "制动系统温度异常",
      loc: "48路-沪B22109",
      time: "10:20:00",
      level: "中",
      img: "bg-slate-800",
      icon: Thermometer,
    },
    {
      id: "R-005",
      type: "违规行为",
      title: "未佩戴安全带",
      loc: "911路-沪A77651",
      time: "09:15:45",
      level: "低",
      img: "bg-slate-700",
      icon: Shield,
    },
    {
      id: "R-006",
      type: "车辆状态",
      title: "胎压过低告警",
      loc: "123路-沪C33211",
      time: "08:50:22",
      level: "低",
      img: "bg-slate-600",
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Eye className="text-red-500" /> 危险源智能识别监控
        </h2>

        <div className="flex gap-3">
          <div className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            高风险源: 2
          </div>

          <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-bold border border-orange-100">
            中风险源: 5
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {risks.map((risk) => {
          const Icon = risk.icon;

          const levelCls =
            risk.level === "高"
              ? "bg-red-500 animate-pulse"
              : risk.level === "中"
              ? "bg-orange-500"
              : "bg-blue-500";

          return (
            <div
              key={risk.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`h-40 ${risk.img} relative flex items-center justify-center`}>
                <div className="text-white/20">
                  <Video size={48} />
                </div>

                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded">
                  AI 置信度: 98%
                </div>

                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold text-white ${levelCls}`}>
                  {risk.level}风险
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {risk.type}
                    </span>
                    <h4 className="font-bold text-slate-800">{risk.title}</h4>
                  </div>
                  <Icon className="text-slate-300" size={20} />
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {risk.loc}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {risk.time}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">
                    查看回放
                  </button>
                  <button className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 text-xs font-bold hover:bg-red-100">
                    生成工单
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
