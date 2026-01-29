import { DEMO_TOP_VENDORS, type TopVendorsSummary, type TopVendorItem } from "@/lib/demo-top-vendors";

function buildConicGradient(vendors: { pct: number; color: string }[]) {
  let acc = 0;
  const stops = vendors.map((v) => {
    const start = acc;
    acc += v.pct;
    return `${v.color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export default function TopVendors({
  data = DEMO_TOP_VENDORS,
}: {
  data?: TopVendorsSummary;
}) {
  const gradient = buildConicGradient(data.vendors);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Donut */}
      <div className="flex justify-center">
        <div className="relative w-56 h-56">
          {/* outer thin ring */}
          <div className="absolute inset-0 rounded-full bg-white ring-4 ring-white" />

          {/* donut body */}
          <div
            className="absolute inset-2 rounded-full"
            style={{ background: gradient }}
          />

          {/* inner hole */}
          <div className="absolute inset-14 rounded-full bg-white flex items-center justify-center">
            <div className="text-4xl font-semibold text-gray-900">
              {data.centerLabel}
            </div>
          </div>

          {/* subtle outline like design */}
          <div className="absolute inset-0 rounded-full ring-2 ring-gray-100 pointer-events-none" />
        </div>
      </div>

      {/* Vendor list */}
      <div className="space-y-7">
        {data.vendors.map((v: TopVendorItem) => (
          <div key={v.id} className="flex items-center justify-between">
            <span className="text-2xl font-medium text-gray-600">
              {v.name}
            </span>

            <div className="flex items-center gap-3">
              {/* percentage pill */}
              <span
                className="text-white text-sm font-semibold px-5 py-2 rounded-full"
                style={{ backgroundColor: v.color }}
              >
                {v.pct}%
              </span>

              {/* tiny square marker */}
              <span
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: v.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
