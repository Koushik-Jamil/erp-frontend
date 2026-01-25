export default function SimpleBarChart({ variant }: { variant?: "purchase" }) {
  const data =
    variant === "purchase"
      ? [120, 98, 160, 110, 56, 42]
      : [420, 390, 520, 480, 610, 560];

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          {variant === "purchase" ? "Purchase Cost" : "Stock In"}
        </span>
        {variant !== "purchase" && (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-400" />
            Stock Out
          </span>
        )}
      </div>

      <div className="h-52 flex items-end gap-4">
        {data.map((v, i) => (
          <div key={labels[i]} className="flex-1 flex flex-col items-center">
            <div className="text-xs text-gray-400 mb-2">{v}</div>
            <div
              className="w-full rounded-2xl bg-blue-200"
              style={{ height: `${(v / 650) * 180}px` }}
            />
            <div className="text-xs text-gray-500 mt-2">{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
