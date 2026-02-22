import type { ReactNode } from "react";

export type Role = "ADMIN" | "MANAGER" | "STAFF";

/**
 * These are UI-level permissions for toolbar items.
 * You can reuse your existing Permission union if you want.
 */
export type PermissionName = string;

export type ToolbarContext = {
  role?: Role;
  permissions?: PermissionName[];

  // TanStack table instance (unknown avoids generic hell)
  table?: unknown;

  // Search (global filter)
  globalFilter?: { value: string; setValue: (v: string) => void };

  // Selection helper (derived from TanStack if table exists)
  selectedCount?: number;

  // Select bindings (local UI state)
  department?: { value: string; setValue: (v: string) => void; options: string[] };
  filter?: { value: string; setValue: (v: string) => void; options: string[] };

  // OPTIONAL: apply select directly into TanStack column filter
  // This is what will make your department/filter actually work.
  applyColumnFilter?: (columnId: string, value: unknown) => void;

  // OPTIONAL: custom reset function from parent (better than calling table.reset... inside config)
  resetAll?: () => void;
  function?:()=>void; 
    
  
};

export type ToolbarItem = {
  label: string;
  icon?: ReactNode;
  variant?: "outline" | "solid" | "ghost"|"default";
  className?: string;
  type: "button"|"select";
  options?:[{ value: string; label: string }];
  function?: (item: ToolbarItem) => void;
  id: string;
  align?: "left" | "right";
  rolesAllowed?: Role[];                 //  show only these roles
  permissionsAllowed?: PermissionName[]; //  show only if user has any of these
  hiddenWhen?: (ctx: ToolbarContext) => boolean;   // dynamic hide
  disabledWhen?: (ctx: ToolbarContext) => boolean; // dynamic disable         //  only show/enable when rows selected
};

