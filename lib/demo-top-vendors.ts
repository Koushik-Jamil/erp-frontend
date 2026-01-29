export type TopVendorItem = {
  id: string;
  name: string;
  pct: number;      // must sum to 100 for this donut
  color: string;    // hex color for donut + pill
};

export type TopVendorsSummary = {
  centerLabel: string; // "100%"
  vendors: TopVendorItem[];
};

export const DEMO_TOP_VENDORS: TopVendorsSummary = {
  centerLabel: "100%",
  vendors: [
    { id: "a", name: "Vendor A", pct: 40, color: "#0A7BFF" },
    { id: "b", name: "Vendor B", pct: 35, color: "#FF8080" },
    { id: "c", name: "Vendor C", pct: 25, color: "#9FB0FF" },
  ],
};
