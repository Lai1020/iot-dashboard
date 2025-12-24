export default function EnergyStructureChart() {
  const data = [
    { name: "车辆充电", value: 62, color: "bg-emerald-500" },
    { name: "场站用电", value: 25, color: "bg-blue-500" },
    { name: "设备运维", value: 13, color: "bg-amber-500" },
  ];

  return (
    <div className="flex items-center gap-6 h-full">
      {/* 左侧：环形图 */}
      <div className="relative w-40 h-40">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              conic-gradient(
                #10b981 0% 62%,
                #3b82f6 62% 87%,
                #f59e0b 87% 100%
              )
            `,
          }}
        />
        {/* 中心空心 */}
        <div className="absolute inset-6 bg-white rounded-full flex flex-col items-center justify-center">
          <div className="text-sm text-slate-400">总能耗</div>
          <div className="text-lg font-bold text-slate-700">
            100%
          </div>
        </div>
      </div>

      {/* 右侧：结构说明 */}
      <div className="flex-1 space-y-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${item.color}`}
              />
              <span className="text-slate-600">{item.name}</span>
            </div>
            <span className="font-medium text-slate-700">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
