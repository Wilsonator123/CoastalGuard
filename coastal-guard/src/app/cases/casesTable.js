'use client'

import React, { useState } from 'react'
import {
    createColumnHelper,
        flexRender,
        getCoreRowModel,
        useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()


const columns = [
    columnHelper.accessor('gin', {
        header: 'Gin',
        cell: info => info.getValue(),

    }),
    columnHelper.accessor('type', {
        header: 'Type',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('location', {
        header: 'Location',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => <b>{info.getValue()}</b>,

    }),
]
export default function Page(props) {
    const [data, setData] = useState(() => [...props.data]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <div className="flex mx-auto">
            <table className="mx-auto">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="font-semibold text-xl bg-primary text-zinc">
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="border">
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-[#E0DBD9]"  onClick={() => console.log("here")}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="border mx-10 px-5 text-center cursor-pointer">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


