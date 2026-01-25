export default function ProgressDepartmentList() {
  const rows = [
    { dept: "IT (Info & Tech)", count: 320, pct: 78 },
    { dept: "Admin", count: 210, pct: 45 },
    { dept: "Finance", count: 140, pct: 28 },
    { dept: "HR", count: 95, pct: 18 },
    { dept: "Operations", count: 483, pct: 62 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>Status</span>
        <span>Count</span>
      </div>

      {rows.map((r) => (
        <div key={r.dept} className="grid grid-cols-12 items-center gap-3">
          <div className="col-span-5">
            <p className="text-sm font-medium text-gray-700">{r.dept}</p>
          </div>

          <div className="col-span-2">
            <span className="text-sm text-gray-500">{r.count}</span>
          </div>

          <div className="col-span-5">
            <div className="h-3 rounded-full bg-blue-50 overflow-hidden">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
