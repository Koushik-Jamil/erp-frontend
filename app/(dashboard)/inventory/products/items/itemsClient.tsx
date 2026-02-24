"use client";

import * as React from "react";
import type { Role } from "@/lib/toolbar/types";

import { Button } from "@/components/ui/button";
import { DEMO_ASSET_ITEMS_BY_VARIANT, type AssetItemRow } from "@/lib/demo-assets/asset-items";

export default function ItemsClient({
  role: _role,
  permissions: _permissions,
  variantId,
}: {
  role: Role;
  permissions: string[];
  variantId: string;
}) {
  const rows: AssetItemRow[] = DEMO_ASSET_ITEMS_BY_VARIANT[variantId] ?? [];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold text-gray-900">Asset Table</h1>
        <span className="text-lg text-gray-800">
          ‹ Brand - Model ‹ HP ProBook 450 G8 - Laptop
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm p-4">
        <div className="text-sm text-gray-700 mb-3">
          Variant: <span className="font-semibold">{variantId || "N/A"}</span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-350 w-full text-sm">
            <thead className="bg-[#0B5C8F] text-white">
              <tr>
                {[
                  "SL",
                  "Asset ID",
                  "Serial No",
                  "Bar Code",
                  "Vendor Name",
                  "Purchase Date",
                  "Warranty Expiry",
                  "Processor",
                  "RAM",
                  "Storage",
                  "MAC Address",
                  "IP Address",
                  "Hostname",
                ].map((h) => (
                  <th key={h} className="text-left px-3 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.assetId} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-3 text-black">{r.sl}</td>
                  <td className="px-3 py-3 text-blue-700 underline">{r.assetId}</td>
                  <td className="px-3 py-3 text-blue-700 underline">{r.serialNo}</td>
                  <td className="px-3 py-3">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      {r.barCode}
                    </Button>
                  </td>
                  <td className="px-3 py-3 text-black">{r.vendorName}</td>
                  <td className="px-3 py-3 text-black">{r.purchaseDate}</td>
                  <td className="px-3 py-3 text-black">{r.warrantyExpiry}</td>
                  <td className="px-3 py-3 text-black">{r.processor}</td>
                  <td className="px-3 py-3 text-black">{r.ram}</td>
                  <td className="px-3 py-3 text-black">{r.storage}</td>
                  <td className="px-3 py-3 text-black">{r.macAddress}</td>
                  <td className="px-3 py-3 text-black">{r.ipAddress}</td>
                  <td className="px-3 py-3 text-black">{r.hostname}</td>
                </tr>
              ))}

              {!rows.length && (
                <tr>
                  <td className="px-3 py-6 text-center text-black" colSpan={13}>
                    No items found.
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