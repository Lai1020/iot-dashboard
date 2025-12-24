export const MENU_STRUCTURE = [
  {
    id: "cockpit",
    title: "监视驾驶舱",
    children: [
      { id: "cockpit-integrated", title: "设备综合监控" },
      { id: "cockpit-network", title: "网络监控" },
      { id: "cockpit-energy", title: "能耗用电监控" },
    ],
  },
  {
    id: "assets",
    title: "智能资产管理",
    children: [
      { id: "asset-overview", title: "资产概览" },
      { id: "asset-list", title: "资产列表" },
      { id: "asset-inventory", title: "库存作业中心" },
      { id: "asset-transfer", title: "资产移交记录" },
    ],
  },
  {
    id: "workorder",
    title: "智能工单系统",
    children: [
      { id: "wo-overview", title: "工单概览" },
      { id: "wo-repair", title: "报修管理" },
      { id: "wo-list", title: "工单列表" },
      { id: "wo-inspection", title: "巡检计划" },
    ],
  },
  {
    id: "emergency",
    title: "应急指挥中心",
    children: [
      { id: "emergency-command", title: "指挥调度大屏" },
      { id: "emergency-risk", title: "危险源智能识别" },
      { id: "emergency-plan", title: "数字化应急预案" },
      { id: "emergency-resources", title: "应急资源管理" },
    ],
  },
  {
    id: "special",
    title: "业务专题",
    children: [{ id: "special-security", title: "安全管理" }],
  },
  {
    id: "cost",
    title: "成本与营收",
    children: [{ id: "cost-calc", title: "全成本核算中心" }],
  },
  {
    id: "decision",
    title: "辅助决策系统",
    children: [{ id: "decision-efficiency", title: "资产效能分析" }],
  },
];
