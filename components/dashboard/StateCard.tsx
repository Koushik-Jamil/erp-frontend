type Props = {
  title: string;
  value: string;
  badge: string;
  sub: string;
};

export default function StatCard({ title, value, badge, sub }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
        </div>

        <span className="rounded-full bg-green-50 text-green-700 text-xs px-3 py-1 border border-green-100">
          {badge}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-2">{sub}</p>
    </div>
  );
}
