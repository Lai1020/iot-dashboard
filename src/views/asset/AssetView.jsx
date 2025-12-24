import React from "react";
import { Search } from "lucide-react";

/* ================= 主视图 ================= */

export default function AssetView({ onSelectAsset }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ===== 筛选区 ===== */}
      <FilterBar />

      {/* ===== 资产表格 ===== */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <Th>资产编码</Th>
              <Th>资产名称</Th>
              <Th>供应商</Th>
              <Th>购入日期</Th>
              <Th>全生命周期状态</Th>
              <Th>预计寿命</Th>
              <Th>残值</Th>
              <Th>操作</Th>
            </tr>
          </thead>

          <tbody>
            {ASSETS.map((item) => (
              <AssetRow
                key={item.id}
                data={item}
                onView={() => onSelectAsset(item.id)}
              />
            ))}
          </tbody>
        </table>

        {/* ===== 表尾 ===== */}
        <div className="text-center text-xs text-slate-400 py-3 bg-slate-50">
          显示 4 条，共 2,304 条资产记录
        </div>
      </div>
    </div>
  );
}

/* ================= 子组件 ================= */

function FilterBar() {
  return (
    <div className="bg-white rounded-xl border p-4 flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-slate-500">
        <Search size={14} />
        <input
          className="outline-none w-48"
          placeholder="输入资产编码 / RFID"
        />
      </div>

      <select className="border rounded-lg px-3 py-2 text-sm text-slate-600">
        <option>全部类型</option>
        <option>营运车辆</option>
        <option>IT 设备</option>
        <option>场站设施</option>
      </select>

      <select className="border rounded-lg px-3 py-2 text-sm text-slate-600">
        <option>状态：全部</option>
        <option>运营中</option>
        <option>维护中</option>
        <option>库存</option>
      </select>

      <div className="ml-auto flex gap-2">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm">
          资产移交入库
        </button>
        <button className="px-4 py-2 rounded-lg border text-sm text-slate-600">
          导出报表
        </button>
      </div>
    </div>
  );
}

/* ===== 表头 ===== */
function Th({ children }) {
  return <th className="px-4 py-3 text-left font-medium">{children}</th>;
}

/* ===== 表行 ===== */
function AssetRow({ data, onView }) {
  return (
    <tr className="border-t hover:bg-slate-50">
      <Td className="text-blue-600">{data.code}</Td>
      <Td>
        <div className="font-medium">{data.name}</div>
        <div className="text-xs text-slate-400">{data.spec}</div>
      </Td>
      <Td>{data.vendor}</Td>
      <Td>{data.date}</Td>
      <Td>
        <StatusTag status={data.status} />
      </Td>
      <Td>
        <LifeBar value={data.life} />
      </Td>
      <Td>¥{data.value.toLocaleString()}</Td>
      <Td>
        <button
          className="text-blue-600 text-xs border px-2 py-1 rounded"
          onClick={onView}
        >
          全息画像
        </button>
      </Td>
    </tr>
  );
}

function Td({ children, className }) {
  return (
    <td className={`px-4 py-3 text-slate-700 ${className || ""}`}>
      {children}
    </td>
  );
}

/* ===== 状态标签 ===== */
function StatusTag({ status }) {
  const map = {
    运营中: "bg-emerald-50 text-emerald-600",
    维护中: "bg-amber-50 text-amber-600",
    库存: "bg-slate-100 text-slate-500",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${map[status]}`}>
      {status}
    </span>
  );
}

/* ===== 寿命进度 ===== */
function LifeBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-slate-100 rounded overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-slate-500">{value}%</span>
    </div>
  );
}

/* ================= 模拟数据 ================= */

const ASSETS = [
  {
    id: "1",
    code: "ZC-2023-001",
    name: "纯电动客车",
    spec: "12m",
    vendor: "宇通客车",
    date: "2023-01-15",
    status: "运营中",
    life: 88,
    value: 850000,
  },
  {
    id: "2",
    code: "ZC-2023-005",
    name: "自动洗车机",
    spec: "",
    vendor: "海德森",
    date: "2022-11-20",
    status: "维护中",
    life: 76,
    value: 120000,
  },
  {
    id: "3",
    code: "ZC-2021-112",
    name: "IT服务器机柜",
    spec: "",
    vendor: "华为",
    date: "2021-06-10",
    status: "运营中",
    life: 65,
    value: 45000,
  },
  {
    id: "4",
    code: "ZC-2024-022",
    name: "手持POS终端",
    spec: "",
    vendor: "雄帝科技",
    date: "2024-03-01",
    status: "库存",
    life: 100,
    value: 2500,
  },
];
