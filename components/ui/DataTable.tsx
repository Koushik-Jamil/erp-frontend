
"use client";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import React from "react";
import TablePagination from "./TablePagination";
import TableToolbar from "./TableToolbar";
import { ToolbarItem } from "@/lib/toolbar/types";

const DataTable = <T,>({
  data,
  columns,
  toolbarItems,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  toolbarItems?: ToolbarItem[]; // ToolbarItem[]; --- IGNORE ---
}) => {
  // TanStack state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns: columns,
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

  return (
    <>
      {/* toolbar */}
      {toolbarItems && <TableToolbar assetToolbarConfig={toolbarItems || []} />}

      {/* table */}
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
                    colSpan={columns.length}
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
        <TablePagination table={table} />
      </div>
    </>
  );
};

export default DataTable;
