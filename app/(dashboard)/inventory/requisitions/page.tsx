import RequisitionTable from "./_components/RequisitionTable";
import RequisitionFilters from "./_components/RequisitionFilters";
import RequisitionPagination from "./_components/RequisitionPagination";

export default function Page() {
  return (
    <div className="space-y-6">
      <RequisitionFilters />
      <RequisitionTable />
      <RequisitionPagination />
    </div>
  );
}
