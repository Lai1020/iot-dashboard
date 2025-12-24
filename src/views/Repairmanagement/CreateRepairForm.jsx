export default function CreateRepairForm({ onCancel, onSubmit }) {
  return (
    <div className="bg-white rounded-xl border p-6 w-[520px]">
      {/* 报修来源 */}
      <div className="mb-4">
        <div className="text-sm font-medium text-slate-700 mb-2">
          报修来源
        </div>
        <div className="flex gap-3">
          <button className="flex-1 border rounded-lg py-2 text-blue-600 border-blue-500">
            人工报修 / 12345
          </button>
          <button className="flex-1 border rounded-lg py-2 text-slate-500">
            补录扫码记录
          </button>
        </div>
      </div>

      {/* 报修资产 */}
      <div className="mb-4">
        <div className="text-sm font-medium text-slate-700 mb-1">
          报修资产对象
        </div>
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="输入资产编码或名称（可为空）"
        />
        <div className="text-xs text-amber-500 mt-1">
          若不指定资产，工单将进入人工池
        </div>
      </div>

      {/* 故障描述 */}
      <div className="mb-6">
        <div className="text-sm font-medium text-slate-700 mb-1">
          故障描述
        </div>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm h-24"
          placeholder="请详细描述故障现象..."
        />
      </div>

      {/* 操作 */}
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 text-sm text-slate-500"
          onClick={onCancel}
        >
          取消
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={onSubmit}
        >
          提交报修
        </button>
      </div>
    </div>
  );
}
