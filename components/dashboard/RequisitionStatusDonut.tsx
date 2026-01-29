import { DEMO_REQ_STATUS_OVERVIEW, type ReqStatusSummary } from "@/lib/demo-requisition-status";

function pct(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function buildConicGradient(items: { value: number; color: string }[], total: number) {
  // Builds: conic-gradient(color 0% x%, color x% y%, ...)
  let acc = 0;
  const stops = items.map((it) => {
    const start = acc;
    const p = total ? (it.value / total) * 100 : 0;
    acc += p;
    return `${it.color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export default function RequisitionStatusDonut({
  data = DEMO_REQ_STATUS_OVERVIEW,
}: {
  data?: ReqStatusSummary;
}) {
  const total = data.total || data.items.reduce((s, x) => s + x.value, 0);
  const gradient = buildConicGradient(data.items, total);

  const pcts = Object.fromEntries(
    data.items.map((x) => [x.key, pct(x.value, total)])
  ) as Record<string, number>;

  return (
    <div className="w-full">
      {/* layout: desktop = donut center with side labels, mobile = stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left labels (desktop only) */}
        <div className="hidden lg:flex flex-col gap-10">
          {data.items
            .filter((x) => x.key === "pending" || x.key === "rejected")
            .map((x) => (
              <div key={x.key} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: x.color }} />
                <div className="text-gray-700">
                  <div className="text-lg font-semibold">{x.label}</div>
                  <div className="text-gray-400 text-sm">({pcts[x.key]}%)</div>
                </div>
              </div>
            ))}
        </div>

        {/* Donut */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* outer donut */}
            <div
              className="w-56 h-56 rounded-full"
              style={{ background: gradient }}
            />
            {/* inner hole */}
            <div className="absolute inset-10 rounded-full bg-white flex items-center justify-center text-center">
              <div>
                <div className="text-4xl font-semibold text-gray-900">{total}</div>
                <div className="text-sm text-gray-400">{data.totalLabel}</div>
              </div>
            </div>

            {/* subtle outline ring like design */}
            <div className="absolute inset-0 rounded-full ring-4 ring-white/70 pointer-events-none" />
          </div>
        </div>

        {/* Right labels (desktop only) */}
        <div className="hidden lg:flex flex-col gap-10 items-start">
          {data.items
            .filter((x) => x.key === "approved" || x.key === "completed")
            .map((x) => (
              <div key={x.key} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: x.color }} />
                <div className="text-gray-700">
                  <div className="text-lg font-semibold">{x.label}</div>
                  <div className="text-gray-400 text-sm">({pcts[x.key]}%)</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Mobile legend (only on small screens) */}
      <div className="lg:hidden mt-6 grid grid-cols-2 gap-3">
        {data.items.map((x) => (
          <div key={x.key} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: x.color }} />
            <div className="text-sm text-gray-700">
              {x.label} <span className="text-gray-400">({pct(x.value, total)}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom numbers row (matches design) */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {data.items.map((x) => (
          <div key={x.key} className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-sm border"
              style={{ borderColor: x.color, backgroundColor: `${x.color}22` }}
            />
            <div>
              <div className="text-sm text-gray-500">{x.label}</div>
              <div className="text-3xl font-semibold text-gray-900">{x.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
