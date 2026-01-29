import * as Icons from "lucide-react";

/* ----------------------------------
   Types
----------------------------------- */

export type AssetItem = {
  key: string;
  label: string;
  value: number;
  iconKey: keyof typeof Icons;
};

/* ----------------------------------
   Demo Asset Data (SINGLE SOURCE)
----------------------------------- */

export const DEMO_ASSET_ITEMS: AssetItem[] = [
  { key: "asset", label: "Total Asset", value: 486, iconKey: "Box" },
  { key: "pc", label: "Total PC", value: 486, iconKey: "Monitor" },
  { key: "laptop", label: "Total Laptop", value: 312, iconKey: "Laptop" },
  { key: "server", label: "Total Server", value: 28, iconKey: "Server" },
  { key: "switch", label: "Total Switch", value: 64, iconKey: "Network" },
  { key: "router", label: "Total Router", value: 22, iconKey: "Router" },
  { key: "firewall", label: "Total Firewall", value: 8, iconKey: "Shield" },
  { key: "printer", label: "Total Printer", value: 41, iconKey: "Printer" },
  { key: "scanner", label: "Total Scanner", value: 19, iconKey: "ScanLine" },
  { key: "mobile", label: "Company Mobile", value: 132, iconKey: "Smartphone" },
  { key: "tablet", label: "Tablet", value: 36, iconKey: "Tablet" },
  { key: "tv", label: "Display / TV", value: 24, iconKey: "Tv" },
  { key: "ac", label: "Air Conditioner", value: 58, iconKey: "Snowflake" },
  { key: "cctv", label: "CCTV Camera", value: 112, iconKey: "Camera" },
  { key: "ups", label: "UPS", value: 77, iconKey: "BatteryCharging" },
  { key: "projector", label: "Projector", value: 14, iconKey: "Projector" },
  { key: "headphone", label: "Headphones", value: 96, iconKey: "Headphones" },
  { key: "mouse", label: "Mouse", value: 284, iconKey: "Mouse" },
  { key: "keyboard", label: "Keyboard", value: 271, iconKey: "Keyboard" },
  { key: "iot", label: "IoT Device", value: 39, iconKey: "Cpu" },
];
