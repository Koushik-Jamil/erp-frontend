// app/(dashboard)/inventory/requisitions/_types/requisition.ts

export type RequisitionStatus =
  | "PENDING_DEPT_HEAD"
  | "PENDING_FINANCE"
  | "APPROVED"
  | "PO_CREATED"
  | "DELIVERED"
  | "RECEIVED"
  | "REJECTED";

export type RequisitionPriority = "LOW" | "MEDIUM" | "HIGH";

export type Requisition = {
  id: string;
  reqNo: string;
  date: string;
  department: string;
  requestedBy: string;
  category: string;
  product: string;
  qty: number;
  priority: RequisitionPriority;
  deptHeadStatus?: "APPROVED" | "PENDING";
  financeStatus?: "APPROVED" | "PENDING";
  status: RequisitionStatus;
  poNo?: string;
  vendor?: string;
};
