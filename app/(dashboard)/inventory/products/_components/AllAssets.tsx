"use client";

import DataTable from "@/components/ui/DataTable";
import { Plus } from "lucide-react";
import { assetColumns } from "../_config/columns";
import { DEMO_ASSET_ROWS, type AssetRow } from "@/lib/demo-assets-table";
import { ToolbarItem } from "@/lib/toolbar/types";
import { useEffect, useMemo, useState } from "react";
import AddAsset, { type AssetFormValues } from "./AddAsset";

const STORAGE_KEY = "erp_demo_assets_table_v1";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
  const count = rows.filter((r) => r.productId.includes(`PRD-${code}-`)).length + 1;
  return `PRD-${code}-${String(count).padStart(3, "0")}`;
}

function toNumber(value?: string) {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function mapFormToAssetRow(values: AssetFormValues, existingRows: AssetRow[]): AssetRow {
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

const AllAssets = () => {
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);
  const [rows, setRows] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  const handleAddButton = () => {
    setOpenAddAssetModal(true);
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

  const buttons: ToolbarItem[] = useMemo(
    () => [
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
      },
    ],
    [],
  );

  return (
    <>
      {loading ? (
        <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm p-6">
          <div className="text-sm text-gray-600">Loading assets...</div>
        </div>
      ) : (
        <DataTable columns={assetColumns} data={rows} toolbarItems={buttons} />
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