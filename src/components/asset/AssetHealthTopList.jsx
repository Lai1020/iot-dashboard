import React from "react";

const list = [
  {
    score: 62,
    name: "纯电动客车（宇通）",
    desc: "发动机异常震动",
    code: "BUS-8821",
    dept: "营运一部",
  },
  {
    score: 68,
    name: "智能闸机 #02",
    desc: "响应延迟 > 3s",
    code: "DEV-Gate-02",
    dept: "信息部",
  },
  {
    score: 71,
    name: "配电箱 A1",
    desc: "温度持续偏高",
    code: "PWR-Box-A1",
    dept: "基建部",
  },
  {
    score: 74,
    name: "纯电动客车（比亚迪）",
    desc: "续航衰减明显",
    code: "BUS-9901",
    dept: "营运二部",
  },
  {
    score: 78,
    name: "核心数据库服务器",
    desc: "磁盘 IO 告警",
    code: "SRV-Main-01",
    dept: "信息部",
  },
];

export default function AssetHealthTopList() {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-slate-700">
          资产健康预警（Top 5 低分）
        </h3>
        <span className="text-sm text-blue-600 cursor-pointer">
          查看全部
        </span>
      </div>

      <div className="space-y-3">
        {list.map((item) => (
          <div
            key={item.code}
            className="flex items-center gap-4 p-3 rounded-lg bg-slate-50"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
              {item.score}
            </div>

            <div className="flex-1">
              <div className="font-medium text-slate-700">
                {item.name}
              </div>
              <div className="text-xs text-slate-400">
                {item.desc}
              </div>
            </div>

            <div className="text-xs text-slate-400 text-right">
              <div>{item.code}</div>
              <div>{item.dept}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
