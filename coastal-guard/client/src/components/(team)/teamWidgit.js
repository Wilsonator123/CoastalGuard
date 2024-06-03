"use client";

export default function TeamWidgit({ data }) {
	return (
		<>
			<div className="flex w-full h-full border-[#00000]/50 border-t flex-col p-2">
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
		</>
	);
}
