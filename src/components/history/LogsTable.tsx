import { Table, TableOptions, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

type useReactTable = <TData extends LogType>(
  options: TableOptions<TData>
) => Table<TData>

type ColumnSort = {
  id: string,
  desc: boolean,
}

type SortingState = ColumnSort[]

const BasicTable = ({ data, columns }: { data: LogType[], columns: ColumnDef<LogType>[] }) => {

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="">
      <table className="">
        {/* Header */}
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {
                    header.column.getIsSorted() === false ? null : header.column.getIsSorted() === "asc" ? " ⬆️ " : " ⬇️ "
                  }
                </th>
              )}
            </tr>
          ))}
        </thead>

        {/* Body */}
        <tbody>
          {table.getRowModel().rows.map(row =>
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => table.setPageIndex(0)}>First page</button>
        <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous page</button>
        <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next page</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last page</button>
      </div>
    </div>
  )
}

export default BasicTable;

