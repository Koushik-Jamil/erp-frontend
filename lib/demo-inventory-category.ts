export type InventoryCategoryItem = {
  key: string;
  name: string;
  pct: number;      // 0-100
  color: string;    // hex
};

export type InventoryCategorySummary = {
  items: InventoryCategoryItem[];
};

export const DEMO_INVENTORY_CATEGORY: InventoryCategorySummary = {
  items: [
    { key: "admin", name: "Admin", pct: 15, color: "#F58B59" },
    { key: "hr", name: "HR", pct: 25, color: "#7D93FF" },
    { key: "it", name: "IT", pct: 60, color: "#0A7BFF" },
  ],
};
