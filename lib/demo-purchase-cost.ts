export type PurchaseCostItem = {
  month: string;
  value: number;
};

export const DEMO_PURCHASE_COST: PurchaseCostItem[] = [
  { month: "January", value: 1_200_000 },
  { month: "February", value: 980_000 },
  { month: "March", value: 1_600_000 },
  { month: "April", value: 1_100_000 },
  { month: "May", value: 560_000 },
  { month: "June", value: 420_000 },
  { month: "July", value: 820_000 },
  { month: "August", value: 1_450_000 },
  { month: "September", value: 690_000 },
  { month: "October", value: 1_780_000 },
  { month: "November", value: 930_000 },
  { month: "December", value: 1_250_000 },
];
