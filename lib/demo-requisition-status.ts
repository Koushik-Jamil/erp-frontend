export type ReqStatusKey = "pending" | "approved" | "rejected" | "completed";

export type ReqStatusItem = {
  key: ReqStatusKey;
  label: string;
  value: number;
  color: string; // hex
};

export type ReqStatusSummary = {
  title: string;
  totalLabel: string;
  total: number;
  items: ReqStatusItem[];
};

export const DEMO_REQ_STATUS_OVERVIEW: ReqStatusSummary = {
  title: "Requisitions Status Overview",
  totalLabel: "Requisitions",
  total: 835,
  items: [
    { key: "pending", label: "Pending", value: 524, color: "#FFB689" },    // peach
    { key: "approved", label: "Approved", value: 275, color: "#0088FF" },  // blue
    { key: "rejected", label: "Rejected", value: 145, color: "#FF817B" },  // pink/red
    { key: "completed", label: "Completed", value: 145, color: "#3FA56E" } // green
  ],
};
