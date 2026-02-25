import type { ReactNode } from "react";

export type ToolbarOption = {
  label: string;
  value: string;
};

type ToolbarBase = {
  id: string;
  label?: string;
  className?: string;
  rolesAllowed?: string[];
  permissionsAllowed?: string[];
  hidden?: boolean;
  disabled?: boolean;
  position?: "left" | "right"; // for layout grouping (date usually right)
};

export type ToolbarButtonItem = ToolbarBase & {
  type: "button";
  icon?: ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  function?: (item: ToolbarButtonItem) => void;
};

export type ToolbarSelectItem = ToolbarBase & {
  type: "select";
  value?: string;
  placeholder?: string;
  options: ToolbarOption[];
  onChange?: (value: string) => void;
};

export type ToolbarColumnsItem = ToolbarBase & {
  type: "columns";
  // uses TanStack table instance provided by DataTable -> TableToolbar
};

export type ToolbarDateRangeItem = ToolbarBase & {
  type: "date-range";
  from?: string;
  to?: string;
  onChange?: (range: { from?: string; to?: string }) => void;
};

export type ToolbarCustomItem = ToolbarBase & {
  type: "custom";
  render: () => ReactNode;
};

export type ToolbarItem =
  | ToolbarButtonItem
  | ToolbarSelectItem
  | ToolbarColumnsItem
  | ToolbarDateRangeItem
  | ToolbarCustomItem;