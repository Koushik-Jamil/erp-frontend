import { Eye, Pencil, Printer, Trash2 } from "lucide-react";

export default function RequisitionActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg bg-blue-100 text-blue-600">
        <Eye size={16} />
      </button>
      <button className="p-2 rounded-lg bg-green-100 text-green-600">
        <Pencil size={16} />
      </button>
      <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
        <Printer size={16} />
      </button>
      <button className="p-2 rounded-lg bg-red-100 text-red-600">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
