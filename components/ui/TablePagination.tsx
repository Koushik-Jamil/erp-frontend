import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

const TablePagination = ({ table }:{table: any}) => {
    return ( <>
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
        </div></> );
}
 
export default TablePagination;