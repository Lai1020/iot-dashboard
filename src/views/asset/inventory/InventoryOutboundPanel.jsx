
function Step({ active, text }) {
  return (
    <div className={`flex items-center gap-2 ${active ? "text-blue-600" : "text-slate-400"}`}>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
          ${active ? "bg-blue-600 text-white" : "bg-slate-200"}`}
      >
        ✓
      </div>
      {text}
    </div>
  );
}




function StepHeader({ step }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <Step active={step >= 1} text="选择资产" />
      <div className="h-px flex-1 bg-slate-200" />
      <Step active={step >= 2} text="指定领用人" />
      <div className="h-px flex-1 bg-slate-200" />
      <Step active={step >= 3} text="配置 SLA" />
    </div>
  );
}


function Select({ label }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <select className="w-full border rounded-md px-3 py-2 text-sm">
        <option>车载设备</option>
        <option>IT 设备</option>
      </select>
    </div>
  );
}


export default function InventoryOutboundPanel() {
  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <StepHeader step={2} />

      <div>
        <h3 className="font-medium text-slate-700 mb-2">
          指定领用人 / 责任人
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <Select label="领用部门" />
          <Select label="领用人（责任主体）" />
        </div>

        <div className="mt-3 p-3 rounded bg-amber-50 text-amber-700 text-sm">
          注意：该资产属于贵重设备，领用后需承担保管责任。
        </div>
      </div>
    </div>
  );
}