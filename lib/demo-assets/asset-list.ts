export type AssetListRow = {
  sl: string;
  productId: string;
  productName: string;
  department: "IT" | "NON_IT";
  category: string;
  subCategory: string;
  brand: string;
  model: string;
  unit: string;
  priority: "High" | "Medium" | "Low";
  stock: number;
  minStock: number;
  reorder: number;
  price: number;
  vendor: string;
  createdDate: string;
};

export const DEMO_ASSET_LIST: AssetListRow[] = [
  {
    sl: "054",
    productId: "PRD-001",
    productName: "Laptop",
    department: "IT",
    category: "IT",
    subCategory: "Computer",
    brand: "HP",
    model: "ProBook 450 G8",
    unit: "Pcs",
    priority: "High",
    stock: 50,
    minStock: 10,
    reorder: 15,
    price: 65000,
    vendor: "TechVision Ltd",
    createdDate: "05 Jan 2025",
  },
  {
    sl: "053",
    productId: "PRD-002",
    productName: "Desktop",
    department: "IT",
    category: "IT",
    subCategory: "Computer",
    brand: "Dell",
    model: "OptiPlex 7010",
    unit: "Pcs",
    priority: "Medium",
    stock: 120,
    minStock: 8,
    reorder: 12,
    price: 82000,
    vendor: "SmartTech",
    createdDate: "07 Jan 2025",
  },
  {
    sl: "052",
    productId: "PRD-003",
    productName: "Server",
    department: "IT",
    category: "IT",
    subCategory: "Server",
    brand: "Dell",
    model: "PowerEdge R450",
    unit: "Pcs",
    priority: "High",
    stock: 8,
    minStock: 5,
    reorder: 7,
    price: 145000,
    vendor: "SecureNet",
    createdDate: "14 Jan 2025",
  },
  {
    sl: "051",
    productId: "PRD-004",
    productName: "Office Chair",
    department: "NON_IT",
    category: "Office Assets",
    subCategory: "Furniture",
    brand: "Otobi",
    model: "OC-202",
    unit: "Pcs",
    priority: "Low",
    stock: 18,
    minStock: 5,
    reorder: 7,
    price: 9500,
    vendor: "FurniWorld",
    createdDate: "12 Jan 2025",
  },
  {
    sl: "050",
    productId: "PRD-005",
    productName: "Printer",
    department: "NON_IT",
    category: "Office Equipment",
    subCategory: "Printing",
    brand: "Canon",
    model: "LBP2900",
    unit: "Pcs",
    priority: "Medium",
    stock: 4,
    minStock: 5,
    reorder: 7,
    price: 21000,
    vendor: "SmartTech",
    createdDate: "13 Jan 2025",
  },
];