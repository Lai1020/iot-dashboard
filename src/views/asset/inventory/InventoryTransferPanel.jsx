export default function InventoryTransferPanel() {
  return (
    <div className="bg-white rounded-xl border p-10 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl mb-3">
        📄
      </div>

      <div className="font-medium text-slate-700 mb-1">
        合同清单资产移交
      </div>
      <div className="text-sm text-slate-500 mb-4">
        输入采购合同编号，系统将自动识别并批量入库
      </div>

      <div className="flex gap-2 w-full max-w-md">
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          placeholder="例如：HT-2024-09-001"
        />
        <button className="bg-blue-600 text-white px-4 rounded-md">
          查询合同
        </button>
      </div>
    </div>
  );
}