import React, { useState } from "react";
import CostStructureChart from "../../components/cost/CostStructureChart";
import DepartmentCostChart from "../../components/cost/DepartmentCostChart";
import {
  Clock,
  BarChart3,
  FileText,
  ShieldCheck,
  Package,
  User,
  Zap,
} from "lucide-react";

export default function CostCalcView() {
  const [activeTab, setActiveTab] = useState("analysis");

  /* ================= mock 数据 ================= */
  const [ledger, setLedger] = useState([
    {
      id: "C-001",
      date: "2024-05-20",
      type: "人工服务",
      item: "维修工时费",
      ref: "WO-20240520-001",
      dept: "客运一部",
      amount: 450,
    },
    {
      id: "C-002",
      date: "2024-05-20",
      type: "物料消耗",
      item: "机油滤芯",
      ref: "WO-20240520-001",
      dept: "客运一部",
      amount: 120,
    },
    {
      id: "C-003",
      date: "2024-05-19",
      type: "运营能耗",
      item: "车辆充电电费",
      ref: "71路-沪A99821",
      dept: "客运一部",
      amount: 85.5,
    },
    {
      id: "C-004",
      date: "2024-05-19",
      type: "资产折旧",
      item: "月度折旧",
      ref: "71路-沪A99821",
      dept: "财务部",
      amount: 2100,
    },
  ]);

  const [approvals, setApprovals] = useState([
    {
      id: "AP-202405-001",
      title: "额外服务费",
      reason: "夜间紧急抢修工时补贴",
      amount: 3500,
      status: "pending",
    },
    {
      id: "AP-202405-002",
      title: "大额备件采购",
      reason: "更换进口变频器组件",
      amount: 12800,
      status: "pending",
    },
  ]);


  /* ================= KPI 计算 ================= */
  const total = ledger.reduce((s, i) => s + i.amount, 0);
  const material = ledger.filter(i => i.type === "物料消耗").reduce((s, i) => s + i.amount, 0);
  const labor = ledger.filter(i => i.type === "人工服务").reduce((s, i) => s + i.amount, 0);
  const energy = ledger.filter(i =>
    i.type === "运营能耗" || i.type === "资产折旧"
  ).reduce((s, i) => s + i.amount, 0);



  /*========图标调用==========*/
  const costStructureData = [
  { value: material, name: "物料消耗" },
  { value: labor, name: "人工服务" },
  { value: energy, name: "能耗与折旧" },
];

const departmentCostData = [
  { name: "客运一部", value: 152000 },
  { name: "客运二部", value: 128000 },
  { name: "维修中心", value: 85000 },
  { name: "信息技术部", value: 52000 },
  { name: "行政后勤", value: 35000 },
];

  /* ================= 审批逻辑 ================= */
  const approve = (id) => {
    const target = approvals.find(a => a.id === id);
    if (!target) return;

    setLedger(prev => [
      ...prev,
      {
        id: `C-${Date.now()}`,
        date: "2024-05-21",
        type: "审批费用",
        item: target.title,
        ref: id,
        dept: "相关部门",
        amount: target.amount,
      },
    ]);

    setApprovals(prev =>
      prev.map(a => a.id === id ? { ...a, status: "approved" } : a)
    );
  };

  const reject = (id) => {
    setApprovals(prev =>
      prev.map(a => a.id === id ? { ...a, status: "rejected" } : a)
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ================= 功能 Tab（核心） ================= */}
      <div className="flex bg-white rounded-xl border p-1 w-fit">
        <TabButton
          active={activeTab === "analysis"}
          onClick={() => setActiveTab("analysis")}
          icon={<BarChart3 size={16} />}
          label="成本统计与分析"
        />
        <TabButton
          active={activeTab === "ledger"}
          onClick={() => setActiveTab("ledger")}
          icon={<FileText size={16} />}
          label="全成本核算台账"
        />
        <TabButton
          active={activeTab === "approval"}
          onClick={() => setActiveTab("approval")}
          icon={<ShieldCheck size={16} />}
          label="费用审批控制台"
        />
      </div>

      {/* ================= Tab 内容 ================= */}

      {/* —— 成本统计与分析 —— */}
      {activeTab === "analysis" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPI label="本月总成本" value={total} icon={<Clock />} />
            <KPI label="物料消耗" value={material} icon={<Package />} />
            <KPI label="人工服务费" value={labor} icon={<User />} />
            <KPI label="能耗与摊销" value={energy} icon={<Zap />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CostStructureChart data={costStructureData} />
            <DepartmentCostChart data={departmentCostData} />
        </div>
        </div>
      )}

      {/* —— 全成本核算台账 —— */}
      {activeTab === "ledger" && (
        <div className="bg-white rounded-xl border">
          <div className="p-4 font-bold">全成本核算台账</div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-3 text-left">记账日期</th>
                <th className="p-3">费用类型</th>
                <th className="p-3">明细项目</th>
                <th className="p-3">关联对象</th>
                <th className="p-3">归属部门</th>
                <th className="p-3 text-right">金额 (¥)</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map(row => (
                <tr key={row.id} className="border-t">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.type}</td>
                  <td className="p-3">{row.item}</td>
                  <td className="p-3 text-blue-600">{row.ref}</td>
                  <td className="p-3">{row.dept}</td>
                  <td className="p-3 text-right font-bold">{row.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* —— 费用审批控制台 —— */}
      {activeTab === "approval" && (
        <div className="bg-white rounded-xl border p-4 space-y-4">
          {approvals.map(ap => (
            <div key={ap.id} className="flex justify-between items-center border rounded-lg p-3">
              <div>
                <p className="font-bold">{ap.title}</p>
                <p className="text-xs text-slate-500">{ap.reason}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-lg">¥ {ap.amount.toLocaleString()}</span>

                {ap.status === "pending" && (
                  <>
                    <button onClick={() => reject(ap.id)} className="px-3 py-1 border rounded text-sm">
                      驳回
                    </button>
                    <button onClick={() => approve(ap.id)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                      批准
                    </button>
                  </>
                )}

                {ap.status === "approved" && (
                  <span className="text-green-600 font-bold">已批准</span>
                )}
                {ap.status === "rejected" && (
                  <span className="text-red-500 font-bold">已驳回</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= 子组件 ================= */

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
        ${active ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
    >
      {icon}
      {label}
    </button>
  );
}

function KPI({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border p-4 flex justify-between">
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-blue-600">
          ¥ {value.toLocaleString()}
        </p>
      </div>
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">{icon}</div>
    </div>
  );
}
