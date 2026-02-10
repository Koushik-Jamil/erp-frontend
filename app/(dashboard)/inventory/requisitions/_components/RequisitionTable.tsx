// import RequisitionStatusBadge from "./RequisitionStatusBadge";
// import RequisitionActions from "./RequisitionActions";
// import type { Requisition } from "../_types/requisition";
// import { DEMO_REQUISITIONS } from "@/lib/demo-requisitions";



// export default function RequisitionTable() {
//   return (
//     <div className="overflow-x-auto rounded-2xl border">
//       <table className="min-w-full text-sm">
//         <thead className="bg-[#015492] text-white">
//           <tr>
//             <th className="px-4 py-3">SL</th>
//             <th className="px-4 py-3">Req ID</th>
//             <th className="px-4 py-3">Date</th>
//             <th className="px-4 py-3">Department</th>
//             <th className="px-4 py-3">Requested By</th>
//             <th className="px-4 py-3">Category</th>
//             <th className="px-4 py-3">Product</th>
//             <th className="px-4 py-3 text-right">Qty</th>
//             <th className="px-4 py-3">Priority</th>
//             <th className="px-4 py-3">Dept Head</th>
//             <th className="px-4 py-3">Finance</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">PO No</th>
//             <th className="px-4 py-3">Vendor</th>
//             <th className="px-4 py-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {DEMO_DATA.map((r, i) => (
//             <tr key={r.id} className="border-b text-[#4A4A4A] ">
//               <td className="px-4 py-3">{i + 1}</td>
//               <td className="px-4 py-3 underline">{r.reqNo}</td>
//               <td className="px-4 py-3">{r.date}</td>
//               <td className="px-4 py-3">{r.department}</td>
//               <td className="px-4 py-3">{r.requestedBy}</td>
//               <td className="px-4 py-3">{r.category}</td>
//               <td className="px-4 py-3">{r.product}</td>
//               <td className="px-4 py-3 text-right">{r.qty}</td>
//               <td className="px-4 py-3">{r.priority}</td>
//               <td className="px-4 py-3">{r.deptHeadStatus}</td>
//               <td className="px-4 py-3">{r.financeStatus}</td>
//               <td className="px-4 py-3">
//                 <RequisitionStatusBadge status={r.status} />
//               </td>
//               <td className="px-4 py-3">{r.poNo ?? "-"}</td>
//               <td className="px-4 py-3">{r.vendor ?? "-"}</td>
//               <td className="px-4 py-3">
//                 <RequisitionActions />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import RequisitionStatusBadge from "./RequisitionStatusBadge";
import RequisitionActions from "./RequisitionActions";
import type { Requisition } from "../_types/requisition";
import { DEMO_REQUISITIONS } from "@/lib/demo-requisitions";

export default function RequisitionTable() {
  const data: Requisition[] = DEMO_REQUISITIONS;

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-[#015492] text-white">
          <tr>
            <th className="px-4 py-3">SL</th>
            <th className="px-4 py-3">Req ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Requested By</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3 text-right">Qty</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Dept Head</th>
            <th className="px-4 py-3">Finance</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">PO No</th>
            <th className="px-4 py-3">Vendor</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r, i) => (
            <tr key={r.id} className="border-b last:border-b-0  text-[#4A4A4A] ">
              <td className="px-4 py-3">{i + 1}</td>

              <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                {r.reqNo}
              </td>

              <td className="px-4 py-3">
                {new Date(r.date).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">{r.department}</td>
              <td className="px-4 py-3">{r.requestedBy}</td>
              <td className="px-4 py-3">{r.category}</td>
              <td className="px-4 py-3">{r.product}</td>

              <td className="px-4 py-3 text-right">{r.qty}</td>
              <td className="px-4 py-3">{r.priority}</td>
              <td className="px-4 py-3">{r.deptHeadStatus ?? "-"}</td>
              <td className="px-4 py-3">{r.financeStatus ?? "-"}</td>

              <td className="px-4 py-3">
                <RequisitionStatusBadge status={r.status} />
              </td>

              <td className="px-4 py-3">{r.poNo ?? "-"}</td>
              <td className="px-4 py-3">{r.vendor ?? "-"}</td>

              <td className="px-4 py-3">
                <RequisitionActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
