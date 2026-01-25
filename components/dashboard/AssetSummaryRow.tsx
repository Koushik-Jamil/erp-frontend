export default function AssetSummaryRow() {
  const chips = [
    { label: "In Use: 78%", color: "bg-green-100 text-green-700" },
    { label: "In Stock: 17%", color: "bg-blue-100 text-blue-700" },
    { label: "Under Maintenance: 5%", color: "bg-red-100 text-red-700" },
  ];

  const items = [
    { label: "Total Asset", value: 486 },
    { label: "Total PC", value: 486 },
    { label: "Total Laptop", value: 312 },
    { label: "Total Server", value: 28 },
    { label: "Total Switch", value: 64 },
    { label: "Total Router", value: 22 },
    { label: "Total Firewall", value: 8 },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Total Asset Summary
          </h2>

          {chips.map((c) => (
            <span
              key={c.label}
              className={`rounded-full px-4 py-1 text-xs font-medium ${c.color}`}
            >
              {c.label}
            </span>
          ))}
        </div>

        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
          Jan 2024 - Feb 2025
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {items.map((x) => (
          <div
            key={x.label}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="text-2xl font-semibold text-gray-900">
              {x.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{x.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
