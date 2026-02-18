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

/* ----------------------------------
   Permissions
----------------------------------- */

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

/* ----------------------------------
   Sidebar Route Type
----------------------------------- */

export type SidebarRouteItem = {
  name: string;
  href?: string;
  icon: LucideIcon;
  title?: string;          
  className?: string;
  permission?: Permission[];
  subItems?: SidebarRouteItem[];
};

/* ----------------------------------
   Sidebar Routes
----------------------------------- */

export const sidebar_routes: SidebarRouteItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    permission: ["VIEW_DASHBOARD"],
  },

  {
    name: "TICKETS",
    icon: PackagePlus,
    permission: [],
    subItems: [
      {
        name: "All Tickets",
        href: "/tickets/all-tickets",
        title: "All Tickets",
        icon: PackagePlus,
        permission: [],
      },
      {
        name: "My Tickets",
        href: "/tickets/my-tickets",
        title: "My Tickets",
        icon: FileText,
        permission: [],
      },
    ],
  },
   {
        name: "Product List",
        href: "/products",
        title: "Product List",
        icon: FileText,
        permission: ["PRODUCT_VIEW"],
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
        title: "Vendors",
        icon: Building2,
        permission: ["PURCHASE_VENDOR"],
      },
      {
        name: "Purchase Requisitions",
        href: "/purchase/requisitions", 
        title: "Requisitions Table – Purchase",
        icon: FileText,
        permission: ["PURCHASE_REQUISITION"],
      },
      {
        name: "Purchase Order",
        href: "/purchase/order",
        title: "Purchase Orders",
        icon: FileText,
        permission: ["PURCHASE_ORDER"],
      },
      {
        name: "Purchase Invoice",
        href: "/purchase/invoice",
        title: "Purchase Invoices",
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
        title: "Add Product – Inventory",
        icon: PackagePlus,
        permission: ["INVENTORY_ADD_PRODUCT"],
      },
      {
        name: "Product Requisitions",
        href: "/inventory/requisitions",
        title: "Requisitions Table – Inventory",
        icon: FileText,
        permission: ["INVENTORY_REQUISITION"],
      },
      {
        name: "Reports",
        href: "/reports",
        title: "Reports",
        icon: FileText,
        permission: ["REPORTS_VIEW"],
      },
      {
        name: "Inventory Configuration",
        href: "/inventory/config",
        title: "Inventory Configuration",
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
        title: "User List",
        icon: Users,
        permission: ["USER_VIEW"],
      },
      {
        name: "Add User",
        href: "/users/new",
        title: "Add User",
        icon: PackagePlus,
        permission: ["USER_ADD"],
      },
      {
        name: "User Configuration",
        href: "/users/config",
        title: "User Configuration",
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
        title: "Department List",
        icon: Building2,
        permission: ["DEPARTMENT_VIEW"],
      },
      {
        name: "Department Configuration",
        href: "/departments/config",
        title: "Department Configuration",
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
        title: "Process List",
        icon: GitBranch,
        permission: ["PROCESS_VIEW"],
      },
      {
        name: "Add Process",
        href: "/process/new",
        title: "Add Process",
        icon: PackagePlus,
        permission: ["PROCESS_ADD"],
      },
      {
        name: "Process Configuration",
        href: "/process/config",
        title: "Process Configuration",
        icon: GitBranch,
        permission: ["PROCESS_CONFIG"],
      },
    ],
  },
   





  {
    name: "Role back Permission",
    href: "/role-back-permission",
    title: "Role Back Permission",
    icon: ShieldCheck,
    permission: ["ROLE_BACK_PERMISSION"],
  },

  {
    name: "Logout",
    href: "/logout",
    title: "Logout",
    icon: LogOut,
    permission: ["LOGOUT"],
  },
];
