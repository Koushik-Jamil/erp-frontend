export type InventoryBarItem = {
  month: string;
  stockIn: number;
  stockOut: number;
};

export const DEMO_INVENTORY_IN_OUT: InventoryBarItem[] = [
  { month: "January", stockIn: 420, stockOut: 380 },
  { month: "February", stockIn: 390, stockOut: 410 },
  { month: "March", stockIn: 520, stockOut: 460 },
  { month: "April", stockIn: 480, stockOut: 500 },
  { month: "May", stockIn: 610, stockOut: 540 },
  { month: "June", stockIn: 560, stockOut: 580 },
  { month: "July", stockIn: 610, stockOut: 530 },
  { month: "August", stockIn: 680, stockOut: 610 },
  { month: "September", stockIn: 590, stockOut: 560 },
  { month: "October", stockIn: 710, stockOut: 640 },
  { month: "November", stockIn: 630, stockOut: 600 },
  { month: "December", stockIn: 650, stockOut: 620 },
];
