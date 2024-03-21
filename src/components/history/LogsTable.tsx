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
    <div className="w-[100%] flex flex-col gap-8">
      <table className="border-2 text-light-blue border-light-blue w-[100%] backdrop-blur font-comfortaa min-h-[450px]">
        {/* Header */}
        <thead className="border-2 border-light-blue">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map(header =>
                <th key={header.id}
                  className={`border-2 border-light-blue py-2 px-3 
                  ${header.id === "date" ? "w-[200px]" : ""} 
                  ${header.id === "transactionType" ? "w-[120px]" : ""}
                  ${header.id === "transactionAmount" ? "w-[130px]" : ""}
            `}
                  onClick={header.id !== "description" ? header.column.getToggleSortingHandler() : () => { }}>
                  <div className={`flex ${header.id === "description" ? "justify-center" : "justify-between"} items-center`}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {
                      header.id !== "description" ? <div className="flex flex-col justify-center items-center">
                        <img src={`/polygon-up${header.column.getIsSorted() === "asc" ? "-focus" : ""}.svg`} />
                        <img src={`/polygon-down${header.column.getIsSorted() === "desc" ? "-focus" : ""}.svg`} />
                      </div> : ""
                    }
                  </div>
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
                <td key={cell.id} className={`px-4 py-2 text-center`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex gap-5 justify-center items-center text-white">
        <button onClick={() => table.setPageIndex(0)} className="bg-grey py-2 px-4 rounded-sm">First page</button>
        <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous page</button>
        <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next page</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last page</button>
      </div>
    </div>
  )
}

export default BasicTable;

