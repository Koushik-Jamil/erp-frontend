/* ----------------------------------
   Page Title Configuration
----------------------------------- */

export type PageTitleConfig = {
  match: string;
  title: string;
  exact?: boolean;
};

export const PAGE_TITLES: PageTitleConfig[] = [
  {
    match: "/dashboard",
    title: "Dashboard",
    exact: true,
  },
  {
    match: "/inventory/requisitions",
    title: "Requisitions Table – Inventory",
  },
  {
    match: "/purchase/requisitions",
    title: "Requisitions Table – Purchase",
  },
  {
    match: "/inventory/products",
    title: "Asset Table",
  },
  {
    match: "/purchase/order",
    title: "Purchase Orders",
  },
  {
    match: "/reports",
    title: "Reports",
  },
];

/* ----------------------------------
   Helper: resolve title from pathname
----------------------------------- */

export function resolvePageTitle(pathname: string): string {
  // Exact match first
  const exact = PAGE_TITLES.find(
    (p) => p.exact && p.match === pathname
  );
  if (exact) return exact.title;

  // Prefix match (for nested routes)
  const prefix = PAGE_TITLES.find(
    (p) => !p.exact && pathname.startsWith(p.match)
  );

  return prefix?.title ?? "Dashboard";
}
