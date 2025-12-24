function Input({ label, placeholder }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
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



export default function InventoryInboundPanel() {
  return (
    <div className="bg-white rounded-xl border p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* 左侧：表单 */}
      <div className="xl:col-span-2 space-y-4">
        <h3 className="font-semibold text-slate-700">基本信息录入</h3>

        <div className="grid grid-cols-2 gap-4">
          <Input label="资产名称" placeholder="例如：手持 POS 终端" />
          <Select label="资产分类" />
          <Input label="品牌 / 型号" placeholder="华为 / AR500" />
          <Input label="序列号（SN）" placeholder="自动 / 手动输入" />
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
          生成数字化身份标签
        </button>
      </div>

      {/* 右侧：标签预览 */}
      <div className="border rounded-xl p-4 flex flex-col items-center justify-center">
        <div className="text-sm text-slate-500 mb-3">标签预览</div>
        <div className="w-32 h-32 bg-slate-100 flex items-center justify-center text-4xl">
          📦
        </div>
        <div className="text-xs text-slate-400 mt-2">
          RFID / 二维码 自动绑定
        </div>
      </div>
    </div>
  );
}