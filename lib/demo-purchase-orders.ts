export type DeliveryStatus = "Delivered" | "In Transit" | "Pending" | "Received";
export type PaymentStatus = "Paid" | "Unpaid" | "Pending";
export type ApprovalStatus = "Approved" | "Pending" | "Rejected";

export type PurchaseOrderRow = {
  sl: string;
  poNo: string;
  poDate: string;     // "10 Jan 2025"
  reqId: string;      // "REQ-00124"
  department: string; // IT/Admin/Finance/HR
  vendor: string;
  deliveryDate: string;
  deliveryStatus: DeliveryStatus;
  items: number;
  amount: number;     // 420000
  payment: PaymentStatus;
  approval: ApprovalStatus;
  updated: string;
};

export const DEMO_PURCHASE_ORDERS: PurchaseOrderRow[] = [
  {
    sl: "054",
    poNo: "PO-4589",
    poDate: "10 Jan 2025",
    reqId: "REQ-00124",
    department: "IT",
    vendor: "TechVision",
    deliveryDate: "20 Jan 2025",
    deliveryStatus: "Delivered",
    items: 10,
    amount: 420000,
    payment: "Paid",
    approval: "Approved",
    updated: "20 Jan 2025",
  },
  {
    sl: "053",
    poNo: "PO-4590",
    poDate: "12 Jan 2025",
    reqId: "REQ-00125",
    department: "Admin",
    vendor: "SmartTech",
    deliveryDate: "25 Jan 2025",
    deliveryStatus: "In Transit",
    items: 25,
    amount: 87500,
    payment: "Unpaid",
    approval: "Approved",
    updated: "18 Jan 2025",
  },
  {
    sl: "052",
    poNo: "PO-4592",
    poDate: "15 Jan 2025",
    reqId: "REQ-00126",
    department: "Finance",
    vendor: "NetWorld",
    deliveryDate: "28 Jan 2025",
    deliveryStatus: "Pending",
    items: 5,
    amount: 650000,
    payment: "Pending",
    approval: "Approved",
    updated: "15 Jan 2025",
  },
  {
    sl: "051",
    poNo: "PO-4594",
    poDate: "18 Jan 2025",
    reqId: "REQ-00127",
    department: "HR",
    vendor: "OfficePlus",
    deliveryDate: "30 Jan 2025",
    deliveryStatus: "Pending",
    items: 40,
    amount: 36000,
    payment: "Unpaid",
    approval: "Pending",
    updated: "18 Jan 2025",
  },
  {
    sl: "050",
    poNo: "PO-4596",
    poDate: "20 Jan 2025",
    reqId: "REQ-00128",
    department: "IT",
    vendor: "NetWorld",
    deliveryDate: "02 Feb 2025",
    deliveryStatus: "Received",
    items: 3,
    amount: 210000,
    payment: "Paid",
    approval: "Approved",
    updated: "02 Feb 2025",
  },
];