export type PaymentStatus = "Pending" | "Partially Paid" | "Paid";
export type DeliveryStatus = "Delivered" | "Received" | "In Transit";

export type PurchaseInvoiceRow = {
  sl: string;
  invoiceNo: string;
  invoiceDate: string; // "05 Feb 2026"
  poNo: string;        // "PO-1001"
  vendor: string;
  items: number;
  subtotal: number;
  vat: string;         // "15%"
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  dueDate: string;     // "20 Feb 2026"
  deliveryStatus: DeliveryStatus;
};

export const DEMO_PURCHASE_INVOICES: PurchaseInvoiceRow[] = [
  {
    sl: "054",
    invoiceNo: "INV-1001",
    invoiceDate: "05 Feb 2026",
    poNo: "PO-1001",
    vendor: "NetWorld",
    items: 6,
    subtotal: 288000,
    vat: "15%",
    discount: 0,
    total: 331200,
    paymentStatus: "Pending",
    dueDate: "20 Feb 2026",
    deliveryStatus: "Delivered",
  },
  {
    sl: "053",
    invoiceNo: "INV-1002",
    invoiceDate: "08 Feb 2026",
    poNo: "PO-1002",
    vendor: "SmartTech",
    items: 10,
    subtotal: 820000,
    vat: "15%",
    discount: 10000,
    total: 943000,
    paymentStatus: "Partially Paid",
    dueDate: "25 Feb 2026",
    deliveryStatus: "Received",
  },
  {
    sl: "052",
    invoiceNo: "INV-1003",
    invoiceDate: "10 Feb 2026",
    poNo: "PO-1003",
    vendor: "TechVision",
    items: 5,
    subtotal: 325000,
    vat: "15%",
    discount: 5000,
    total: 368750,
    paymentStatus: "Paid",
    dueDate: "28 Feb 2026",
    deliveryStatus: "Received",
  },
  {
    sl: "051",
    invoiceNo: "INV-1004",
    invoiceDate: "12 Feb 2026",
    poNo: "PO-1004",
    vendor: "SecureNet",
    items: 2,
    subtotal: 290000,
    vat: "15%",
    discount: 0,
    total: 333500,
    paymentStatus: "Pending",
    dueDate: "02 Mar 2026",
    deliveryStatus: "In Transit",
  },
];