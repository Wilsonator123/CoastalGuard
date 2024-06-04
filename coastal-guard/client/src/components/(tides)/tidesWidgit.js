import React, { useEffect, useState } from "react";
import { fetchTides, fetchWeather } from "@/hooks/case";
import Charts from "./charts";
const { DateTime } = require("luxon");
import Arrow from "@/assets/arrow.svg";
import Close from "@/assets/close.svg";

export default function Tides({ data, position, edit, remove }) {
	const [tides, setTides] = useState(null);
	const [loading, setLoading] = useState(true);
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		if (!data.lat || !data.lon) return;
		fetchTides(data.lat, data.lon).then((tides) => {
			fetchWeather(data.lat, data.lon).then((weather) => {
				setWeather(weather);
				setTides(tides);
				setLoading(false);
			});
		});
	}, []);

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
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="flex w-full h-full p-2 gap-2 border rounded-lg">
					<div className="w-2/3 flex flex-col gap-2">
						<div
							id="header"
							className="h-1/3 relative bg-tides p-1"
						>
							<h1 className="text-3xl text-white font-semibold">
								{data.address.town
									? data.address.town
									: data.address.city}
							</h1>
							<div
								className={`flex absolute right-0 top-1 text-white gap-2`}
							>
								<div>{weather?.wind_speed}m/s</div>
								<div
									style={{
										transform: weather?.wind_deg
											? `rotate(${weather.wind_deg}deg)`
											: undefined,
									}}
								>
									<Arrow />
								</div>
							</div>
						</div>
						<div className="h-2/3  bg-secondary rounded-b-md">
							<Charts data={tides.data} />
						</div>
					</div>
					<div className="flex flex-col h-full w-1/3 bg-secondary">
						<div
							id="header"
							className="h-[30px] relative flex justify-between w-full p-1 items-center"
						>
							<h1 className="text-[16px] text-text font-bold">
								Tidal Times
							</h1>
							<h1 className="text-[16px] text-text font-bold">
								UTC
							</h1>
						</div>
						<div className="flex w-full h-full border-[#00000]/50 border-t flex-col p-2 overflow-y-auto no-scrollbar">
							<table className="border w-full h-full">
								<thead>
									<tr>
										<th>Hi/Lo</th>
										<th>Time</th>
										<th>Height</th>
									</tr>
								</thead>
								<tbody className="h-full w-full ">
									{tides.data.map((tide, i) => (
										<tr
											key={i}
											className="text-lg h-[40px] text-center"
										>
											<td>{tide.type}</td>
											<td>
												{DateTime.fromISO(
													tide.date
												).toFormat("HH:mm")}
											</td>
											<td>{tide.height.toFixed(2)}m</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
