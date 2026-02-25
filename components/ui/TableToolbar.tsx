// "use client";
// import { ToolbarItem } from "@/lib/toolbar/types";
// import { Button } from "./button";

// const TableToolbar = ({
//   assetToolbarConfig,
// }: {
//   assetToolbarConfig: any[];
// }) => {
//   const getButton = (item: ToolbarItem, i: number) => {
//     const handleClick = () => {
//       // hasPermission(item.permissionsAllowed) && item.function?.(item);
//       // everything else works as before
//       item.function?.(item);
//     };

//     return (
//       <Button
//         className={item.className}
//         variant="outline"
//         onClick={handleClick}
//         key={i}
//       >
//         {item.icon}
//         <span className="ml-2">{item.label}</span>
//       </Button>
//     );
//   };
//   return (
//     <>
//       {" "}
//       <div className="flex gap-2 mt-4">
//         {assetToolbarConfig.map((item, i) => {
//           const component = getButton(item, i);
//           const hasPermission = true;
//           return hasPermission && component;
//         })}
//       </div>
//     </>
//   );
// };

// export default TableToolbar;
// "use client";

// import { ToolbarItem } from "@/lib/toolbar/types";
// import { Button } from "./button";

// const TableToolbar = ({
//   assetToolbarConfig = [],
// }: {
//   assetToolbarConfig: ToolbarItem[];
// }) => {
//   if (!assetToolbarConfig.length) return null;

//   const hasPermission = (_item: ToolbarItem) => {
//     // plug your permission logic later
//     return true;
//   };

//   return (
//     <div className="mt-4 flex flex-wrap items-center gap-3">
//       {assetToolbarConfig.map((item, i) => {
//         if (item.hidden) return null;
//         if (!hasPermission(item)) return null;

//         const key = `${item.id}-${i}`;

//         if (item.type === "button") {
//           return (
//             <Button
//               key={key}
//               type="button"
//               className={item.className}
//               variant={item.variant ?? "outline"}
//               disabled={item.disabled}
//               onClick={() => item.function?.(item)}
//             >
//               {item.icon}
//               {item.label ? <span className="ml-2">{item.label}</span> : null}
//             </Button>
//           );
//         }

//         if (item.type === "select") {
//           return (
//             <div key={key} className="min-w-[170px]">
//               <select
//                 value={item.value ?? ""}
//                 disabled={item.disabled}
//                 onChange={(e) => item.onChange?.(e.target.value)}
//                 className={[
//                   "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800",
//                   "focus:outline-none focus:ring-2 focus:ring-blue-200",
//                   item.className ?? "",
//                 ].join(" ")}
//               >
//                 <option value="">{item.placeholder ?? item.label ?? "Select"}</option>
//                 {item.options.map((opt) => (
//                   <option key={`${item.id}-${opt.value}`} value={opt.value}>
//                     {opt.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           );
//         }

//         if (item.type === "date-range") {
//           return (
//             <div
//               key={key}
//               className={[
//                 "flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3",
//                 item.className ?? "",
//               ].join(" ")}
//             >
//               <input
//                 type="date"
//                 value={item.from ?? ""}
//                 disabled={item.disabled}
//                 onChange={(e) =>
//                   item.onChange?.({
//                     from: e.target.value || undefined,
//                     to: item.to,
//                   })
//                 }
//                 className="text-sm text-gray-700 outline-none"
//               />
//               <span className="text-gray-400">to</span>
//               <input
//                 type="date"
//                 value={item.to ?? ""}
//                 disabled={item.disabled}
//                 onChange={(e) =>
//                   item.onChange?.({
//                     from: item.from,
//                     to: e.target.value || undefined,
//                   })
//                 }
//                 className="text-sm text-gray-700 outline-none"
//               />
//             </div>
//           );
//         }

//         if (item.type === "custom") {
//           return <div key={key}>{item.render()}</div>;
//         }

//         return null;
//       })}
//     </div>
//   );
// };

// export default TableToolbar;
"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import {
  ChevronDown,
  RotateCcw,
  Columns3,
  CalendarDays,
} from "lucide-react";

import { ToolbarItem } from "@/lib/toolbar/types";
import { Button } from "./button";

function getColumnLabel<T>(tableColumn: ReturnType<Table<T>["getAllLeafColumns"]>[number]) {
  const header = tableColumn.columnDef.header;
  if (typeof header === "string") return header;
  return tableColumn.id;
}

