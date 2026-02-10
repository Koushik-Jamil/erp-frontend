"use client";

import { Calendar, Filter, Download, Columns } from "lucide-react";

export default function RequisitionFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Date range */}
      <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <Calendar size={16} />
        Last 7 Days
      </button>

      {/* Department */}
      <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <option>Department</option>
        <option>IT</option>
        <option>Admin</option>
        <option>Finance</option>
      </select>

      {/* Product */}
      <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <option>Product</option>
        <option>Laptop</option>
        <option>Monitor</option>
        <option>Printer</option>
      </select>

      {/* Priority */}
      <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <option>Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      {/* Status */}
      <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <option>Status</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>PO Created</option>
        <option>Delivered</option>
      </select>

      {/* Category */}
      <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <option>Category</option>
        <option>IT Equipment</option>
        <option>Office Supplies</option>
      </select>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Column selector */}
      <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <Columns size={16} />
        Columns
      </button>

      {/* Export */}
      <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
        <Download size={16} />
        Export
      </button>

      {/* Reset */}
      <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">
        <Filter size={16} />
        Reset
      </button>
    </div>
  );
}
