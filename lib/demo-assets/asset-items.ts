export type AssetItemRow = {
  sl: string;
  assetId: string;
  serialNo: string;
  barCode: string;
  vendorName: string;
  purchaseDate: string;
  warrantyExpiry: string;
  processor: string;
  ram: string;
  storage: string;
  macAddress: string;
  ipAddress: string;
  hostname: string;
};

export const DEMO_ASSET_ITEMS_BY_VARIANT: Record<string, AssetItemRow[]> = {
  "VAR-001": [
    {
      sl: "001",
      assetId: "AST-2025-001",
      serialNo: "SN123456789",
      barCode: "BC-001",
      vendorName: "TechVision Ltd",
      purchaseDate: "15 Jan 2025",
      warrantyExpiry: "15 Jan 2027",
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "512GB SSD",
      macAddress: "00:1A:2B:3C:4D:5E",
      ipAddress: "192.168.1.10",
      hostname: "HP-PRBOOK-001",
    },
    {
      sl: "002",
      assetId: "AST-2025-002",
      serialNo: "SN987654321",
      barCode: "BC-002",
      vendorName: "TechVision Ltd",
      purchaseDate: "16 Jan 2025",
      warrantyExpiry: "16 Jan 2027",
      processor: "Intel Core i5",
      ram: "8 GB",
      storage: "256GB SSD",
      macAddress: "00:1A:2B:3C:4D:5F",
      ipAddress: "192.168.1.11",
      hostname: "HP-PRBOOK-002",
    },
  ],
  "VAR-002": [
    {
      sl: "003",
      assetId: "AST-2025-003",
      serialNo: "SN111222333",
      barCode: "BC-003",
      vendorName: "Digital Solutions Inc",
      purchaseDate: "10 Jan 2025",
      warrantyExpiry: "10 Jan 2027",
      processor: "Intel Core i7",
      ram: "32 GB",
      storage: "1TB SSD",
      macAddress: "00:1A:2B:3C:4D:60",
      ipAddress: "192.168.1.20",
      hostname: "HP-ELITE-001",
    },
  ],
  "VAR-003": [
    {
      sl: "004",
      assetId: "AST-2025-004",
      serialNo: "SN444555666",
      barCode: "BC-004",
      vendorName: "Hardware Corp",
      purchaseDate: "20 Jan 2025",
      warrantyExpiry: "20 Jan 2026",
      processor: "Intel Core i5",
      ram: "8 GB",
      storage: "256GB SSD",
      macAddress: "00:1A:2B:3C:4D:61",
      ipAddress: "192.168.1.30",
      hostname: "DELL-LAT-001",
    },
  ],
};
