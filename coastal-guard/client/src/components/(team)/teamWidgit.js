"use client";
import Close from "@/assets/close.svg";

export default function TeamWidgit({ data, position, edit, remove }) {
	return (
		<div className="w-full h-full">
			{edit && (
				<button
					onClick={() => {
						remove(position);
					}}
					className="absolute top-[-7px] right-[-7px] bg-background z-20 rounded-full border hover:bg-secondary/90 cursor-pointer"
				>
					<Close width="20" height="20" />
				</button>
			)}
			<div className="flex w-full h-full bg-accent border-[#00000]/50 border-t rounded-lg flex-col p-2">
				<table className="border border-white w-full h-full items-center">
					<thead className="flex flex-row w-full h-1/5">
						<tr className="flex w-full text-center text-lg text-white items-center">
							<th className="flex-auto w-1/3">Call Sign</th>
							<th className="flex-auto w-1/3">Resonse Code</th>
							<th className="flex-auto w-1/3">OIC</th>
						</tr>
					</thead>
					<tbody className="flex flex-col w-full h-4/5 items-center overflow-y-auto">
						{data.responders.flatMap((responder, index) =>
							Object.keys(responder).length === 1 ? (
								<tr
									key={responder["Response Record Id"]}
									className="flex 
                  w-full text-lg items-center text-background 
                  text-left font-semibold justify-center
                  border-t pl-3"
								>
									<td className="flex-auto w-full">
										{responder["Response Record Id"]}
									</td>
								</tr>
							) : responder["Response Code"] <= 2 ? (
								<tr
									key={responder["Response Record Id"]}
									className="flex 
                  w-full text-lg items-center text-background 
                  text-center font-semibold justify-center
                  border-t"
								>
									<td className="flex-auto w-1/3">
										{responder.Callsign}
									</td>
									<td className="flex-auto w-1/3">
										{responder["Response Code"]}
									</td>
									<td className="flex-auto w-1/3">
										{responder["OIC Qualified"]}
									</td>
								</tr>
							) : null
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
