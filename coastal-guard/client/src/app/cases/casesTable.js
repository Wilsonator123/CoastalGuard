"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import ExternalLink from "@/assets/externalLink.svg";

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor("gin", {
		header: "Gin",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("location", {
		header: "Location",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("type", {
		header: "Type",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("date", {
		header: "Date",
		cell: (info) => {
			const cell = info.getValue();
			if (cell) {
				const re = /(.*)( \d{2}:\d{2})/gm;
				const date = re.exec(cell);
				if (date) {
					return date[1];
				} else return null;
			} else return null;
		},
	}),
];
export default function Page(props) {
	const router = useRouter();
	const [data, setData] = useState(() => [...props.data]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="flex mx-auto my-15">
			<table className="mx-auto">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className="font-semibold text-xl bg-primary text-zinc w-[225px] h-[70px]"
						>
							{headerGroup.headers.map((header) => (
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
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className="bg-[#DBDADA] hover:bg-[#E0DBD9] bg-opacity-20"
							onClick={() =>
								router.push(`/cases/${row.original.gin}`)
							}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className="border mx-10 px-5 text-center cursor-pointer w-[225px] h-[60px] text-xl font-semibold"
								>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
