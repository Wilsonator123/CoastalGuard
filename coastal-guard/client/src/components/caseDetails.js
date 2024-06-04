import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("@/components/map"), {
	ssr: false,
});

export default function CaseDetails({ data }) {
	const lastUpdated = (date) => {
		const currentDate = new Date();
		const timeDifference = currentDate - new Date(date);
		const minutesDifference = Math.floor(timeDifference / (1000 * 60));
		const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
		const daysDifference = Math.floor(
			timeDifference / (1000 * 60 * 60 * 24)
		);
		const weeksDifference = Math.floor(
			timeDifference / (1000 * 60 * 60 * 24 * 7)
		);

		if (weeksDifference > 0) {
			return `${weeksDifference} week${
				weeksDifference > 1 ? "s" : ""
			} ago`;
		} else if (daysDifference > 0) {
			return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
		} else if (hoursDifference > 0) {
			return `${hoursDifference} hour${
				hoursDifference > 1 ? "s" : ""
			} ago`;
		} else {
			return `${minutesDifference} minute${
				minutesDifference > 1 ? "s" : ""
			} ago`;
		}
	};
	return (
		<div className="h-full relative">
			<div className="px-5 mb-5">
				<div className="flex justify-between my-3">
					<div>
						<p className="text-3xl font-bold">Case Details</p>
					</div>
					<div>
						<p className="text-xl font-bold">
							Last Updated:{" "}
							{lastUpdated(data.last_updated ?? data.created_at)}
						</p>
					</div>
				</div>

				<p className="text-2xl font-semibold mb-3">
					Type of incident: {data.type}
				</p>
				<p className="text-2xl font-semibold mb-3">
					Casualty: {data.casualty}
				</p>
				<p className="text-2xl font-semibold mb-3">
					Teams: [
					{data.team.map((team, index) => {
						if (index === 0) return team;
						return `, ${team}`;
					})}
					]
				</p>
				<div>
					<p className="text-2xl font-semibold mb-2">Notes:</p>
					<div className="bg-white w-full h-36 border rounded-md p-2">
						<p className="text-xl">
							{data.notes ? data.notes : "No notes available"}
						</p>
					</div>
				</div>
			</div>

			<div className="relative h-[255px] w-full">
				<DynamicComponentWithNoSSR
					lat={data.lat}
					lon={data.lon}
					grid_ref={data.grid_ref}
					w3w={data.w3w}
				/>
			</div>
			<div className="flex justify-between absolute bottom-1 w-full p-1.5 items-end">
				<p className="font-semibold">
					Created at: {data.created_at.slice(0, 10)}
				</p>
				<p className="text-[#0500FF] font-bold underline text-2xl">
					<a href={data.link}>Original Link</a>
				</p>
			</div>
		</div>
	);
}
