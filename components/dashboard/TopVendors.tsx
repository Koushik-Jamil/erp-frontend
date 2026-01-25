export default function TopVendors() {
  const vendors = [
    { name: "Vendor A", pct: 40, color: "bg-blue-600" },
    { name: "Vendor B", pct: 35, color: "bg-red-400" },
    { name: "Vendor C", pct: 25, color: "bg-blue-300" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="flex justify-center">
        <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center font-semibold text-gray-900">
            100%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {vendors.map((v) => (
          <div key={v.name} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{v.name}</span>
            <span
              className={`text-white text-xs px-3 py-1 rounded-full ${v.color}`}
            >
              {v.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
