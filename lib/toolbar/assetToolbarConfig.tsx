
import {
  Calendar,
  Columns3,
  Download,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Upload,
  ChevronDown,
  Trash2,
} from "lucide-react";
import type { ToolbarItem } from "./types";

export const assetToolbarConfig: ToolbarItem[] = [
  {
    id: "add",
    type: "button",
    label: "Add Asset",
    icon: <Plus className="w-4 h-4" />,
    variant: "default",
    className: "bg-blue-600 hover:bg-blue-700 text-white",
    rolesAllowed: ["ADMIN", "MANAGER"], 
    permissionsAllowed: ["ASSET_ADD"],  // example permission name
    function: () => alert("Add Asset (demo)"),
  },

  {
    id: "reset",
    type: "button",
    label: "Reset",
    icon: <RotateCcw className="w-4 h-4" />,
    variant: "outline",
    function: (ctx) => {console.log("Resetting all (demo)"); },
  },

  {
    id: "import",
    type: "button",
    label: "Import",
    icon: <Upload className="w-4 h-4" />,
    variant: "outline",
    rolesAllowed: ["ADMIN", "MANAGER"],
    permissionsAllowed: ["ASSET_IMPORT"],
    function: () => alert("Import (demo)"),
   
  },

  {
    id: "export",
    type: "button",
    label: "Export",
    icon: <Download className="w-4 h-4" />,
    variant: "outline",
    rolesAllowed: ["ADMIN", "MANAGER", "STAFF"],
    permissionsAllowed: ["ASSET_EXPORT"],
    function: () => alert("Export (demo)"),
    
  },

  //  Example: show delete only when selection exists
  {
    id: "deleteSelected",
    type: "button",
    label: "Delete",
    icon: <Trash2 className="w-4 h-4" />,
    variant: "outline",
    rolesAllowed: ["ADMIN"],
    permissionsAllowed: ["ASSET_DELETE"],
    function: (ctx) => alert(`Delete  items (demo)`),
  
  },

  {
    id: "date",
    type: "button",
    label: "Jan 2024 - Feb 2025",
    icon: <Calendar className="w-4 h-4 text-blue-600" />,
    variant: "outline",
    function: () => alert("Date picker (demo)"),
  },

];