function ToolbarColumnsDropdown<T>({
  table,
  label = "Columns",
  className,
  disabled,
}: {
  table?: Table<T>;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const columns = table
    ? table
        .getAllLeafColumns()
        .filter((col) => col.id !== "_actions") // optional convention
        .filter((col) => col.getCanHide?.() ?? true)
    : [];

  return (
    <div className="relative" ref={containerRef}>
      <Button
        type="button"
        variant="outline"
        disabled={disabled || !table}
        className={className}
        onClick={() => setOpen((p) => !p)}
      >
        <Columns3 className="h-4 w-4" />
        <span className="ml-2">{label}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>

      {open && table && (
        <div className="absolute z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <div className="max-h-72 overflow-y-auto">
            {columns.length ? (
              columns.map((column) => (
                <label
                  key={column.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={(e) => column.toggleVisibility(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="truncate">{getColumnLabel(column)}</span>
                </label>
              ))
            ) : (
              <div className="px-2 py-2 text-sm text-gray-500">
                No hideable columns
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarDateRange({
  label,
  from,
  to,
  disabled,
  className,
  onChange,
}: {
  label?: string;
  from?: string;
  to?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (range: { from?: string; to?: string }) => void;
}) {
  return (
    <div
      className={[
        "flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 text-gray-700">
        <CalendarDays className="h-4 w-4" />
        {label ? <span className="text-sm">{label}</span> : null}
      </div>

      <input
        type="date"
        disabled={disabled}
        value={from ?? ""}
        onChange={(e) =>
          onChange?.({
            from: e.target.value || undefined,
            to,
          })
        }
        className="rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
      />

      <span className="text-sm text-gray-400">to</span>

      <input
        type="date"
        disabled={disabled}
        value={to ?? ""}
        onChange={(e) =>
          onChange?.({
            from,
            to: e.target.value || undefined,
          })
        }
        className="rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

function ToolbarSelect({
  label,
  value,
  placeholder,
  options,
  disabled,
  className,
  onChange,
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className={["min-w-[170px]", className ?? ""].join(" ")}>
      <select
        disabled={disabled}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="">{placeholder ?? label ?? "Select"}</option>
        {options.map((opt) => (
          <option key={`${opt.value}-${opt.label}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToolbarButton({
  item,
}: {
  item: Extract<ToolbarItem, { type: "button" }>;
}) {
  return (
    <Button
      type="button"
      className={item.className}
      variant={item.variant ?? "outline"}
      disabled={item.disabled}
      onClick={() => item.function?.(item)}
    >
      {item.icon}
      {item.label ? <span className="ml-2">{item.label}</span> : null}
    </Button>
  );
}

type Props<T> = {
  assetToolbarConfig: ToolbarItem[];
  table?: Table<T>;
};

const TableToolbar = <T,>({ assetToolbarConfig = [], table }: Props<T>) => {
  if (!assetToolbarConfig.length) return null;

  const hasPermission = (_item: ToolbarItem) => {
    // TODO: plug your role/permission check here
    return true;
  };

  const visibleItems = assetToolbarConfig.filter(
    (item) => !item.hidden && hasPermission(item),
  );

  const leftItems = visibleItems.filter((item) => item.position !== "right");
  const rightItems = visibleItems.filter((item) => item.position === "right");

  const renderItem = (item: ToolbarItem, i: number) => {
    const key = `${item.id}-${i}`;

    if (item.type === "button") {
      return <ToolbarButton key={key} item={item} />;
    }

    if (item.type === "select") {
      return (
        <ToolbarSelect
          key={key}
          label={item.label}
          value={item.value}
          placeholder={item.placeholder}
          options={item.options}
          disabled={item.disabled}
          className={item.className}
          onChange={item.onChange}
        />
      );
    }

    if (item.type === "columns") {
      return (
        <ToolbarColumnsDropdown
          key={key}
          table={table}
          label={item.label ?? "Columns"}
          className={item.className}
          disabled={item.disabled}
        />
      );
    }

    if (item.type === "date-range") {
      return (
        <ToolbarDateRange
          key={key}
          label={item.label}
          from={item.from}
          to={item.to}
          disabled={item.disabled}
          className={item.className}
          onChange={item.onChange}
        />
      );
    }

    if (item.type === "custom") {
      return <div key={key}>{item.render()}</div>;
    }

    return null;
  };

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {leftItems.map(renderItem)}
      </div>

      {rightItems.length > 0 && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {rightItems.map(renderItem)}
        </div>
      )}
    </div>
  );
};

export default TableToolbar;