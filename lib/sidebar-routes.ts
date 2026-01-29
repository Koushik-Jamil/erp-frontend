import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  PackagePlus,
  FileText,
  Users,
  Building2,
  GitBranch,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export type Permission =
  | "VIEW_DASHBOARD"
  | "PRODUCT_VIEW"
  | "PRODUCT_CONFIG"
  | "PURCHASE_VENDOR"
  | "PURCHASE_REQUISITION"
  | "PURCHASE_ORDER"
  | "PURCHASE_INVOICE"
  | "INVENTORY_ADD_PRODUCT"
  | "INVENTORY_REQUISITION"
  | "REPORTS_VIEW"
  | "INVENTORY_CONFIG"
  | "USER_VIEW"
  | "USER_ADD"
  | "USER_CONFIG"
  | "DEPARTMENT_VIEW"
  | "DEPARTMENT_CONFIG"
  | "PROCESS_VIEW"
  | "PROCESS_ADD"
  | "PROCESS_CONFIG"
  | "ROLE_BACK_PERMISSION"
  | "LOGOUT";

export type SidebarRouteItem = {
  name: string;
  href?: string;
  icon: LucideIcon;
  className?: string;
  permission?: Permission[];
  subItems?: SidebarRouteItem[];
};

export const sidebar_routes: SidebarRouteItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: ["VIEW_DASHBOARD"],
  },
  {
    name: "TICKETS",
    icon: PackagePlus,
    permission: [
    ],
    subItems: [
      {
        name: "All Tickets",
        href: "/tickets/all-tickets",
        icon: PackagePlus,
        permission: [],
      },
      {
        name: "My Tickets",
        href: "/tickets/my-tickets",
        icon: FileText,
        permission: [],
      },
    ],
  },

  {
    name: "Product",
    icon: Boxes,
    permission: ["PRODUCT_VIEW", "PRODUCT_CONFIG"],
    subItems: [
      {
        name: "Product List",
        href: "/products",
        icon: FileText,
        permission: ["PRODUCT_VIEW"],
      },
      {
        name: "Product Configuration",
        href: "/products/config",
        icon: PackagePlus,
        permission: ["PRODUCT_CONFIG"],
      },
    ],
  },

  {
    name: "Purchase",
    icon: ShoppingCart,
    permission: [
      "PURCHASE_VENDOR",
      "PURCHASE_REQUISITION",
      "PURCHASE_ORDER",
      "PURCHASE_INVOICE",
    ],
    subItems: [
      {
        name: "Vendor",
        href: "/purchase/vendors",
        icon: Building2,
        permission: ["PURCHASE_VENDOR"],
      },
      {
        name: "Purchase Requisition",
        href: "/purchase/requisition",
        icon: FileText,
        permission: ["PURCHASE_REQUISITION"],
      },
      {
        name: "Purchase Order",
        href: "/purchase/order",
        icon: FileText,
        permission: ["PURCHASE_ORDER"],
      },
      {
        name: "Purchase Invoice",
        href: "/purchase/invoice",
        icon: FileText,
        permission: ["PURCHASE_INVOICE"],
      },
    ],
  },

  {
    name: "Inventory",
    icon: PackagePlus,
    permission: [
      "INVENTORY_ADD_PRODUCT",
      "INVENTORY_REQUISITION",
      "REPORTS_VIEW",
      "INVENTORY_CONFIG",
    ],
    subItems: [
      {
        name: "Add Product",
        href: "/inventory/add-product",
        icon: PackagePlus,
        permission: ["INVENTORY_ADD_PRODUCT"],
      },
      {
        name: "Product Requisition",
        href: "/inventory/requisition",
        icon: FileText,
        permission: ["INVENTORY_REQUISITION"],
      },
      {
        name: "Reports",
        href: "/reports",
        icon: FileText,
        permission: ["REPORTS_VIEW"],
      },
      {
        name: "Inventory Configuration",
        href: "/inventory/config",
        icon: GitBranch,
        permission: ["INVENTORY_CONFIG"],
      },
    ],
  },

  {
    name: "User",
    icon: Users,
    permission: ["USER_VIEW", "USER_ADD", "USER_CONFIG"],
    subItems: [
      {
        name: "User List",
        href: "/users",
        icon: Users,
        permission: ["USER_VIEW"],
      },
      {
        name: "Add User",
        href: "/users/new",
        icon: PackagePlus,
        permission: ["USER_ADD"],
      },
      {
        name: "User Configuration",
        href: "/users/config",
        icon: GitBranch,
        permission: ["USER_CONFIG"],
      },
    ],
  },

  {
    name: "Department",
    icon: Building2,
    permission: ["DEPARTMENT_VIEW", "DEPARTMENT_CONFIG"],
    subItems: [
      {
        name: "Department List",
        href: "/departments",
        icon: Building2,
        permission: ["DEPARTMENT_VIEW"],
      },
      {
        name: "Department Configuration",
        href: "/departments/config",
        icon: GitBranch,
        permission: ["DEPARTMENT_CONFIG"],
      },
    ],
  },

  {
    name: "Process",
    icon: GitBranch,
    permission: ["PROCESS_VIEW", "PROCESS_ADD", "PROCESS_CONFIG"],
    subItems: [
      {
        name: "Process List",
        href: "/process",
        icon: GitBranch,
        permission: ["PROCESS_VIEW"],
      },
      {
        name: "Add Process",
        href: "/process/new",
        icon: PackagePlus,
        permission: ["PROCESS_ADD"],
      },
      {
        name: "Process Configuration",
        href: "/process/config",
        icon: GitBranch,
        permission: ["PROCESS_CONFIG"],
      },
    ],
  },

  {
    name: "Role back Permission",
    href: "/role-back-permission",
    icon: ShieldCheck,
    permission: ["ROLE_BACK_PERMISSION"],
  },

  {
    name: "Logout",
    href: "/logout",
    icon: LogOut,
    permission: ["LOGOUT"],
  },
];
