"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { PurchaseOrderRow } from "@/lib/demo-purchase-orders";

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

function formatMoney(n: number) {
  return n.toLocaleString("en-US");
}

export const purchaseOrderColumns: ColumnDef<PurchaseOrderRow>[] = [
  { accessorKey: "sl", header: "SL" },

  {
    accessorKey: "poNo",
    header: "PO No",
    cell: ({ row }) => (
      <LinkText
        value={row.original.poNo}
        onClick={() => console.log("Open PO:", row.original.poNo)}
      />
    ),
  },

  { accessorKey: "poDate", header: "Po Date" },

  {
    accessorKey: "reqId",
    header: "Req ID",
    cell: ({ row }) => (
      <LinkText
        value={row.original.reqId}
        onClick={() => console.log("Open Req:", row.original.reqId)}
      />
    ),
  },

  { accessorKey: "department", header: "Department" },
  { accessorKey: "vendor", header: "Vendor" },
  { accessorKey: "deliveryDate", header: "Delivery Date" },
  { accessorKey: "deliveryStatus", header: "Delivery Status" },
  { accessorKey: "items", header: "Items" },

  {
    accessorKey: "amount",
    header: "Amount (৳)",
    cell: ({ row }) => <span>{formatMoney(row.original.amount)}</span>,
  },

  { accessorKey: "payment", header: "Payment" },
  { accessorKey: "approval", header: "Approval" },
  { accessorKey: "updated", header: "Updated" },
];