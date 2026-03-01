"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type {
  PurchaseInvoiceRow,
  PaymentStatus,
  DeliveryStatus,
} from "@/lib/demo-purchase-invoices";
import { Pencil, Printer, Trash2 } from "lucide-react";

function formatMoney(n: number) {
  return n.toLocaleString("en-US");
}

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

function PaymentBadge({ value }: { value: PaymentStatus }) {
  const dot =
    value === "Paid"
      ? "bg-green-500"
      : value === "Partially Paid"
        ? "bg-yellow-500"
        : "bg-yellow-500";

  const text =
    value === "Paid"
      ? "text-gray-800"
      : value === "Partially Paid"
        ? "text-gray-800"
        : "text-gray-800";

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${text}`}>
      <span className={`h-3 w-3 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

function DeliveryBadge({ value }: { value: DeliveryStatus }) {
  const dot =
    value === "Delivered"
      ? "bg-green-500"
      : value === "Received"
        ? "bg-blue-500"
        : "bg-yellow-500";

  return (
    <span className="inline-flex items-center gap-2 text-sm text-gray-800">
      <span className={`h-3 w-3 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

function ActionButtons({ row }: { row: PurchaseInvoiceRow }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="h-8 w-8 rounded-md bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
        onClick={() => console.log("Edit", row.invoiceNo)}
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="h-8 w-8 rounded-md bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
        onClick={() => console.log("Print", row.invoiceNo)}
      >
        <Printer className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="h-8 w-8 rounded-md bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        onClick={() => console.log("Delete", row.invoiceNo)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export const purchaseInvoiceColumns: ColumnDef<PurchaseInvoiceRow>[] = [
  { accessorKey: "sl", header: "SL" },

  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
    cell: ({ row }) => (
      <LinkText
        value={row.original.invoiceNo}
        onClick={() => console.log("Open Invoice:", row.original.invoiceNo)}
      />
    ),
  },

  { accessorKey: "invoiceDate", header: "Invoice Date" },
  { accessorKey: "poNo", header: "PO No" },
  { accessorKey: "vendor", header: "Vendor" },
  { accessorKey: "items", header: "Items" },

  {
    accessorKey: "subtotal",
    header: "Subtotal (৳)",
    cell: ({ row }) => <span>{formatMoney(row.original.subtotal)}</span>,
  },

  { accessorKey: "vat", header: "VAT" },

  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => <span>{formatMoney(row.original.discount)}</span>,
  },

  {
    accessorKey: "total",
    header: "Total (৳)",
    cell: ({ row }) => <span>{formatMoney(row.original.total)}</span>,
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => <PaymentBadge value={row.original.paymentStatus} />,
  },

  { accessorKey: "dueDate", header: "Due Date" },

  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => <DeliveryBadge value={row.original.deliveryStatus} />,
  },

  {
    id: "_actions",
    header: "Action",
    cell: ({ row }) => <ActionButtons row={row.original} />,
  },
];