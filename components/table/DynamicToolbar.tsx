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

// function hasAccess(item: ToolbarItem, ctx: ToolbarContext) {
//   if (item.rolesAllowed && !item.rolesAllowed.includes(ctx.role)) return false;
//   if (item.permissionsAllowed && item.permissionsAllowed.length > 0) {
//     const ok = item.permissionsAllowed.some((p) => ctx.permissions.includes(p));
//     if (!ok) return false;
//   }
//   if (item.hiddenWhen?.(ctx)) return false;
//   return true;
// }

// function isDisabled(item: ToolbarItem, ctx: ToolbarContext) {
//   if (item.dependsOnSelection && ctx.selectedCount === 0) return true;
//   if (item.disabledWhen?.(ctx)) return true;
//   return false;
// }

// function normalizeOptions<T>(item: ToolbarItem, ctx: ToolbarContext) {
//   const raw = typeof item.options === "function" ? item.options(ctx) : item.options;
//   return raw.map((o) => (typeof o === "string" ? { label: o, value: o } : o));
// }

// export default function DynamicToolbar<TData>({
//   items,
//   ctx,
// }: {
//   items: ToolbarItem[];
//   ctx: ToolbarContext;
// }) {
//   const left = items.filter((i) => (i.align ?? "left") === "left");
//   const right = items.filter((i) => (i.align ?? "left") === "right");

//   const renderItem = (item: ToolbarItem) => {
//     if (!hasAccess(item, ctx)) return null;
//     const disabled = isDisabled(item, ctx);

//     if (item.type === "button") {
//       return (
//         <Button
//           key={item.id}
//           variant={item.variant ?? "outline"}
//           className={item.className}
//           onClick={() => item.onClick?.(ctx)}
//           disabled={disabled}
//         >
//           {item.icon}
//           <span className="ml-2">{item.label}</span>
//         </Button>
//       );
//     }

//     if (item.type === "select") {
//       const val = String(ctx.state[item.bind] ?? "ALL");
//       const opts = normalizeOptions(item, ctx);

//       return (
//         <div
//           key={item.id}
//           className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2"
//         >
//           <span className="text-gray-700">{item.icon}</span>

//           <select
//             className="bg-transparent outline-none text-sm text-black"
//             value={val}
//             disabled={disabled}
//             onChange={(e) => {
//               const v = e.target.value;
//               ctx.setState(item.bind, v);

//               // default column filter binding
//               if (item.filterColumnId && ctx.table) {
//                 const col = ctx.table.getColumn(item.filterColumnId);
//                 col?.setFilterValue(v === "ALL" ? "" : v);
//               }
//             }}
//           >
//             {opts.map((o) => (
//               <option key={o.value} value={o.value}>
//                 {o.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       );
//     }

//     if (item.type === "columns") {
//       if (!ctx.table) return null;

//       return (
//         <DropdownMenu key={item.id}>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" disabled={disabled}>
//               {item.icon}
//               <span className="ml-2">{item.label}</span>
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent className="bg-white" align="end">
//             {ctx.table
//               .getAllColumns()
//               .filter((c) => c.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(v) => column.toggleVisibility(!!v)}
//                 >
//                   <span className="capitalize">{column.id}</span>
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     }

//     if (item.type === "search") {
//       const val = String(ctx.table?.getState().globalFilter ?? "");
//       return (
//         <Input
//           key={item.id}
//           value={val}
//           onChange={(e) => ctx.table?.setGlobalFilter(e.target.value)}
//           placeholder={item.placeholder ?? "Search..."}
//           className={item.className}
//           disabled={disabled}
//         />
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="mt-4 flex flex-wrap items-center gap-3">
//       <div className="flex flex-wrap items-center gap-3">{left.map(renderItem)}</div>
//       <div className="ml-auto flex flex-wrap items-center gap-3">{right.map(renderItem)}</div>
//     </div>
//   );
// }