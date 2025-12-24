import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { MENU_STRUCTURE } from "./data/menu";

// Views (flat)
import CockpitIntegratedView from "./views/cockpit/CockpitIntegratedView";
import AssetOverviewView from "./views/asset/AssetOverviewView";
import AssetView from "./views/asset/AssetView";
import AssetInventoryCenterView from "./views/asset/AssetInventoryCenterView";
import AssetTransferRecordView from "./views/asset/AssetTransferRecordView";
import WorkOrderOverviewView from "./views/workorder/WorkOrderOverviewView";
import WorkOrderListView from "./views/WorkOrderListView";
import RepairManagementView from "./views/Repairmanagement/RepairManagementView";
import InspectionPlanView from "./views/InspectionPlanView";
import CostCalcView from "./views/cost/CostCalcView";
import DecisionSupportView from "./views/DecisionSupportView";
import AssetProfileView from "./views/asset/AssetProfileView";
import NetworkMonitorView  from "./views/Cockpit/NetworkMonitorView";
import EnergyMonitorView from "./views/Cockpit/EnergyMonitorView";


// Views (nested folders)
import EmergencyCommandView from "./views/Emergency/EmergencyCommandView";
import EmergencyRiskView from "./views/Emergency/EmergencyRiskView";
import EmergencyPlanView from "./views/Emergency/EmergencyPlanView";
import EmergencyResourcesView from "./views/Emergency/EmergencyResourcesView";
import SecurityManagementView from "./views/Special/SecurityManagementView";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("emergency-command");
  const [expandedMenus, setExpandedMenus] = useState(["emergency", "special"]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  const renderContent = () => {
    if (selectedAssetId) {
      return <AssetProfileView assetId={selectedAssetId} onBack={() => setSelectedAssetId(null)} />;
    }

    if (activeMenu === "cockpit-integrated") return <CockpitIntegratedView />;

   
    if (activeMenu === "asset-overview") return <AssetOverviewView />;
    // if (activeMenu.startsWith("asset")) return <AssetView onSelectAsset={setSelectedAssetId} />;
    if (activeMenu === "asset-list") return <AssetView />;
    if (activeMenu === "asset-inventory") return <AssetInventoryCenterView />;
    if (activeMenu === "asset-transfer") return <AssetTransferRecordView />;

    if (activeMenu === "wo-overview") return <WorkOrderOverviewView />;
    if (activeMenu === "wo-list") return <WorkOrderListView />;
    if (activeMenu === "wo-repair") return <RepairManagementView />;
    if (activeMenu === "wo-inspection") return <InspectionPlanView />;

    if (activeMenu === "cost-calc") return <CostCalcView />;

    if (activeMenu.startsWith("decision")) return <DecisionSupportView />;

    if (activeMenu === "special-security") return <SecurityManagementView />;

    if (activeMenu === "emergency-command") return <EmergencyCommandView />;
    if (activeMenu === "emergency-risk") return <EmergencyRiskView />;
    if (activeMenu === "emergency-plan") return <EmergencyPlanView />;
    if (activeMenu === "emergency-resources") return <EmergencyResourcesView />;

    if (activeMenu === "cockpit-network") return <NetworkMonitorView />;
    if (activeMenu === "cockpit-energy") return <EnergyMonitorView />;
  };

  const breadcrumbParentTitle =
    MENU_STRUCTURE.find((m) => m.children?.some((c) => c.id === activeMenu))?.title ||
    MENU_STRUCTURE.find((m) => m.id === activeMenu.split("-")[0])?.title ||
    "当前模块";

  const breadcrumbChildTitle =
    selectedAssetId
      ? "全息画像"
      : MENU_STRUCTURE.flatMap((m) => m.children || []).find((c) => c.id === activeMenu)?.title ||
        "详情";

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-600 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-800">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>

      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={(menu) => {
            setActiveMenu(menu);
            setSelectedAssetId(null);
          }}
          expandedMenus={expandedMenus}
          toggleMenu={toggleMenu}
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 relative">
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
              <span className="hover:text-slate-600 cursor-pointer">首页</span>
              <ChevronRight size={12} />
              <span className="text-blue-600 font-bold">{breadcrumbParentTitle}</span>
              <ChevronRight size={12} />
              <span className="text-slate-600">{breadcrumbChildTitle}</span>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
