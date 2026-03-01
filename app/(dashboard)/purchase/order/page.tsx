import PurchaseOrderTable from "./_components/PurchaseOrderTable";

export default function PurchaseOrderPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">
        Purchase Order Table
      </h1>
      <PurchaseOrderTable />
    </div>
  );
}