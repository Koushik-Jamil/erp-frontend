import StatCard from "@/components/dashboard/StatCard";
import SectionCard from "@/components/dashboard/SectionCard";
import AssetSummaryRow from "@/components/dashboard/AssetSummaryRow";
import SimpleBarChart from "@/components/dashboard/SimpleBarChart";
import SimpleDonutChart from "@/components/dashboard/SimpleDonutChart";
import ProgressDepartmentList from "@/components/dashboard/ProgressDepartmentList";
import TopVendors from "@/components/dashboard/TopVendors";

import { DASHBOARD_KPI_STATS } from "@/lib/demo-dashboard";

import { getSessionUser } from "@/lib/session";

function formatTodayDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default async function Page() {
  const user = await getSessionUser();
  const displayName = user?.name ?? "User";

  const greeting = getGreeting();
  const today = formatTodayDate();

  return (
    <div>
      {/* Greeting */}
      <div className="mt-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          {greeting}, {displayName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Today: {today}</p>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 bg-[#F8F8F8] px-1 py-1 rounded-2xl">
        {DASHBOARD_KPI_STATS.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            badge={s.badge}
            sub={s.sub}
            iconPath={s.iconPath}
          />
        ))}
      </div>

      {/* Asset Summary */}
      <div className="mt-6">
        <AssetSummaryRow />
      </div>

      {/* Middle Row */}
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

      {/* Bottom Row */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard
          title="Monthly Purchase Cost"
          rightSlot={<MonthDropdown />}
        >
          <SimpleBarChart variant="purchase" />
        </SectionCard>

        <SectionCard
          title="Requisitions Status Overview"
          rightSlot={<MonthDropdown />}
        >
          <SimpleDonutChart />
        </SectionCard>
      </div>

      {/* Final Row */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard
          title="Inventory by Category"
          rightSlot={<DateRangePills />}
        >
          <InventoryCategoryMock />
        </SectionCard>

        <SectionCard title="Top 3 Vendor" rightSlot={<DateRangePills />}>
          <TopVendors />
        </SectionCard>
      </div>
    </div>
  );
}

/* controls */
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
      <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        From
      </button>
      <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
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
    </div>
  );
}
