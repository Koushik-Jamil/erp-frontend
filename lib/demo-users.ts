export type AssetChip = {
  label: string;
  className: string;
};

export type AssetItem = {
  key: string;
  label: string;
  value: number;
  iconKey:
    | "box"
    | "monitor"
    | "laptop"
    | "server"
    | "network"
    | "router"
    | "shield"
    | "printer"
    | "scan"
    | "phone"
    | "tablet"
    | "tv"
    | "snowflake"
    | "camera"
    | "battery"
    | "projector"
    | "headphones"
    | "mouse"
    | "keyboard"
    | "cpu";
};

export type AssetSummaryData = {
  title: string;
  dateRangeLabel: string;
  chips: AssetChip[];
  items: AssetItem[];
};

export const DEMO_ASSET_SUMMARY: AssetSummaryData = {
  title: "Total Asset Summary",
  dateRangeLabel: "Jan 2024 - Feb 2025",
  chips: [
    { label: "In Use: 78%", className: "bg-[#3FA56E] text-white" },
    { label: "In Stock: 17%", className: "bg-[#0088FF] text-white" },
    { label: "Under Maintenance: 5%", className: "bg-[#FF817B] text-white" },
  ],
  items: [
    { key: "asset", label: "Total Asset", value: 486, iconKey: "box" },
    { key: "pc", label: "Total PC", value: 486, iconKey: "monitor" },
    { key: "laptop", label: "Total Laptop", value: 312, iconKey: "laptop" },
    { key: "server", label: "Total Server", value: 28, iconKey: "server" },
    { key: "switch", label: "Total Switch", value: 64, iconKey: "network" },
    { key: "router", label: "Total Router", value: 22, iconKey: "router" },
    { key: "firewall", label: "Total Firewall", value: 8, iconKey: "shield" },
    { key: "printer", label: "Total Printer", value: 41, iconKey: "printer" },
    { key: "scanner", label: "Total Scanner", value: 19, iconKey: "scan" },
    { key: "mobile", label: "Company Mobile", value: 132, iconKey: "phone" },
    { key: "tablet", label: "Tablet", value: 36, iconKey: "tablet" },
    { key: "tv", label: "Display / TV", value: 24, iconKey: "tv" },
    { key: "ac", label: "Air Conditioner", value: 58, iconKey: "snowflake" },
    { key: "cctv", label: "CCTV Camera", value: 112, iconKey: "camera" },
    { key: "ups", label: "UPS", value: 77, iconKey: "battery" },
    { key: "projector", label: "Projector", value: 14, iconKey: "projector" },
    { key: "headphone", label: "Headphones", value: 96, iconKey: "headphones" },
    { key: "mouse", label: "Mouse", value: 284, iconKey: "mouse" },
    { key: "keyboard", label: "Keyboard", value: 271, iconKey: "keyboard" },
    { key: "iot", label: "IoT Device", value: 39, iconKey: "cpu" },
  ],
};
