import TeamWidgit from "@/components/(team)/teamWidgit";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("@/components/map"), {
	ssr: false,
});

const Details = ({ data }) => {
	console.log(data);
	return (
		<div className="border flex flex-col w-full rounded-lg ml-5">
			<div className="ml-5 flex my-3">
				<p className="text-5xl font-bold">Case Details : {data.gin}</p>
			</div>
			<div className="grid grid-rows-4 w-full h-full gap-2 p-2">
				<div className="row-span-2 border grid grid-cols-2 grid-rows-7 p-2 grid-flow-col">
					<p className="text-2xl font-semibold mb-2">
						Date: {data.date}
					</p>
					<p className="text-2xl font-semibold mb-2">
						GIN: {data.gin}
					</p>
					<p className="text-2xl font-semibold mb-2">
						Zone: {data.zone}
					</p>
					<p className="text-2xl font-semibold mb-2">
						Teams: [
						{data.team.map((team, index) => {
							if (index === 0) return team;
							return `, ${team}`;
						})}
						]
					</p>
					<p className="text-2xl font-semibold mb-2">
						Type: {data.type}
					</p>
					<p className="text-2xl font-semibold mb-2">
						Casualty: {data.casualty}
					</p>
					<p className="text-[#0500FF] font-bold underline text-2xl">
						<a href={data.link} target="_blank" rel="noreferrer">
							Original Link
						</a>
					</p>
					<div className="col-start-2 row-span-3">
						<div className="bg-white w-full border rounded-md p-2 h-[95%] overflow-y-auto">
							<p className="text-xl">
								{data.notes ? data.notes : "No notes available"}
							</p>
						</div>
					</div>
					<div className="col-start-2 row-start-4 row-span-4 border bg-accent">
						<TeamWidgit data={data} />
					</div>
				</div>
				<div className="row-span-2 border flex w-full text-xl justify-center font-semibold">
					<div className="w-1/2 p-2 grid grid-rows-6 grid-cols-2">
						<h1 className="col-span-2 text-2xl font-semibold">
							Location:
						</h1>
						<p className="col-span-1">{data.location}</p>
						<p>GridRef: {data.grid_ref}</p>
						<p>
							Coords: {data.lat.toFixed(5)}, {data.lon.toFixed(5)}
						</p>

						<p>W3W: {data.w3w}</p>
						<div className="col-span-2 row-span-4 flex flex-col gap-1 text-2xl">
							<p>{data.address?.road}</p>
							<p>{data.address?.town ?? data.address?.village}</p>
							<p>{data.address?.county}</p>
							<p>{data.address.postcode}</p>
						</div>
					</div>
					<div className="w-1/2 h-[95%] p-2">
						<DynamicComponentWithNoSSR
							lat={data.lat}
							lon={data.lon}
							grid_ref={data.grid_ref}
							w3w={data.w3w}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
