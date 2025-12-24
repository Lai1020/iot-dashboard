import React, { useState } from "react";
import {
  QrCode,
  ClipboardList,
  Repeat,
} from "lucide-react";

import InventoryInboundPanel from "./inventory/InventoryInboundPanel";
import InventoryOutboundPanel from "./inventory/InventoryOutboundPanel";
import InventoryTransferPanel from "./inventory/InventoryTransferPanel";

export default function AssetInventoryCenterView() {
  const [activeTab, setActiveTab] = useState("inbound");

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ===== 顶部功能切换 ===== */}
      <div className="bg-white rounded-xl border p-2 flex gap-2">
        <TabButton
          active={activeTab === "inbound"}
          icon={<QrCode size={16} />}
          text="资产入库与赋码"
          onClick={() => setActiveTab("inbound")}
        />
        <TabButton
          active={activeTab === "outbound"}
          icon={<ClipboardList size={16} />}
          text="领用出库与 SLA 定义"
          onClick={() => setActiveTab("outbound")}
        />
        <TabButton
          active={activeTab === "transfer"}
          icon={<Repeat size={16} />}
          text="资产移交与合同清单"
          onClick={() => setActiveTab("transfer")}
        />
      </div>

      {/* ===== 内容区 ===== */}
      {activeTab === "inbound" && <InventoryInboundPanel />}
      {activeTab === "outbound" && <InventoryOutboundPanel />}
      {activeTab === "transfer" && <InventoryTransferPanel />}
    </div>
  );
}

/* ===== Tab 按钮 ===== */

function TabButton({ active, icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          active
            ? "bg-blue-600 text-white shadow"
            : "bg-white text-slate-600 hover:bg-slate-50"
        }`}
    >
      {icon}
      {text}
    </button>
  );
}






