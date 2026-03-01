export type VendorStatus = "Active" | "Inactive";

export type VendorRow = {
  sl: string;
  vendorCode: string;
  vendorName: string;
  type: "Supplier" | "Distributor" | "Manufacturer";
  category: string;
  contact: string;
  phone: string;
  paymentTerms: string;   // "30 Days"
  deliveryTime: string;   // "7 Days"
  rating: number;         // 4.5
  qty: number;            // 10
  status: VendorStatus;
};

export const DEMO_VENDORS: VendorRow[] = [
  {
    sl: "054",
    vendorCode: "VND-001",
    vendorName: "TechVision Ltd",
    type: "Supplier",
    category: "IT Equipment",
    contact: "Arif Hossain",
    phone: "01711-223344",
    paymentTerms: "30 Days",
    deliveryTime: "7 Days",
    rating: 4.5,
    qty: 10,
    status: "Active",
  },
  {
    sl: "053",
    vendorCode: "VND-002",
    vendorName: "SmartTech Solutions",
    type: "Distributor",
    category: "IT & Office",
    contact: "Mizan Rahman",
    phone: "01819-334455",
    paymentTerms: "45 Days",
    deliveryTime: "10 Days",
    rating: 4.2,
    qty: 25,
    status: "Active",
  },
  {
    sl: "052",
    vendorCode: "VND-003",
    vendorName: "NetWorld Systems",
    type: "Supplier",
    category: "Network",
    contact: "Tanvir Alam",
    phone: "01922-556677",
    paymentTerms: "30 Days",
    deliveryTime: "5 Days",
    rating: 4.8,
    qty: 5,
    status: "Active",
  },
  {
    sl: "051",
    vendorCode: "VND-004",
    vendorName: "SecureNet BD",
    type: "Manufacturer",
    category: "Network Security",
    contact: "Rakib Hasan",
    phone: "01678-889900",
    paymentTerms: "Advance",
    deliveryTime: "12 Days",
    rating: 4.0,
    qty: 40,
    status: "Active",
  },
  {
    sl: "050",
    vendorCode: "VND-005",
    vendorName: "OfficePlus Furnishers",
    type: "Supplier",
    category: "Office Assets",
    contact: "Jannat Akter",
    phone: "01733-778899",
    paymentTerms: "60 Days",
    deliveryTime: "15 Days",
    rating: 3.9,
    qty: 3,
    status: "Inactive",
  },
];