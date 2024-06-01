export default function Map({ gridRef, lon, lat, w3w }) {
	return (
		<>
			<div className="flex justify-center items-center w-full bg-primary h-[225px]">
				<p className="text-5xl font-bold text-white">MAP</p>
			</div>
			<div className="flex flex-row w-full justify-between p-2">
				<div>
					<p className="text-xl font-bold">{gridRef}</p>
					<p className="text-xl font-bold">
						{lat.toFixed(5)}, {lon.toFixed(5)}
					</p>
				</div>
				<div>
					<p className="text-xl font-bold">{w3w}</p>
				</div>
			</div>
		</>
	);
}
