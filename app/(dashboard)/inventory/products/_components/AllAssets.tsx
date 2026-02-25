"use client";

import DataTable from "@/components/ui/DataTable";
import { Plus, RotateCcw, Download, Upload } from "lucide-react";
import { assetColumns } from "../_config/columns";
import { DEMO_ASSET_ROWS, type AssetRow } from "@/lib/demo-assets-table";
import { ToolbarItem } from "@/lib/toolbar/types";
import { useEffect, useMemo, useState } from "react";
import AddAsset, { type AssetFormValues } from "./AddAsset";

const STORAGE_KEY = "erp_demo_assets_table_v1";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDateForTable(date = new Date()) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mmm = monthNames[date.getMonth()];
  const yyyy = date.getFullYear();
  return `${dd} ${mmm} ${yyyy}`;
}

function getNextSl(rows: AssetRow[]) {
  const maxSl = rows.reduce((max, row) => {
    const n = Number(row.sl);
    return Number.isFinite(n) ? Math.max(max, n) : max;
  }, 0);

  return String(maxSl + 1).padStart(3, "0");
}

function getCategoryCode(category?: string) {
  const c = (category || "").toLowerCase();

  if (c.includes("it")) return "IT";
  if (c.includes("network")) return "NW";
  if (c.includes("office")) return "OF";
  if (c.includes("furniture")) return "FR";
  if (c.includes("vehicle")) return "VH";
  return "GEN";
}

function getNextProductId(rows: AssetRow[], category?: string) {
  const code = getCategoryCode(category);
  const count =
    rows.filter((r) => r.productId.includes(`PRD-${code}-`)).length + 1;
  return `PRD-${code}-${String(count).padStart(3, "0")}`;
}

