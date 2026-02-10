// app/(dashboard)/inventory/requisitions/_config/status-map.ts

export const REQUISITION_STATUS_MAP = {
  PENDING_DEPT_HEAD: {
    label: "Pending Dept Head",
    className: "bg-yellow-100 text-yellow-700",
  },
  PENDING_FINANCE: {
    label: "Pending Finance",
    className: "bg-yellow-100 text-yellow-700",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
  },
  PO_CREATED: {
    label: "PO Created",
    className: "bg-blue-100 text-blue-700",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-100 text-emerald-700",
  },
  RECEIVED: {
    label: "Received",
    className: "bg-indigo-100 text-indigo-700",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
  },
} as const;
