import type { Requisition } from "@/app/(dashboard)/inventory/requisitions/_types/requisition";

/* ----------------------------------
   Demo Requisition Data
   (API-like structure)
----------------------------------- */

export const DEMO_REQUISITIONS: Requisition[] = [
  {
    id: "REQ-00124",
    reqNo: "REQ-00124",
    date: "2025-01-05",
    department: "IT",
    requestedBy: "Sakib",
    category: "IT Equipment",
    product: "Monitor",
    qty: 10,
    priority: "HIGH",
    deptHeadStatus: "APPROVED",
    financeStatus: "APPROVED",
    status: "PO_CREATED",
    poNo: "PO-4589",
    vendor: "TechVision",
  },
  {
    id: "REQ-00125",
    reqNo: "REQ-00125",
    date: "2025-01-08",
    department: "Finance",
    requestedBy: "Rahim",
    category: "Office Supplies",
    product: "Printer",
    qty: 2,
    priority: "MEDIUM",
    deptHeadStatus: "APPROVED",
    financeStatus: "PENDING",
    status: "PENDING_FINANCE",
  },
  {
    id: "REQ-00126",
    reqNo: "REQ-00126",
    date: "2025-01-10",
    department: "HR",
    requestedBy: "Nusrat",
    category: "Furniture",
    product: "Office Chair",
    qty: 5,
    priority: "LOW",
    deptHeadStatus: "PENDING",
    financeStatus: "PENDING",
    status: "PENDING_DEPT_HEAD",
  },
];
