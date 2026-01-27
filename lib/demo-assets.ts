import type { LucideIcon } from "lucide-react";
export type AssetItem = {
  key: string;
  label: string;
  value: number;
  icon: keyof typeof iconMap;
};
export const iconMap = {
  asset: "Box",
  pc: "Monitor",
  laptop: "Laptop",
  server: "Server",
  switch: "Network",
  router: "Router",
  firewall: "Shield",
  printer: "Printer",
  scanner: "ScanLine",
  mobile: "Smartphone",
  tablet: "Tablet",
  tv: "Tv",
  ac: "Snowflake",
  cctv: "Camera",
  ups: "BatteryCharging",
  projector: "Projector",
  headphone: "Headphones",
  mouse: "Mouse",
  keyboard: "Keyboard",
  iot: "Cpu",
} as const;





export const DEMO_ASSET_ITEMS: AssetItem[] = [
  { key: "asset", label: "Total Asset", value: 486, icon: "asset" },
  { key: "pc", label: "Total PC", value: 486, icon: "pc" },
  { key: "laptop", label: "Total Laptop", value: 312, icon: "laptop" },
  { key: "server", label: "Total Server", value: 28, icon: "server" },
  { key: "switch", label: "Total Switch", value: 64, icon: "switch" },
  { key: "router", label: "Total Router", value: 22, icon: "router" },
  { key: "firewall", label: "Total Firewall", value: 8, icon: "firewall" },
  { key: "printer", label: "Total Printer", value: 41, icon: "printer" },
  { key: "scanner", label: "Total Scanner", value: 19, icon: "scanner" },
  { key: "mobile", label: "Company Mobile", value: 132, icon: "mobile" },
  { key: "tablet", label: "Tablet", value: 36, icon: "tablet" },
  { key: "tv", label: "Display / TV", value: 24, icon: "tv" },
  { key: "ac", label: "Air Conditioner", value: 58, icon: "ac" },
  { key: "cctv", label: "CCTV Camera", value: 112, icon: "cctv" },
  { key: "ups", label: "UPS", value: 77, icon: "ups" },
  { key: "projector", label: "Projector", value: 14, icon: "projector" },
  { key: "headphone", label: "Headphones", value: 96, icon: "headphone" },
  { key: "mouse", label: "Mouse", value: 284, icon: "mouse" },
  { key: "keyboard", label: "Keyboard", value: 271, icon: "keyboard" },
  { key: "iot", label: "IoT Device", value: 39, icon: "iot" },
];