import { useState } from "react";
import { Wrench } from "lucide-react";
import CreateRepairForm from "./CreateRepairForm";

export default function RepairManagementView() {
  const [mode, setMode] = useState("list"); // list | create

  if (mode === "create") {
    return <CreateRepairForm onCancel={() => setMode("list")} />;
  }

  return (
    <div className="bg-white rounded-xl border p-10 flex flex-col items-center justify-center text-center">
      <Wrench size={48} className="text-blue-400 mb-4" />

      <h2 className="text-lg font-semibold text-slate-700 mb-2">
        报修管理中心
      </h2>

      <p className="text-sm text-slate-400 mb-6">
        此处为报修入口与原始记录管理。<br />
        查看详细工单进度请前往“工单列表”。
      </p>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => setMode("create")}
      >
        + 新增报修
      </button>
    </div>
  );
}
