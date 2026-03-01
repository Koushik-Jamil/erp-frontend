"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { VendorRow, VendorStatus } from "@/lib/demo-vendors";
import { Pencil, Printer, Trash2 } from "lucide-react";

function LinkText({ value, onClick }: { value: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="text-blue-600 underline underline-offset-2"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function StatusDot({ value }: { value: VendorStatus }) {
  const dot = value === "Active" ? "bg-green-500" : "bg-red-500";
  return (
    <span className="inline-flex items-center gap-2 text-sm text-gray-800">
      <span className={`h-3 w-3 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

function ActionButtons({ row }: { row: VendorRow }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="h-8 w-8 rounded-md bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
        onClick={() => console.log("Edit", row.vendorCode)}
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="h-8 w-8 rounded-md bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
        onClick={() => console.log("Print", row.vendorCode)}
      >
        <Printer className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="h-8 w-8 rounded-md bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        onClick={() => console.log("Delete", row.vendorCode)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export const vendorColumns: ColumnDef<VendorRow>[] = [
  { accessorKey: "sl", header: "SL" },

  {
    accessorKey: "vendorCode",
    header: "Vendor Code",
    cell: ({ row }) => (
      <LinkText
        value={row.original.vendorCode}
        onClick={() => console.log("Open Vendor:", row.original.vendorCode)}
      />
    ),
  },

  { accessorKey: "vendorName", header: "Vendor Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "contact", header: "Contact" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "paymentTerms", header: "Payment Terms" },
  { accessorKey: "deliveryTime", header: "Delivery Time" },
  { accessorKey: "rating", header: "Rating" },
  { accessorKey: "qty", header: "Qty" },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusDot value={row.original.status} />,
  },

  {
    id: "_actions",
    header: "Action",
    cell: ({ row }) => <ActionButtons row={row.original} />,
  },
];