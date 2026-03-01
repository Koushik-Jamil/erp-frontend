export type ApprovalState = "Approved" | "Pending" | "Rejected" | "—";
export type Priority = "High" | "Medium" | "Low";
export type PRStatus =
  | "PO Created"
  | "Pending Finance"
  | "Pending Dept Head"
  | "Delivered"
  | "Received";

export type PurchaseRequisitionRow = {
  sl: string;
  reqId: string;
  date: string; // "05 Jan 2025"
  department: string; // IT/Admin/Finance/HR
  requestedBy: string;
  category: string; // IT Equipment/Office/Network
  product: string;
  qty: number;
  priority: Priority;
  deptHead: ApprovalState;
  finance: ApprovalState;
  status: PRStatus;
  poNo: string; // "PO-4589" or "—"
  vendor: string; // "TechVision" or "—"
};

export const DEMO_PURCHASE_REQUISITIONS: PurchaseRequisitionRow[] = [
  {
    sl: "054",
    reqId: "REQ-00124",
    date: "05 Jan 2025",
    department: "IT",
    requestedBy: "Sakib",
    category: "IT Equipment",
    product: "Monitor",
    qty: 10,
    priority: "High",
    deptHead: "Approved",
    finance: "Approved",
    status: "PO Created",
    poNo: "PO-4589",
    vendor: "TechVision",
  },
  {
    sl: "053",
    reqId: "REQ-00125",
    date: "08 Jan 2025",
    department: "Admin",
    requestedBy: "Rahim",
    category: "Office",
    product: "Keyboard",
    qty: 25,
    priority: "Medium",
    deptHead: "Approved",
    finance: "Pending",
    status: "Pending Finance",
    poNo: "—",
    vendor: "—",
  },
  {
    sl: "052",
    reqId: "REQ-00126",
    date: "12 Jan 2025",
    department: "Finance",
    requestedBy: "Karim",
    category: "IT Equipment",
    product: "Laptop",
    qty: 5,
    priority: "High",
    deptHead: "Approved",
    finance: "Approved",
    status: "Delivered",
    poNo: "PO-4592",
    vendor: "SmartTech",
  },
  {
    sl: "051",
    reqId: "REQ-00127",
    date: "15 Jan 2025",
    department: "HR",
    requestedBy: "Nusrat",
    category: "Office",
    product: "Mouse",
    qty: 40,
    priority: "Low",
    deptHead: "Pending",
    finance: "—",
    status: "Pending Dept Head",
    poNo: "—",
    vendor: "—",
  },
  {
    sl: "050",
    reqId: "REQ-00128",
    date: "18 Jan 2025",
    department: "IT",
    requestedBy: "Tania",
    category: "Network",
    product: "Switch",
    qty: 3,
    priority: "Medium",
    deptHead: "Approved",
    finance: "Approved",
    status: "Received",
    poNo: "PO-4596",
    vendor: "NetWorld",
  },
];