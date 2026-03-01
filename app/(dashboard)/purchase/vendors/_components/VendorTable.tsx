"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { ToolbarItem } from "@/lib/toolbar/types";
import { vendorColumns } from "../_config/columns";
import { DEMO_VENDORS, type VendorRow, type VendorStatus } from "@/lib/demo-vendors";
import { Plus, RotateCcw, Upload, Download } from "lucide-react";

const STORAGE_KEY = "erp_demo_vendors_v1";
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseInputDate(value?: string) {
  if (!value) return null;
  const dt = new Date(`${value}T00:00:00`);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

// Vendor table doesn't have date column in screenshot, but toolbar has date range.
// We'll just keep the UI and not filter by date until you add vendor createdDate later.
export default function VendorTable() {
  const [rows, setRows] = useState<VendorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // toolbar state
  const [department, setDepartment] = useState(""); // kept for design consistency
  const [filterCategory, setFilterCategory] = useState("");
  const [status, setStatus] = useState<"" | VendorStatus>("");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({
    from: "",
    to: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as VendorRow[];
          if (Array.isArray(parsed) && parsed.length) setRows(parsed);
          else setRows(DEMO_VENDORS);
        } else {
          setRows(DEMO_VENDORS);
        }
      } catch {
        setRows(DEMO_VENDORS);
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows, isHydrated]);

  const resetAll = () => {
    setDepartment("");
    setFilterCategory("");
    setStatus("");
    setDateRange({ from: "", to: "" });
  };

  const filteredRows = useMemo(() => {
    // dateRange currently unused, placeholder for future vendor created date
    parseInputDate(dateRange.from);
    parseInputDate(dateRange.to);

    return rows.filter((r) => {
      if (filterCategory && r.category !== filterCategory) return false;
      if (status && r.status !== status) return false;
      return true;
    });
  }, [rows, filterCategory, status, dateRange.from, dateRange.to]);

  const toolbarItems: ToolbarItem[] = [
    {
      id: "add-new",
      type: "button",
      label: "Add New",
      icon: <Plus className="h-4 w-4" />,
      variant: "default",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      function: () => console.log("Add Vendor"),
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
      value: filterCategory,
      options: [
        { label: "IT Equipment", value: "IT Equipment" },
        { label: "IT & Office", value: "IT & Office" },
        { label: "Network", value: "Network" },
        { label: "Network Security", value: "Network Security" },
        { label: "Office Assets", value: "Office Assets" },
      ],
      onChange: setFilterCategory,
      position: "left",
    },
    {
      id: "status",
      type: "select",
      placeholder: "Status",
      value: status,
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      onChange: (v) => setStatus(v as "" | VendorStatus),
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
      disabled: !department && !filterCategory && !status && !dateRange.from && !dateRange.to,
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
        <div className="text-sm text-gray-600">Loading vendors...</div>
      </div>
    );
  }

  return (
    <DataTable
      columns={vendorColumns}
      data={filteredRows}
      toolbarItems={toolbarItems}
    />
  );
}