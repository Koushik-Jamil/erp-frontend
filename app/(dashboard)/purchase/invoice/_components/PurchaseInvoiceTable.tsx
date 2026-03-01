"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { ToolbarItem } from "@/lib/toolbar/types";
import { purchaseInvoiceColumns } from "../_config/columns";
import {
  DEMO_PURCHASE_INVOICES,
  type PurchaseInvoiceRow,
  type PaymentStatus,
  type DeliveryStatus,
} from "@/lib/demo-purchase-invoices";
import { Plus, RotateCcw, Upload, Download } from "lucide-react";

const STORAGE_KEY = "erp_demo_purchase_invoices_v1";
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseTableDate(value?: string): Date | null {
  if (!value) return null;
  const parts = value.trim().split(" ");
  if (parts.length !== 3) return null;
  const [dd, mmm, yyyy] = parts;
  const day = Number(dd);
  const year = Number(yyyy);
  const monthIndex = monthNames.findIndex((m) => m.toLowerCase() === mmm.toLowerCase());
  if (!Number.isFinite(day) || !Number.isFinite(year) || monthIndex < 0) return null;
  const dt = new Date(year, monthIndex, day);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function parseInputDate(value?: string) {
  if (!value) return null;
  const dt = new Date(`${value}T00:00:00`);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export default function PurchaseInvoiceTable() {
  const [rows, setRows] = useState<PurchaseInvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // toolbar states
  const [department, setDepartment] = useState(""); // kept for UI consistency
  const [filterVendor, setFilterVendor] = useState("");
  const [status, setStatus] = useState<"" | PaymentStatus>("");
  const [delivery, setDelivery] = useState<"" | DeliveryStatus>("");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({
    from: "",
    to: "",
  });

  // load demo/local storage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as PurchaseInvoiceRow[];
          if (Array.isArray(parsed) && parsed.length) setRows(parsed);
          else setRows(DEMO_PURCHASE_INVOICES);
        } else {
          setRows(DEMO_PURCHASE_INVOICES);
        }
      } catch {
        setRows(DEMO_PURCHASE_INVOICES);
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // persist
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows, isHydrated]);

  const resetAll = () => {
    setDepartment("");
    setFilterVendor("");
    setStatus("");
    setDelivery("");
    setDateRange({ from: "", to: "" });
  };

  // filtered rows
  const filteredRows = useMemo(() => {
    const from = parseInputDate(dateRange.from);
    const to = parseInputDate(dateRange.to);

    return rows.filter((r) => {
      // department is placeholder for now (no column in design)
      if (filterVendor && r.vendor !== filterVendor) return false;
      if (status && r.paymentStatus !== status) return false;
      if (delivery && r.deliveryStatus !== delivery) return false;

      if (from || to) {
        const d = parseTableDate(r.invoiceDate);
        if (!d) return false;

        if (from && d < from) return false;

        if (to) {
          const end = new Date(to);
          end.setHours(23, 59, 59, 999);
          if (d > end) return false;
        }
      }

      return true;
    });
  }, [rows, filterVendor, status, delivery, dateRange.from, dateRange.to]);

  const toolbarItems: ToolbarItem[] = [
    {
      id: "add-new",
      type: "button",
      label: "Add New",
      icon: <Plus className="h-4 w-4" />,
      variant: "default",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      function: () => console.log("Add New Invoice"),
      position: "left",
    },

    {
      id: "department",
      type: "select",
      placeholder: "Department",
      value: department,
      options: [
        { label: "IT", value: "IT" },
        { label: "Admin", value: "Admin" },
        { label: "Finance", value: "Finance" },
        { label: "HR", value: "HR" },
      ],
      onChange: setDepartment,
      position: "left",
    },

    {
      id: "filter",
      type: "select",
      placeholder: "Filter",
      value: filterVendor,
      options: [
        { label: "NetWorld", value: "NetWorld" },
        { label: "SmartTech", value: "SmartTech" },
        { label: "TechVision", value: "TechVision" },
        { label: "SecureNet", value: "SecureNet" },
      ],
      onChange: setFilterVendor,
      position: "left",
    },

    {
      id: "status",
      type: "select",
      placeholder: "Status",
      value: status,
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Partially Paid", value: "Partially Paid" },
        { label: "Paid", value: "Paid" },
      ],
      onChange: (v) => setStatus(v as "" | PaymentStatus),
      position: "left",
    },

    {
      id: "columns",
      type: "columns",
      label: "Columns",
      position: "left",
    },

    {
      id: "reset",
      type: "button",
      label: "Reset",
      icon: <RotateCcw className="h-4 w-4" />,
      variant: "outline",
      disabled:
        !department && !filterVendor && !status && !delivery && !dateRange.from && !dateRange.to,
      function: resetAll,
      position: "left",
    },

    {
      id: "import",
      type: "button",
      label: "Import",
      icon: <Upload className="h-4 w-4" />,
      variant: "outline",
      function: () => console.log("Import clicked"),
      position: "left",
    },

    {
      id: "export",
      type: "button",
      label: "Export",
      icon: <Download className="h-4 w-4" />,
      variant: "outline",
      disabled: filteredRows.length === 0,
      function: () => console.log("Export clicked", filteredRows),
      position: "left",
    },

    {
      id: "date",
      type: "date-range",
      label: "Jan 2024 - Feb 2025",
      from: dateRange.from,
      to: dateRange.to,
      onChange: setDateRange,
      position: "right",
    },
  ];

  if (loading) {
    return (
      <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm p-6">
        <div className="text-sm text-gray-600">Loading purchase invoices...</div>
      </div>
    );
  }

  return (
    <DataTable
      columns={purchaseInvoiceColumns}
      data={filteredRows}
      toolbarItems={toolbarItems}
     
    />
  );
}