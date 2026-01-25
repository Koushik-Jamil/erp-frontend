import StatCard from "@/components/dashboard/StatCard";
import SectionCard from "@/components/dashboard/SectionCard";
import AssetSummaryRow from "@/components/dashboard/AssetSummaryRow";
import SimpleBarChart from "@/components/dashboard/SimpleBarChart";
import SimpleDonutChart from "@/components/dashboard/SimpleDonutChart";
import ProgressDepartmentList from "@/components/dashboard/ProgressDepartmentList";
import TopVendors from "@/components/dashboard/TopVendors";
import { getSessionUser } from "@/lib/session";

export default async function Page() {
  const user = await getSessionUser();
  const displayName = user?.name ?? "User";

  const stats = [
    {
      title: "Total Requisitions",
      value: "1,248",
      sub: "244 more than last month",
      badge: "+13%",
    },
    {
      title: "Pending Approvals",
      value: "486",
      sub: "12% of total requisitions",
      badge: "IT: 18 | Fin: 19",
    },
    {
      title: "Active Purchase Orders",
      value: "24",
      sub: "22% of purchase orders are WIP",
      badge: "6 delivering today",
      },
    {
      title: "Inventory Value",
      value: "৳ 8.4M",
      sub: "৳ 1.2M increase from last month",
      badge: "+13%",
    },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="mt-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          Good Morning, {displayName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Today: Monday 12, February 2025
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            badge={s.badge}
            sub={s.sub}
          />
        ))}
      </div>

      <div className="mt-6">
        <AssetSummaryRow />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard
          title="Requisitions by Department"
          rightSlot={<DateRangePills />}
        >
          <ProgressDepartmentList />
        </SectionCard>

        <SectionCard title="Inventory In vs Out" rightSlot={<MonthDropdown />}>
          <SimpleBarChart />
        </SectionCard>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard title="Monthly Purchase Cost" rightSlot={<MonthDropdown />}>
          <SimpleBarChart variant="purchase" />
        </SectionCard>

        <SectionCard
          title="Requisitions Status Overview"
          rightSlot={<MonthDropdown />}
        >
          <SimpleDonutChart />
        </SectionCard>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard title="Inventory by Category" rightSlot={<DateRangePills />}>
          <InventoryCategoryMock />
        </SectionCard>

        <SectionCard title="Top 3 Vendor" rightSlot={<DateRangePills />}>
          <TopVendors />
        </SectionCard>
      </div>
    </div>
  );
}

/* ✅ small controls */

function MonthDropdown() {
  return (
    <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none">
      <option>January</option>
      <option>February</option>
      <option>March</option>
      <option>April</option>
    </select>
  );
}

function DateRangePills() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
      >
        From
      </button>
      <button
        type="button"
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
      >
        To
      </button>
    </div>
  );
}

function InventoryCategoryMock() {
  return (
    <div className="space-y-4">
      {[
        { name: "Admin", pct: 15 },
        { name: "HR", pct: 25 },
        { name: "IT", pct: 60 },
      ].map((x) => (
        <div key={x.name} className="flex items-center gap-4">
          <div className="w-16 text-sm font-medium text-gray-700">{x.name}</div>

          <div className="w-full">
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: `${x.pct}%` }}
              />
            </div>
          </div>

          <div className="w-12 text-sm text-gray-500 text-right">{x.pct}%</div>
        </div>
      ))}

      <div className="mt-6 flex gap-3">
        <div className="h-10 flex-1 rounded-xl bg-blue-600" />
        <div className="h-10 flex-1 rounded-xl bg-blue-300" />
        <div className="h-10 flex-1 rounded-xl bg-orange-400" />
      </div>
    </div>
  );
}
