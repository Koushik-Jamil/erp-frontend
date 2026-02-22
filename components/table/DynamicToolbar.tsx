// "use client";

// import * as React from "react";
// import type { ToolbarContext, ToolbarItem } from "@/lib/toolbar/types";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu";

// // Type definitions for TanStack Table API
// interface TableAPI {
//   getSelectedRowModel?: () => { rows: unknown[] };
//   getAllColumns?: () => ColumnAPI[];
// }

// interface ColumnAPI {
//   id: string;
//   getCanHide?: () => boolean;
//   getIsVisible?: () => boolean;
//   toggleVisibility?: (visible: boolean) => void;
// }

// export default function DynamicToolbar({
//   items,
//   ctx,
// }: {
//   items: ToolbarItem[];
//   ctx: ToolbarContext;
// }) {
//   //  derive selected count from table if not provided
//   const selectedCount =
//     ctx.selectedCount ??
//     ((ctx.table as unknown as TableAPI)?.getSelectedRowModel?.().rows?.length ?? 0);

//   const enhancedCtx: ToolbarContext = { ...ctx, selectedCount };

//   const visible = items.filter((item) => isVisible(item, enhancedCtx));

//   const left = visible.filter((i) => (i.align ?? "left") === "left");
//   const right = visible.filter((i) => (i.align ?? "left") === "right");

//   const hasSearch = visible.some((i) => i.type === "search");

//   return (
//     <div className="mt-4">
//       {/* Row 1: everything except search */}
//       <div className="flex flex-wrap items-center gap-3">
//         {left
//           .filter((i) => i.type !== "search")
//           .map((item) => (
//             <ToolbarItemRenderer key={item.id} item={item} ctx={enhancedCtx} />
//           ))}

//         <div className="ml-auto flex flex-wrap items-center gap-3">
//           {right.map((item) => (
//             <ToolbarItemRenderer key={item.id} item={item} ctx={enhancedCtx} />
//           ))}
//         </div>
//       </div>

//       {/* Row 2: search */}
//       {hasSearch && (
//         <div className="mt-4">
//           {visible
//             .filter((i) => i.type === "search")
//             .map((item) => (
//               <ToolbarItemRenderer key={item.id} item={item} ctx={enhancedCtx} />
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function isVisible(item: ToolbarItem, ctx: ToolbarContext) {
//   if (item.hiddenWhen?.(ctx)) return false;

//   // rolesAllowed
//   if (item.rolesAllowed?.length && ctx.role) {
//     if (!item.rolesAllowed.includes(ctx.role)) return false;
//   }

//   // permissionsAllowed
//   if (item.permissionsAllowed?.length) {
//     const perms = ctx.permissions ?? [];
//     const ok = item.permissionsAllowed.some((p) => perms.includes(p));
//     if (!ok) return false;
//   }

//   // dependsOnSelection => hide if nothing selected
//   if (item.dependsOnSelection) {
//     const count = ctx.selectedCount ?? 0;
//     if (count <= 0) return false;
//   }

//   return true;
// }

// function isDisabled(item: ToolbarItem, ctx: ToolbarContext) {
//   if (item.disabledWhen?.(ctx)) return true;

//   // dependsOnSelection => disable if nothing selected
//   if (item.dependsOnSelection) {
//     const count = ctx.selectedCount ?? 0;
//     if (count <= 0) return true;
//   }

//   return false;
// }

// function ToolbarItemRenderer({
//   item,
//   ctx,
// }: {
//   item: ToolbarItem;
//   ctx: ToolbarContext;
// }) {
//   const disabled = isDisabled(item, ctx);

//   if (item.type === "button") {
//     return (
//       <Button
//         type="button"
//         variant={item.variant ?? "outline"}
//         className={item.className}
//         disabled={disabled}
//         onClick={() => item.function?.(item)}
//       >
//         {item.icon}
//         {item.label}
//       </Button>
//     );
//   }

//   if (item.type === "search") {
//     if (!ctx.globalFilter) return null;
//     return (
//       <Input
//         value={ctx.globalFilter.value}
//         onChange={(e) => ctx.globalFilter?.setValue(e.target.value)}
//         placeholder={item.placeholder ?? "Search..."}
//         className={item.className}
//         disabled={disabled}
//       />
//     );
//   }

//   if (item.type === "columns") {
//     if (!ctx.table) return null;

//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" type="button" disabled={disabled}>
//             {item.icon}
//             {item.label}
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent className="bg-white" align="end">
//           {((ctx.table as unknown as TableAPI)?.getAllColumns?.() ?? [])
//             .filter((c: ColumnAPI) => c.getCanHide?.())
//             .map((column: ColumnAPI) => (
//               <DropdownMenuCheckboxItem
//                 key={column.id}
//                 checked={column.getIsVisible?.()}
//                 onCheckedChange={(v) => column.toggleVisibility?.(!!v)}
//               >
//                 <span className="capitalize">{column.id}</span>
//               </DropdownMenuCheckboxItem>
//             ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   }

//   if (item.type === "select") {
//     const bind = item.bind === "department" ? ctx.department : ctx.filter;
//     if (!bind) return null;

//     const clearValue = item.clearValue ?? "All";

//     return (
//       <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
//         <span className="text-gray-700">{item.icon}</span>
//         <select
//           className="bg-transparent outline-none text-sm text-black"
//           value={bind.value}
//           onChange={(e) => {
//             const val = e.target.value;
//             bind.setValue(val);

//             // apply filter into TanStack column filter
//             if (item.columnId && ctx.applyColumnFilter) {
//               if (val === clearValue) ctx.applyColumnFilter(item.columnId, undefined);
//               else ctx.applyColumnFilter(item.columnId, val);
//             }
//           }}
//           aria-label={item.label}
//           disabled={disabled}
//         >
//           {bind.options.map((o) => (
//             <option key={o} value={o}>
//               {o}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   }

//   if (item.type === "custom") {
//     return <>{item.render(ctx)}</>;
//   }

//   return null;
// }