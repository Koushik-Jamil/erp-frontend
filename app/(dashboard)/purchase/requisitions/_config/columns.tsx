"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { PurchaseRequisitionRow, ApprovalState, Priority, PRStatus } from "@/lib/demo-purchase-requisitions";
import { Pencil, Printer, Trash2 } from "lucide-react";

function PriorityPill({ value }: { value: Priority }) {
  const cls =
    value === "High"
      ? "bg-red-50 text-red-600"
      : value === "Medium"
        ? "bg-orange-50 text-orange-600"
        : "bg-green-50 text-green-600";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${cls}`}>
      {value}
    </span>
  );
}

function ApprovalPill({ value }: { value: ApprovalState }) {
  if (value === "—") return <span className="text-gray-500">—</span>;

  const isApproved = value === "Approved";
  const isPending = value === "Pending";
  const cls = isApproved
    ? "bg-green-50 text-green-700"
    : isPending
      ? "bg-yellow-50 text-yellow-700"
      : "bg-red-50 text-red-700";

  const dot = isApproved
    ? "bg-green-500"
    : isPending
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${cls}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

function StatusText({ value }: { value: PRStatus }) {
  const cls =
    value === "PO Created"
      ? "text-blue-600"
      : value === "Pending Finance" || value === "Pending Dept Head"
        ? "text-orange-500"
        : value === "Delivered"
          ? "text-green-600"
          : "text-red-500";

  return <span className={`text-sm font-medium ${cls}`}>{value}</span>;
}

function ReqLink({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="text-blue-600 underline underline-offset-2"
      onClick={() => console.log("Open requisition:", value)}
    >
      {value}
    </button>
  );
}

function ActionButtons({ row }: { row: PurchaseRequisitionRow }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="h-8 w-8 rounded-md bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
        onClick={() => console.log("Edit", row.reqId)}
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="h-8 w-8 rounded-md bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
        onClick={() => console.log("Print", row.reqId)}
      >
        <Printer className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="h-8 w-8 rounded-md bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        onClick={() => console.log("Delete", row.reqId)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export const purchaseRequisitionColumns: ColumnDef<PurchaseRequisitionRow>[] = [
  { accessorKey: "sl", header: "SL" },

  {
    accessorKey: "reqId",
    header: "Req ID",
    cell: ({ getValue }) => <ReqLink value={String(getValue())} />,
  },

  { accessorKey: "date", header: "Date" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "requestedBy", header: "Requested By" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "product", header: "Product" },
  { accessorKey: "qty", header: "Qty" },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityPill value={row.original.priority} />,
  },

  {
    accessorKey: "deptHead",
    header: "Dept Head",
    cell: ({ row }) => <ApprovalPill value={row.original.deptHead} />,
  },

  {
    accessorKey: "finance",
    header: "Finance",
    cell: ({ row }) => <ApprovalPill value={row.original.finance} />,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusText value={row.original.status} />,
  },

  { accessorKey: "poNo", header: "PO No" },
  { accessorKey: "vendor", header: "Vendor" },

  {
    id: "_actions",
    header: "Action",
    cell: ({ row }) => <ActionButtons row={row.original} />,
  },
];