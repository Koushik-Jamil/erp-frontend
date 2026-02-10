import { REQUISITION_STATUS_MAP } from "../_config/status-map";
import type { RequisitionStatus } from "../_types/requisition";

export default function RequisitionStatusBadge({
  status,
}: {
  status: RequisitionStatus;
}) {
  const cfg = REQUISITION_STATUS_MAP[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}
