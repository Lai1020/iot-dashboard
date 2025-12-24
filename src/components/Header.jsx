import React from "react";
import { Activity, Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center justify-between px-6 text-slate-800 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold">公交集团智能运维平台</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Intelligent Operation System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-9 pr-4 text-sm w-64 outline-none focus:border-blue-400"
            placeholder="全局搜索资产、工单..."
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-slate-50 text-slate-600">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
            <User size={18} />
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="text-sm font-bold">管理员</div>
            <div className="text-xs text-slate-500">运维指挥中心</div>
          </div>
        </div>
      </div>
    </header>
  );
}
