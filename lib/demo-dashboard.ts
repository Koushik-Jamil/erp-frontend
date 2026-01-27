export type KpiStat = {
  title: string;
  value: string;
  badge: string;
  sub: string;

  //icon file path (from public/)
  iconPath: string;

  
  iconBgClass?: string;
};

export const DASHBOARD_KPI_STATS: KpiStat[] = [
  {
    title: "Total Requisitions",
    value: "1,248",
    badge: "+13%",
    sub: "244 more than last month",
    iconPath: "/images/icons/kpi/Total_Requisitons.png", 
    
  },
  {
    title: "Pending Approvals",
    value: "486",
    badge: "IT: 18 | Fin: 19",
    sub: "12% of total requisitions",
    iconPath: "/images/icons/kpi/Pending_Approvals.png",
    
  },
  {
    title: "Active Purchase Orders",
    value: "24",
    badge: "6 delivering today",
    sub: "22% of purchase orders are WIP",
    iconPath: "/images/icons/kpi/Active_Purchase.png",
    
  },
  {
    title: "Inventory Value",
    value: "৳ 8.4M",
    badge: "+13%",
    sub: "৳ 1.2M increase from last month",
    iconPath: "/images/icons/kpi/Inventory_value.png",
  }
    
];
