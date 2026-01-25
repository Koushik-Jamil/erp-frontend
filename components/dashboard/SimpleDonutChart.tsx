export default function SimpleDonutChart() {
  const total = 835;

  const parts = [
    { label: "Pending", value: 524, color: "bg-orange-400" },
    { label: "Approved", value: 275, color: "bg-blue-600" },
    { label: "Rejected", value: 145, color: "bg-red-400" },
    { label: "Completed", value: 145, color: "bg-green-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Donut */}
      <div className="flex items-center justify-center">
        <div className="relative w-44 h-44 rounded-full bg-gray-100">
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center text-center">
            <div>
              <div className="text-2xl font-semibold text-gray-900">{total}</div>
              <div className="text-xs text-gray-500">Requisitions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {parts.map((p) => (
          <div key={p.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${p.color}`} />
              <span className="text-sm text-gray-700">{p.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
