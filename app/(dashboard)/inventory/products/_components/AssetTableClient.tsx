"use client";
import { assetToolbarConfig } from "@/lib/toolbar/assetToolbarConfig";
import AddAsset from "./AddAsset";

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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { DEMO_ASSET_ROWS } from "@/lib/demo-assets-table";
import { assetColumns } from "../_config/columns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToolbarItem } from "@/lib/toolbar/types";




export default function AssetTableClient() {
  const data = React.useMemo(() => DEMO_ASSET_ROWS, []);

  // Toolbar state (demo) - not used in this simplified client

  // TanStack state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // applyColumnFilter was removed; column filtering is handled via table state directly

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

  // resetAll helper removed — not needed in this view

const getButton = (item: ToolbarItem, i: number) => {
  const handleClick = () => {
    // 👇 intercept ONLY add button
    if (item.id === "add") {
      setIsAddOpen(true);
      return;
    }

    // everything else works as before
    item.function && item.function(item);
  };

  return (
    <Button
      className={item.className}
      variant="outline"
      onClick={handleClick}
      key={i}
    >
      {item.icon}
      <span className="ml-2">{item.label}</span>
    </Button>
  );
};

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Asset Table</h1>
      </div>

      <div className="flex gap-2 mt-4">
        {assetToolbarConfig.map((item, i) => {
          const component = getButton(item, i);
          const hasPermission = true;
          return hasPermission && component;
        })}
      </div>

      {/* Table Card */}
      <div className="mt-4 rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          {/* min-w makes horizontal scroll like screenshot */}
          <Table className="min-w-350">
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow
                  key={hg.id}
                  className="bg-[#0B5C8F] hover:bg-[#0B5C8F] border-b-0"
                >
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
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={assetColumns.length}
                    className="h-24 text-center text-black"
                  >
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
            Total {table.getFilteredRowModel().rows.length} | Showing{" "}
            {table.getRowModel().rows.length} Items
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
       {/* Add Asset Modal */}
      <AddAsset
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={(data:unknown) => {
          console.log("Saved:", data);
          setIsAddOpen(false);
        }}
      />
    </div>
  );
}