function toNumber(value?: string) {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function mapFormToAssetRow(
  values: AssetFormValues,
  existingRows: AssetRow[],
): AssetRow {
  const category = values.assetCategory || "General";
  const subCategory = values.assetSubCategory || "General";
  const brand = values.brand || "-";
  const model = values.model || "-";

  const productName =
    values.deviceType?.trim() ||
    values.model?.trim() ||
    values.assetSubCategory?.trim() ||
    "New Asset";

  // Simple demo priority logic (you can refine later)
  const priority: AssetRow["priority"] =
    category === "IT" || subCategory === "Server"
      ? "High"
      : category === "Furniture"
        ? "Low"
        : "Medium";

  return {
    sl: getNextSl(existingRows),
    productId: getNextProductId(existingRows, category),
    productName,
    category,
    subCategory,
    brand,
    model,
    unit: values.unitType || "Pcs",
    priority,
    stock: 0,
    minStock: 0,
    reorder: 0,
    price: toNumber(values.purchaseCost),
    vendor: values.vendorName || "-",
    createdDate: formatDateForTable(),
  };
}

/** Parse "05 Jan 2025" -> Date */
function parseTableDate(value?: string): Date | null {
  if (!value) return null;

  const parts = value.trim().split(" ");
  if (parts.length !== 3) return null;

  const [dd, mmm, yyyy] = parts;
  const day = Number(dd);
  const year = Number(yyyy);
  const monthIndex = monthNames.findIndex(
    (m) => m.toLowerCase() === mmm.toLowerCase(),
  );

  if (!Number.isFinite(day) || !Number.isFinite(year) || monthIndex < 0) {
    return null;
  }

  const dt = new Date(year, monthIndex, day);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function parseInputDate(value?: string) {
  if (!value) return null; // YYYY-MM-DD
  const dt = new Date(`${value}T00:00:00`);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

const AllAssets = () => {
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);
  const [rows, setRows] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Toolbar states
  const [department, setDepartment] = useState("");
  const [quickFilter, setQuickFilter] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({
    from: "",
    to: "",
  });

  const handleAddButton = () => {
    setOpenAddAssetModal(true);
  };

  const handleResetToolbar = () => {
    setDepartment("");
    setQuickFilter("");
    setDateRange({ from: "", to: "" });
  };

  // Simulated API load (with localStorage fallback)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored) as AssetRow[];
          if (Array.isArray(parsed) && parsed.length) {
            setRows(parsed);
          } else {
            setRows(DEMO_ASSET_ROWS);
          }
        } else {
          setRows(DEMO_ASSET_ROWS);
        }
      } catch (error) {
        console.error("Failed to load assets from storage:", error);
        setRows(DEMO_ASSET_ROWS);
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    }, 400); // simulate API delay

    return () => clearTimeout(timer);
  }, []);

  // Persist demo data locally after initial load
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch (error) {
      console.error("Failed to save assets to storage:", error);
    }
  }, [rows, isHydrated]);

  const handleSaveAsset = (formData: AssetFormValues) => {
    setRows((prev) => {
      const newRow = mapFormToAssetRow(formData, prev);
      // prepend so newest appears on top
      return [newRow, ...prev];
    });
  };

  // Apply toolbar filters to demo rows
  const filteredRows = useMemo(() => {
    const fromDate = parseInputDate(dateRange.from);
    const toDate = parseInputDate(dateRange.to);

    return rows.filter((row) => {
      // Department filter (mapped to category)
      if (department) {
        const category = row.category.toLowerCase();
        const dep = department.toLowerCase();

        const departmentMatched =
          (dep === "it" && category.includes("it")) ||
          (dep === "network" && category.includes("network")) ||
          (dep === "office" && category.includes("office")) ||
          (dep === "general" && !category);

        if (!departmentMatched) return false;
      }

      // Quick filter
      if (quickFilter) {
        const stock = row.stock ?? 0;
        const minStock = row.minStock ?? 0;
        const reorder = row.reorder ?? 0;

        const isOutStock = stock <= 0;
        const isLowStock = stock > 0 && stock <= Math.max(minStock, reorder);
        const isInStock = stock > Math.max(minStock, reorder);

        if (quickFilter === "in_stock" && !isInStock) return false;
        if (quickFilter === "low_stock" && !isLowStock) return false;
        if (quickFilter === "out_stock" && !isOutStock) return false;
        if (quickFilter === "high_priority" && row.priority !== "High")
          return false;
      }

      // Date range filter (createdDate)
      if (fromDate || toDate) {
        const rowDate = parseTableDate(row.createdDate);
        if (!rowDate) return false;

        if (fromDate && rowDate < fromDate) return false;

        if (toDate) {
          const endOfDay = new Date(toDate);
          endOfDay.setHours(23, 59, 59, 999);
          if (rowDate > endOfDay) return false;
        }
      }

      return true;
    });
  }, [rows, department, quickFilter, dateRange.from, dateRange.to]);

  const toolbarItems: ToolbarItem[] = [
    {
      id: "add-asset",
      type: "button",
      label: "Add Asset",
      icon: <Plus className="w-4 h-4" />,
      variant: "default",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      rolesAllowed: ["ADMIN", "MANAGER"],
      permissionsAllowed: ["ASSET_ADD"],
      function: () => handleAddButton(),
      position: "left",
    },

    {
      id: "department",
      type: "select",
      label: "Department",
      placeholder: "Department",
      value: department,
      options: [
        { label: "IT", value: "IT" },
        { label: "Network", value: "NETWORK" },
        { label: "Office", value: "OFFICE" },
      ],
      onChange: (value) => setDepartment(value),
      position: "left",
    },

    {
      id: "filter",
      type: "select",
      label: "Filter",
      placeholder: "Filter",
      value: quickFilter,
      options: [
        { label: "In Stock", value: "in_stock" },
        { label: "Low Stock", value: "low_stock" },
        { label: "Out of Stock", value: "out_stock" },
        { label: "High Priority", value: "high_priority" },
      ],
      onChange: (value) => setQuickFilter(value),
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
      icon: <RotateCcw className="w-4 h-4" />,
      variant: "outline",
      disabled:
        !department &&
        !quickFilter &&
        !dateRange.from &&
        !dateRange.to,
      function: () => handleResetToolbar(),
      position: "left",
    },

    {
      id: "import",
      type: "button",
      label: "Import",
      icon: <Upload className="w-4 h-4" />,
      variant: "outline",
      function: () => {
        console.log("Import clicked");
        // TODO: open import modal / file picker
      },
      position: "left",
    },

    {
      id: "export",
      type: "button",
      label: "Export",
      icon: <Download className="w-4 h-4" />,
      variant: "outline",
      disabled: filteredRows.length === 0,
      function: () => {
        console.log("Export clicked", filteredRows);
        // TODO: export filteredRows to CSV / Excel
      },
      position: "left",
    },

    {
      id: "date-range",
      type: "date-range",
      label: "Date",
      from: dateRange.from,
      to: dateRange.to,
      onChange: (range) => setDateRange(range),
      position: "right",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm p-6">
          <div className="text-sm text-gray-600">Loading assets...</div>
        </div>
      ) : (
        <DataTable
          columns={assetColumns}
          data={filteredRows}
          toolbarItems={toolbarItems}
        />
      )}

      <AddAsset
        open={openAddAssetModal}
        onClose={() => setOpenAddAssetModal(false)}
        onSave={handleSaveAsset}
      />
    </>
  );
};

export default AllAssets;