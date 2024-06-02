import React, { useState, useEffect } from "react";
import { fetchWeather } from "@/hooks/case";
import WeatherTitle from "@/components/(weather)/weatherTitle";
import Forecast from "@/components/(weather)/forecast";
import Dayforecast from "./dayforecast";
import Nightforecast from "./nightforecast";
const Weather = ({ data }) => {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!data.lat || !data.lon) return;

		fetchWeather(data.lat, data.lon).then((data) => {
			setWeather(data);
			setLoading(false);
		});
	}, []);

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="border flex flex-col w-full rounded-lg ml-5">
					<div className="ml-5 flex my-3">
						<p className="text-5xl font-bold">Weather:</p>
						<div className="w-2/3 text-center self-center font-semibold text-4xl px-5 py-1  rounded ">
							{weather?.summary}
						</div>
					</div>
					{weather.alerts.length == 1 && (
						<div
							className="flex flex-col text-xl bg-red-100 border font-semibold border-error text-errorText px-4 py-3 rounded relative ml-5 mr-5"
							role="alert"
						>
							<h1 className="text-xl font-bold">Alert:</h1>
							<span className="block sm:inline">Big Storm</span>
						</div>
					)}

					<div className="grid grid-cols-8 grid-rows-7 w-full h-full relative gap-2">
						<div className="row-start-1 col-start-2 col-span-6 border m-2">
							<Forecast data={weather} hours={12} />
						</div>

						<div className="row-start-2 col-start-1 row-span-1 col-span-4 relative z-10">
							<WeatherTitle data={weather} />
						</div>
						<div className="row-start-2 col-start-1 col-span-4 z-30 text-white text-3xl font-bold">
							<div className="flex flex-row z-30 ml-5 w-full h-full items-center">
								<div>
									<p className="text-[64px] text-white">
										{weather.temp}°
									</p>
								</div>
								<div className="flex flex-col justify-center pt-2">
									<p className="text-[32px] text-white font-semibold leading-6">
										{weather.weather?.main}
									</p>
									<p className="text-xl text-white font-semibold ">
										{data.address.city
											? data.address.city
											: data.address.town}
									</p>
								</div>
							</div>
						</div>

						<Dayforecast weather={weather} />
						<div className="row-start-2 col-start-5 row-span-1 col-span-4 relative z-10">
							<WeatherTitle data={weather} night={true} />
						</div>
						<div className="row-start-2 col-start-5 col-span-4 z-30 text-white text-3xl font-bold">
							<div className="flex flex-row z-30 ml-5 w-full h-full items-center">
								<div>
									<p className="text-[64px] text-white">
										{weather?.night_temp}°
									</p>
								</div>
								<div className="flex flex-col justify-center pt-2">
									<p className="text-[32px] text-white font-semibold leading-6">
										{weather.weather?.main}
									</p>
									<p className="text-xl text-white font-semibold ">
										{data.address.city
											? data.address.city
											: data.address.town}
									</p>
								</div>
							</div>
						</div>
						<Nightforecast weather={weather} />
					</div>
				</div>
			)}
		</>
	);
};

export default Weather;
