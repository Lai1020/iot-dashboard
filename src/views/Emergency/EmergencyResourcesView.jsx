import React, { useMemo, useState } from "react";
import {
  Package,
  Search,
  Filter,
  MapPin,
  Phone,
  Truck,
  Shield,
  Wrench,
  Droplets,
  Siren,
  Plus,
  RefreshCw,
  ClipboardList,
} from "lucide-react";

const TYPE_META = {
  车辆: { icon: Truck, chip: "bg-blue-50 text-blue-700 border-blue-100" },
  人员: { icon: Shield, chip: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  物资: { icon: Package, chip: "bg-slate-50 text-slate-700 border-slate-200" },
  设备: { icon: Wrench, chip: "bg-orange-50 text-orange-700 border-orange-100" },
  防汛: { icon: Droplets, chip: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  通讯: { icon: Phone, chip: "bg-violet-50 text-violet-700 border-violet-100" },
};

const STATUS_META = {
  待命: "bg-emerald-50 text-emerald-700 border-emerald-100",
  在途: "bg-blue-50 text-blue-700 border-blue-100",
  占用: "bg-orange-50 text-orange-700 border-orange-100",
  不可用: "bg-red-50 text-red-700 border-red-100",
};

function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${className}`}>
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

function TableHeader() {
  return (
    <div className="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="col-span-3">资源</div>
      <div className="col-span-2">类型</div>
      <div className="col-span-2">状态</div>
      <div className="col-span-2">位置</div>
      <div className="col-span-1 text-right">数量</div>
      <div className="col-span-2 text-right">操作</div>
    </div>
  );
}

function Row({ item, onDispatch, onDetail }) {
  const t = TYPE_META[item.type] || TYPE_META["物资"];
  const Icon = t.icon || Package;
  const statusClass = STATUS_META[item.status] || "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="grid grid-cols-12 gap-3 px-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
      <div className="col-span-3 flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon size={18} className="text-slate-500" />
        </div>
        <div>
          <div className="font-bold text-slate-800 leading-snug">{item.name}</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
            {item.owner ? <span>责任人：{item.owner}</span> : null}
            {item.phone ? (
              <span className="inline-flex items-center gap-1">
                <Phone size={12} /> {item.phone}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center">
        <Badge className={t.chip}>{item.type}</Badge>
      </div>

      <div className="col-span-2 flex items-center">
        <Badge className={statusClass}>{item.status}</Badge>
      </div>

      <div className="col-span-2 flex items-center text-sm text-slate-600 gap-1">
        <MapPin size={14} className="text-slate-400" />
        <span className="truncate">{item.location}</span>
      </div>

      <div className="col-span-1 flex items-center justify-end font-bold text-slate-800">
        {item.qty}
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2">
        <button
          onClick={() => onDetail(item)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-white"
        >
          详情
        </button>
        <button
          onClick={() => onDispatch(item)}
          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
        >
          派发
        </button>
      </div>
    </div>
  );
}

export default function EmergencyResourcesView() {
  const data = useMemo(
    () => [
      { id: "RSC-001", name: "应急施救车（A队）", type: "车辆", status: "待命", location: "申昆路停车场-B区", qty: 1, owner: "张队", phone: "138****1122" },
      { id: "RSC-002", name: "应急施救车（B队）", type: "车辆", status: "占用", location: "延安西路江苏路", qty: 1, owner: "李队", phone: "139****3344" },
      { id: "RSC-003", name: "防汛沙袋", type: "防汛", status: "待命", location: "仓储中心-1号库", qty: "充足", owner: "仓储值守" },
      { id: "RSC-004", name: "抽水泵（移动）", type: "防汛", status: "待命", location: "仓储中心-2号库", qty: 3, owner: "仓储值守" },
      { id: "RSC-005", name: "安保巡逻组（东片区）", type: "人员", status: "在途", location: "外滩终点站", qty: 1, owner: "王班长", phone: "137****5566" },
      { id: "RSC-006", name: "配电房烟感联动", type: "设备", status: "待命", location: "申昆路停车场-配电房", qty: 1, owner: "设备科" },
      { id: "RSC-007", name: "对讲机（应急频道）", type: "通讯", status: "待命", location: "调度中心", qty: 12, owner: "调度值守" },
    ],
    []
  );

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return data
      .filter((x) => (type === "ALL" ? true : x.type === type))
      .filter((x) => (status === "ALL" ? true : x.status === status))
      .filter((x) => {
        if (!keyword.trim()) return true;
        const k = keyword.trim().toLowerCase();
        return (
          x.name.toLowerCase().includes(k) ||
          x.id.toLowerCase().includes(k) ||
          (x.location || "").toLowerCase().includes(k) ||
          (x.owner || "").toLowerCase().includes(k)
        );
      });
  }, [data, keyword, type, status]);

  const summary = useMemo(() => {
    const s = { 全部: data.length, 待命: 0, 在途: 0, 占用: 0, 不可用: 0 };
    data.forEach((x) => {
      if (s[x.status] !== undefined) s[x.status] += 1;
    });
    return s;
  }, [data]);

  const onDispatch = (item) => {
    alert(`派发：${item.name}\n（后续这里接：生成工单/派车单/通知责任人）`);
  };

  const onDetail = (item) => {
    alert(
      `资源详情\n\n编号：${item.id}\n名称：${item.name}\n类型：${item.type}\n状态：${item.status}\n位置：${item.location}\n数量：${item.qty}\n责任人：${item.owner || "-"}`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Package className="text-blue-600" />
            应急资源管理
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-slate-50 text-slate-700 border-slate-200">全部：{summary.全部}</Badge>
            <Badge className={STATUS_META["待命"]}>待命：{summary.待命}</Badge>
            <Badge className={STATUS_META["在途"]}>在途：{summary.在途}</Badge>
            <Badge className={STATUS_META["占用"]}>占用：{summary.占用}</Badge>
            <Badge className={STATUS_META["不可用"]}>不可用：{summary.不可用}</Badge>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索：资源名称 / 编号 / 位置 / 责任人…"
                className="pl-9 pr-3 py-2 w-[320px] max-w-full rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="ALL">全部类型</option>
                {Object.keys(TYPE_META).map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="ALL">全部状态</option>
                {Object.keys(STATUS_META).map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <RefreshCw size={16} />
              刷新
            </button>
            <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} />
              新增资源
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: list */}
        <div className="col-span-12 lg:col-span-8 space-y-3">
          <TableHeader />
          <div className="space-y-3">
            {filtered.map((item) => (
              <Row key={item.id} item={item} onDispatch={onDispatch} onDetail={onDetail} />
            ))}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
                未找到资源，请调整筛选条件或关键词。
              </div>
            ) : null}
          </div>
        </div>

        {/* Right: quick actions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card
            title="快速动作"
            icon={Siren}
            right={<span className="text-xs text-slate-500">后续可接工单系统</span>}
          >
            <div className="space-y-3">
              <button className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ClipboardList size={18} /> 一键生成资源盘点
                </span>
                <span className="text-white/80 text-sm">→</span>
              </button>

              <button className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield size={18} /> 设置资源阈值告警
                </span>
                <span className="text-slate-400 text-sm">→</span>
              </button>

              <button className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Truck size={18} /> 车辆资源调度规则
                </span>
                <span className="text-slate-400 text-sm">→</span>
              </button>
            </div>
          </Card>

          <Card title="接入说明" icon={Package}>
            <div className="text-sm text-slate-600 space-y-2">
              <p>当前为“结构先行”的演示页：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>后端接入后，只替换 data 数据源即可。</li>
                <li>派发按钮可接：生成工单 / 派车单 / 通知责任人。</li>
                <li>详情弹窗可替换为 Drawer/Modal 组件。</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
