export type AssetVariantRow = {
  sl: string;
  variantId: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  stock: number;
  available: number;
  assigned: number;
  damaged: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export const DEMO_ASSET_VARIANTS: Record<string, AssetVariantRow[]> = {
  "PRD-001": [
    {
      sl: "054",
      variantId: "VAR-001",
      brand: "HP",
      model: "ProBook 450 G8",
      processor: "Computer",
      ram: "16 GB",
      storage: "512GB SSD",
      stock: 8,
      available: 6,
      assigned: 2,
      damaged: 0,
      status: "In Stock",
    },
    {
      sl: "053",
      variantId: "VAR-002",
      brand: "HP",
      model: "EliteBook 840 G7",
      processor: "Computer",
      ram: "16 GB",
      storage: "1TB SSD",
      stock: 5,
      available: 4,
      assigned: 1,
      damaged: 0,
      status: "In Stock",
    },
    {
      sl: "052",
      variantId: "VAR-003",
      brand: "Dell",
      model: "Latitude 5420",
      processor: "Server",
      ram: "8 GB",
      storage: "256GB SSD",
      stock: 6,
      available: 3,
      assigned: 2,
      damaged: 1,
      status: "Low Stock",
    },
  ],
};