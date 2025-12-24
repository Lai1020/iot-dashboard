import React from "react";
import { ArrowRightLeft, FileDown } from "lucide-react";

export default function AssetTransferRecordView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ===== 顶部筛选 ===== */}
      <div className="bg-white rounded-xl border p-4 flex items-center justify-between gap-4">
        <div className="flex gap-3 flex-1">
          <input
            className="flex-1 border rounded-md px-3 py-2 text-sm"
            placeholder="输入资产编码 / 名称 / RFID"
          />
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>全部类型</option>
            <option>车载设备</option>
            <option>IT 设备</option>
            <option>场站设备</option>
          </select>
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>全部状态</option>
            <option>已完成</option>
            <option>移交中</option>
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
          <FileDown size={14} />
          导出报表
        </button>
      </div>

      {/* ===== 移交记录表 ===== */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">资产编码</th>
              <th className="px-4 py-3 text-left">资产名称</th>
              <th className="px-4 py-3 text-left">移交路径</th>
              <th className="px-4 py-3 text-left">责任人</th>
              <th className="px-4 py-3 text-left">SLA</th>
              <th className="px-4 py-3 text-left">移交时间</th>
              <th className="px-4 py-3 text-left">状态</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {mockTransfers.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-blue-600">
                  {item.code}
                </td>
                <td className="px-4 py-3">
                  {item.name}
                </td>
                <td className="px-4 py-3">
                  <TransferPath from={item.from} to={item.to} />
                </td>
                <td className="px-4 py-3">
                  {item.owner}
                </td>
                <td className="px-4 py-3">
                  {item.sla}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {item.time}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xs text-slate-400 text-center py-3">
          共 {mockTransfers.length} 条资产移交记录
        </div>
      </div>
    </div>
  );
}

/* ================= 子组件 ================= */

function TransferPath({ from, to }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <span>{from}</span>
      <ArrowRightLeft size={14} />
      <span>{to}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    done: "bg-emerald-50 text-emerald-600",
    processing: "bg-amber-50 text-amber-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${map[status]}`}
    >
      {status === "done" ? "已完成" : "移交中"}
    </span>
  );
}

/* ================= Mock 数据 ================= */

const mockTransfers = [
  {
    id: 1,
    code: "ZC-2023-001",
    name: "纯电动客车（12m）",
    from: "库存中心",
    to: "客运一部",
    owner: "张三",
    sla: "一级响应（30min）",
    time: "2024-03-12 10:42",
    status: "done",
  },
  {
    id: 2,
    code: "ZC-2024-022",
    name: "手持 POS 终端",
    from: "库存中心",
    to: "信息部",
    owner: "李四",
    sla: "普通设备 SLA",
    time: "2024-03-18 14:10",
    status: "processing",
  },
];
