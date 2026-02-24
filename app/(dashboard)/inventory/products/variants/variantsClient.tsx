"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/toolbar/types";
import { DEMO_ASSET_VARIANTS } from "@/lib/demo-assets/asset-variants";
import type { AssetVariantRow } from "@/lib/demo-assets/asset-variants";

import { Button } from "@/components/ui/button";

export default function VariantsClient({
  role,
  permissions,
  productId,
}: {
  role: Role;
  permissions: string[];
  productId: string;
}) {
  const router = useRouter();
  const rows: AssetVariantRow[] = DEMO_ASSET_VARIANTS[productId] ?? [];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold text-gray-900">Asset Table</h1>
        <span className="text-lg text-gray-800">‹ Brand - Model - Laptop</span>
      </div>

      <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm p-4">
        <div className="text-sm text-gray-700 mb-3">
          Product: <span className="font-semibold">{productId || "N/A"}</span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[1200px] w-full text-sm">
            <thead className="bg-[#0B5C8F] text-white">
              <tr>
                {[
                  "SL",
                  "Variant ID",
                  "Brand",
                  "Model",
                  "Processor",
                  "RAM",
                  "Storage",
                  "Stock",
                  "Available",
                  "Assigned",
                  "Damaged",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th key={h} className="text-left px-3 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.variantId}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/inventory/products/items?variantId=${encodeURIComponent(r.variantId)}`
                    )
                  }
                >
                  <td className="px-3 py-3 text-black">{r.sl}</td>
                  <td className="px-3 py-3 text-blue-700 underline">{r.variantId}</td>
                  <td className="px-3 py-3 text-black">{r.brand}</td>
                  <td className="px-3 py-3 text-black">{r.model}</td>
                  <td className="px-3 py-3 text-black">{r.processor}</td>
                  <td className="px-3 py-3 text-black">{r.ram}</td>
                  <td className="px-3 py-3 text-black">{r.storage}</td>
                  <td className="px-3 py-3 text-black">{r.stock}</td>
                  <td className="px-3 py-3 text-black">{r.available}</td>
                  <td className="px-3 py-3 text-black">{r.assigned}</td>
                  <td className="px-3 py-3 text-black">{r.damaged}</td>
                  <td className="px-3 py-3 text-black">{r.status}</td>
                  <td className="px-3 py-3">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              ))}

              {!rows.length && (
                <tr>
                  <td className="px-3 py-6 text-center text-black" colSpan={13}>
                    No variants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}