"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  Columns3,
  Download,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Upload,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { DEMO_ASSET_ROWS } from "@/lib/demo-assets-table";
import { assetColumns } from "../_config/columns";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AssetTableClient() {
  'use no memo';
  
  const data = React.useMemo(() => DEMO_ASSET_ROWS, []);

  // Toolbar state (demo)
  const [department, setDepartment] = React.useState("All");
  const [filter, setFilter] = React.useState("All");

  // TanStack state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns: assetColumns,
    state: { sorting, columnFilters, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function resetAll() {
    setDepartment("All");
    setFilter("All");
    setGlobalFilter("");
    table.resetSorting();
    table.resetColumnFilters();
    table.resetColumnVisibility();
    table.setPageIndex(0);
    table.setPageSize(15);
  }

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Asset Table</h1>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          <SelectPill
            label="Department"
            value={department}
            onChange={setDepartment}
            icon={<SlidersHorizontal className="w-4 h-4" />}
            options={["All", "IT", "HR", "Accounts", "Store"]}
          />

          <SelectPill
            label="Filter"
            value={filter}
            onChange={setFilter}
            icon={<SlidersHorizontal className="w-4 h-4" />}
            options={["All", "High Priority", "Low Stock", "Newest"]}
          />

          {/* shadcn Columns dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3 className="w-4 h-4" />
                Columns
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white" align="end">
              {table
                .getAllColumns()
                .filter((c) => c.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(v) => column.toggleVisibility(!!v)}
                  >
                    <span className="capitalize">{column.id}</span>
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={resetAll}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <Button variant="outline">
            <Upload className="w-4 h-4" />
            Import
          </Button>

          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export
          </Button>

          <Button variant="outline" className="ml-auto">
            <Calendar className="w-4 h-4 text-blue-600" />
            Jan 2024 - Feb 2025
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4">
        <Input
          value={globalFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
          placeholder="Search here..."
          className="w-full md:w-105"
        />
      </div>

      {/* Table Card */}
      <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          {/* min-w makes horizontal scroll like screenshot */}
          <Table className="min-w-350">
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-[#0B5C8F] hover:bg-[#0B5C8F] border-b-0">
                  {hg.headers.map((header, idx) => {
                    const canSort = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();

                    return (
                      <TableHead
                        key={header.id}
                        className={[
                          "text-white",
                          idx === 0 ? "rounded-tl-xl" : "",
                          idx === hg.headers.length - 1 ? "rounded-tr-xl" : "",
                          canSort ? "cursor-pointer select-none" : "",
                        ].join(" ")}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {canSort && (
                            <>
                              {sorted === "asc" ? (
                                <ArrowUp className="w-4 h-4" />
                              ) : sorted === "desc" ? (
                                <ArrowDown className="w-4 h-4" />
                              ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-70" />
                              )}
                            </>
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={assetColumns.length} className="h-24 text-center text-black">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
          <div className="text-sm text-gray-700">
            Total {table.getFilteredRowModel().rows.length} | Showing {table.getRowModel().rows.length} Items
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                  table.setPageIndex(0);
                }}
                className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-black"
              >
                {[10, 15, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span>Per page</span>
            </div>

            <div className="text-sm text-gray-700">
              Page - {table.getState().pagination.pageIndex + 1}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* small select pill helper */
function SelectPill({
  label,
  value,
  onChange,
  icon,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  options: string[];
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
      <span className="text-gray-700">{icon}</span>
      <select
        className="bg-transparent outline-none text-sm text-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
