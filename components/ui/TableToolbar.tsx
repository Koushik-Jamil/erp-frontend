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
"use client";

import { ToolbarItem } from "@/lib/toolbar/types";
import { Button } from "./button";

const TableToolbar = ({
  assetToolbarConfig = [],
}: {
  assetToolbarConfig: ToolbarItem[];
}) => {
  if (!assetToolbarConfig.length) return null;

  const hasPermission = (_item: ToolbarItem) => {
    // plug your permission logic later
    return true;
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {assetToolbarConfig.map((item, i) => {
        if (item.hidden) return null;
        if (!hasPermission(item)) return null;

        const key = `${item.id}-${i}`;

        if (item.type === "button") {
          return (
            <Button
              key={key}
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

        if (item.type === "select") {
          return (
            <div key={key} className="min-w-[170px]">
              <select
                value={item.value ?? ""}
                disabled={item.disabled}
                onChange={(e) => item.onChange?.(e.target.value)}
                className={[
                  "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800",
                  "focus:outline-none focus:ring-2 focus:ring-blue-200",
                  item.className ?? "",
                ].join(" ")}
              >
                <option value="">{item.placeholder ?? item.label ?? "Select"}</option>
                {item.options.map((opt) => (
                  <option key={`${item.id}-${opt.value}`} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (item.type === "date-range") {
          return (
            <div
              key={key}
              className={[
                "flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3",
                item.className ?? "",
              ].join(" ")}
            >
              <input
                type="date"
                value={item.from ?? ""}
                disabled={item.disabled}
                onChange={(e) =>
                  item.onChange?.({
                    from: e.target.value || undefined,
                    to: item.to,
                  })
                }
                className="text-sm text-gray-700 outline-none"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={item.to ?? ""}
                disabled={item.disabled}
                onChange={(e) =>
                  item.onChange?.({
                    from: item.from,
                    to: e.target.value || undefined,
                  })
                }
                className="text-sm text-gray-700 outline-none"
              />
            </div>
          );
        }

        if (item.type === "custom") {
          return <div key={key}>{item.render()}</div>;
        }

        return null;
      })}
    </div>
  );
};

export default TableToolbar;