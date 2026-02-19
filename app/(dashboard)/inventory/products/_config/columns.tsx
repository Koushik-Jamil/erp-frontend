"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AssetRow } from "@/lib/demo-assets-table";
import { Pencil, Copy, Trash2 } from "lucide-react";

function PriorityPill({ value }: { value: AssetRow["priority"] }) {
  const cls =
    value === "High"
      ? "bg-red-50 text-red-600"
      : value === "Medium"
      ? "bg-amber-50 text-amber-600"
      : "bg-green-50 text-green-600";

  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {value}
    </span>
  );
}

function formatBDT(n: number) {
  return n.toLocaleString("en-US");
}

function ActionIcon({
  title,
  variant,
  onClick,
  children,
}: {
  title: string;
  variant: "blue" | "green" | "red";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const cls =
    variant === "blue"
      ? "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
      : variant === "green"
      ? "bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
      : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100";

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${cls}`}
    >
      {children}
    </button>
  );
}

export const assetColumns: ColumnDef<AssetRow>[] = [
  { accessorKey: "sl", header: "SL" },
  {
    accessorKey: "productId",
    header: "Product ID",
    cell: ({ row }) => (
      <a className="text-blue-700 hover:underline" href="#">
        {row.original.productId}
      </a>
    ),
  },
  { accessorKey: "productName", header: "Product Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subCategory", header: "Sub Category" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "unit", header: "Unit" },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityPill value={row.original.priority} />,
  },
  { accessorKey: "stock", header: "Stock" },
  { accessorKey: "minStock", header: "Min Stock" },
  { accessorKey: "reorder", header: "Reorder" },
  {
    accessorKey: "price",
    header: "Price (৳)",
    cell: ({ row }) => formatBDT(row.original.price),
  },
  { accessorKey: "vendor", header: "Vendor" },
  { accessorKey: "createdDate", header: "Created Date" },
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ActionIcon title="Edit" variant="blue" onClick={() => alert(`Edit ${row.original.productId}`)}>
          <Pencil className="w-4 h-4" />
        </ActionIcon>
        <ActionIcon title="Duplicate" variant="green" onClick={() => alert(`Duplicate ${row.original.productId}`)}>
          <Copy className="w-4 h-4" />
        </ActionIcon>
        <ActionIcon title="Delete" variant="red" onClick={() => alert(`Delete ${row.original.productId}`)}>
          <Trash2 className="w-4 h-4" />
        </ActionIcon>
      </div>
    ),
  },
];
