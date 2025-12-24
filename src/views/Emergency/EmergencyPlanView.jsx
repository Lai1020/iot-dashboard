import React, { useMemo, useState } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  Clock,
  MapPin,
  ShieldAlert,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Layers,
  FileText,
} from "lucide-react";

const LEVEL_META = {
  I: { label: "I级", badge: "bg-red-50 text-red-600 border-red-100" },
  II: { label: "II级", badge: "bg-orange-50 text-orange-600 border-orange-100" },
  III: { label: "III级", badge: "bg-blue-50 text-blue-600 border-blue-100" },
  IV: { label: "IV级", badge: "bg-emerald-50 text-emerald-600 border-emerald-100" },
};

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${className}`}
    >
      {children}
    </span>
  );
}

function Card({ title, icon: Icon, right, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon ? <Icon size={16} className="text-slate-500" /> : null}
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function StepRow({ idx, step }) {
  return (
    <div className="flex gap-3 py-3">
      <div className="w-8 shrink-0 flex items-start justify-center">
        <div className="h-7 w-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
          {idx}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-slate-800">{step.title}</p>
          {step.sla ? (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock size={12} /> SLA {step.sla}
            </span>
          ) : null}
        </div>
        {step.desc ? <p className="text-sm text-slate-600 mt-1">{step.desc}</p> : null}
      </div>
      <div className="shrink-0 text-slate-400 flex items-center">
        <ChevronRight size={16} />
      </div>
    </div>
  );
}

export default function EmergencyPlanView() {
  const plans = useMemo(
    () => [
      {
        id: "PLAN-001",
        name: "车辆擦碰/轻微事故处置预案",
        level: "IV",
        scene: "线路运营 / 车辆事件",
        lastUpdated: "2025-12-10",
        locations: ["延安西路江苏路", "外滩终点站", "申昆路停车场"],
        triggers: ["碰擦报警", "驾驶员一键上报", "视频AI识别异常停靠"],
        steps: [
          { title: "事件确认与分级", desc: "调度确认位置、车牌、人员伤情，判断等级并建档。", sla: "3 min" },
          { title: "联动资源派发", desc: "通知交警/救援车/线路管理；生成临时绕行建议。", sla: "5 min" },
          { title: "现场处置与回传", desc: "上传照片/视频，记录责任与现场标记；同步给工单系统。", sla: "15 min" },
          { title: "恢复运营与复盘", desc: "恢复线路与班次；形成处置报告与改进项。", sla: "24 h" },
        ],
        resources: [
          { name: "施救车", status: "待命", qty: "5/5" },
          { name: "现场处置包", status: "充足", qty: "≥ 20" },
          { name: "交警联络", status: "在线", qty: "1" },
        ],
        docs: ["处置SOP.pdf", "事故上报模板.docx", "绕行方案参考.xlsx"],
      },
      {
        id: "PLAN-002",
        name: "暴雨积水与极端天气应急预案",
        level: "III",
        scene: "气象灾害 / 线路风险",
        lastUpdated: "2025-11-28",
        locations: ["低洼路段", "桥下涵洞", "沿江路段"],
        triggers: ["气象红/橙预警", "积水监测点超阈值", "乘客投诉集中"],
        steps: [
          { title: "预警发布与值守升级", desc: "进入Ⅲ级响应，提升值班与巡检频次。", sla: "10 min" },
          { title: "重点路段封控/绕行", desc: "对低洼点实施临时封控，推送绕行路线。", sla: "30 min" },
          { title: "应急物资投放", desc: "沙袋/抽水设备部署，标识警戒带。", sla: "60 min" },
          { title: "乘客信息与舆情", desc: "站台广播与APP推送，统一口径对外发布。", sla: "2 h" },
        ],
        resources: [
          { name: "防汛沙袋", status: "充足", qty: "充足" },
          { name: "抽水泵", status: "待命", qty: "3" },
          { name: "防汛队", status: "待命", qty: "1队" },
        ],
        docs: ["防汛作业卡.pdf", "绕行清单.xlsx"],
      },
      {
        id: "PLAN-003",
        name: "危险源识别触发处置预案（AI）",
        level: "II",
        scene: "安全管控 / 危险源",
        lastUpdated: "2025-12-01",
        locations: ["配电房", "维修车间", "重点站台"],
        triggers: ["烟雾/火焰识别", "人员闯入禁区", "设备温度异常"],
        steps: [
          { title: "AI告警核验", desc: "视频回放核验，确认误报/有效告警。", sla: "2 min" },
          { title: "隔离与警戒", desc: "启动现场广播/门禁联动，封控危险区域。", sla: "5 min" },
          { title: "工单与联动", desc: "生成安全工单并通知责任人处理。", sla: "10 min" },
          { title: "关闭告警与留痕", desc: "关闭告警，补充处置证据，形成闭环。", sla: "24 h" },
        ],
        resources: [
          { name: "安保人员", status: "在线", qty: "2组" },
          { name: "消防器材", status: "充足", qty: "充足" },
          { name: "门禁联动", status: "可用", qty: "已接入" },
        ],
        docs: ["AI告警核验SOP.pdf", "禁区清单.xlsx"],
      },
    ],
    []
  );

  const [keyword, setKeyword] = useState("");
  const [level, setLevel] = useState("ALL");
  const [selectedId, setSelectedId] = useState(plans[0]?.id);

  const filtered = useMemo(() => {
    return plans
      .filter((p) => (level === "ALL" ? true : p.level === level))
      .filter((p) => {
        if (!keyword.trim()) return true;
        const k = keyword.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(k) ||
          p.id.toLowerCase().includes(k) ||
          p.scene.toLowerCase().includes(k)
        );
      });
  }, [plans, keyword, level]);

  const selected = useMemo(
    () => plans.find((p) => p.id === selectedId) || filtered[0] || plans[0],
    [plans, selectedId, filtered]
  );

  const levelMeta = LEVEL_META[selected?.level] || LEVEL_META.IV;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="text-blue-600" />
            数字化应急预案
          </h2>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索预案名称 / 编号 / 场景…"
                className="pl-9 pr-3 py-2 w-[260px] max-w-full rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="ALL">全部等级</option>
                <option value="I">I级</option>
                <option value="II">II级</option>
                <option value="III">III级</option>
                <option value="IV">IV级</option>
              </select>
            </div>

            <Badge className="bg-slate-50 text-slate-700 border-slate-200">
              可用预案：{filtered.length}
            </Badge>
          </div>
        </div>

        <div className="text-sm text-slate-500 flex items-center gap-2">
          <ShieldAlert size={14} className="text-slate-400" />
          说明：本页先用假数据渲染结构；后续接接口时只替换数据，不动布局。
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Plan list */}
        <div className="col-span-12 lg:col-span-4">
          <Card
            title="预案列表"
            icon={Layers}
            right={
              <span className="text-xs text-slate-500">
                点击选择预案
              </span>
            }
          >
            <div className="space-y-3">
              {filtered.map((p) => {
                const meta = LEVEL_META[p.level] || LEVEL_META.IV;
                const active = p.id === selected?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      active
                        ? "border-blue-200 bg-blue-50/40 shadow-sm"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs text-slate-400 font-mono">{p.id}</div>
                        <div className="font-bold text-slate-800 mt-0.5">{p.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{p.scene}</div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <Badge className={meta.badge}>{meta.label}</Badge>
                        <span className="text-[11px] text-slate-400">
                          更新：{p.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filtered.length === 0 ? (
                <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  未找到匹配预案，请调整关键词或筛选条件。
                </div>
              ) : null}
            </div>
          </Card>
        </div>

        {/* Right: Plan detail */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Selected summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs text-slate-400 font-mono">{selected?.id}</div>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{selected?.name}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500 mt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> 适用场景：{selected?.scene}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> 最近更新：{selected?.lastUpdated}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={levelMeta.badge}>{levelMeta.label}</Badge>
                <button className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <PlayCircle size={16} />
                  启动演练
                </button>
                <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  生成处置工单
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Triggers */}
            <div className="col-span-12 md:col-span-6">
              <Card title="触发条件" icon={ShieldAlert}>
                <div className="flex flex-wrap gap-2">
                  {(selected?.triggers || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Locations */}
            <div className="col-span-12 md:col-span-6">
              <Card title="适用区域" icon={MapPin}>
                <div className="flex flex-wrap gap-2">
                  {(selected?.locations || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Steps */}
            <div className="col-span-12">
              <Card
                title="处置流程（步骤）"
                icon={ClipboardList}
                right={<span className="text-xs text-slate-500">可后续替换为流程图/可拖拽步骤</span>}
              >
                <div className="divide-y divide-slate-100">
                  {(selected?.steps || []).map((s, i) => (
                    <StepRow key={i} idx={i + 1} step={s} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Resources */}
            <div className="col-span-12 md:col-span-6">
              <Card title="联动资源" icon={Layers}>
                <div className="space-y-3">
                  {(selected?.resources || []).map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <div>
                        <div className="font-bold text-slate-800">{r.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">状态：{r.status}</div>
                      </div>
                      <Badge className="bg-white text-slate-700 border-slate-200">{r.qty}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Docs */}
            <div className="col-span-12 md:col-span-6">
              <Card title="关联文档" icon={FileText}>
                <div className="space-y-2">
                  {(selected?.docs || []).map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2 text-slate-700">
                        <FileText size={16} className="text-slate-400" />
                        <span className="text-sm font-medium">{d}</span>
                      </div>
                      <button className="text-sm font-bold text-blue-600 hover:text-blue-700">
                        查看
                      </button>
                    </div>
                  ))}
                  {(!selected?.docs || selected.docs.length === 0) ? (
                    <div className="text-sm text-slate-500">暂无关联文档。</div>
                  ) : null}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
