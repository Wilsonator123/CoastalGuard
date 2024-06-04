import UVI from "@/assets/uvi.svg";
import Sunrise from "@/assets/sunrise.svg";
import Humidity from "@/assets/humidity.svg";
import Umbrella from "@/assets/umbrella.svg";
import Snow from "@/assets/snow.svg";
import Totalsnow from "@/assets/totalsnow.svg";
import Wind from "@/assets/wind.svg";
import Signpost from "@/assets/signpost.svg";
import Clouds from "@/assets/clouds.svg";
import Temp from "@/assets/temp.svg";

import { unixToTime } from "@/utils/time";

const DayForcast = ({ weather }) => {
	const degToCompass = (num) => {
		var val = Math.floor(num / 22.5 + 0.5);
		var arr = [
			"N",
			"NNE",
			"NE",
			"ENE",
			"E",
			"ESE",
			"SE",
			"SSE",
			"S",
			"SSW",
			"SW",
			"WSW",
			"W",
			"WNW",
			"NW",
			"NNW",
		];
		return arr[val % 16];
	};

	return (
		<div className="row-start-3 col-start-1 col-span-4 row-span-6  flex flex-col gap-2 p-1 h-full">
			<div className="grid grid-cols-2 grid-rows-2 w-full h-1/3 border p-1 text-lg items-center">
				<div className="flex flex-col items-center justify-center border-b w-full h-full">
					<div className="flex">
						<Sunrise fill={"#154975"} />
						<p>Sunrise</p>
					</div>
					<p className="font-bold">{unixToTime(weather.sunrise)}</p>
				</div>
				<div className="flex flex-col items-center justify-center border-l w-full h-full">
					<div className="flex">
						<Sunrise fill={"#154975"} />
						<p>Sunset</p>
					</div>
					<p className="font-bold">{unixToTime(weather.sunset)}</p>
				</div>
				<div className="flex flex-col items-center justify-center border-r w-full h-full">
					<div className="flex">
						<Humidity fill={"#154975"} />
						<p>Humidity</p>
					</div>
					<p className="font-bold">{weather.humidity}%</p>
				</div>
				<div className="flex flex-col items-center justify-center border-t w-full h-full">
					<div className="flex">
						<UVI fill={"#154975"} />
						<p>UV Index</p>
					</div>
					<p className="font-bold">{weather.uvi}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 grid-rows-2 w-full h-1/3 border p-1 text-lg items-center">
				<div className="flex flex-col items-center justify-center border-b w-full h-full">
					<div className="flex">
						<Temp fill={"#154975"} />
						<p>Temperature</p>
					</div>
					<p className="font-bold">{weather.temp}°C</p>
				</div>
				<div className="flex flex-col items-center justify-center border-l w-full h-full">
					<div className="flex">
						<Clouds fill={"#154975"} />
						<p>Clouds</p>
					</div>
					<p className="font-bold">{weather.clouds}%</p>
				</div>
				<div className="flex flex-col items-center justify-center border-r w-full h-full">
					<div className="flex">
						<Wind fill={"#154975"} />
						<p>Wind Speed</p>
					</div>
					<p className="font-bold">{weather.wind_speed} m/s</p>
				</div>
				<div className="flex flex-col items-center justify-center border-t w-full h-full">
					<div className="flex">
						<Signpost fill={"#154975"} />
						<p>Wind Direction</p>
					</div>
					<p className="font-bold">
						{degToCompass(weather.wind_deg)} ({weather.wind_deg}°)
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 grid-rows-2 w-full h-1/3 border p-1 text-lg items-center">
				<div className="flex flex-col items-center justify-center border-b w-full h-full">
					<div className="flex">
						<Humidity fill={"#154975"} />
						<p>Rain</p>
					</div>
					<p className="font-bold">{weather.rain} mm/h</p>
				</div>
				<div className="flex flex-col items-center justify-center border-l w-full h-full">
					<div className="flex">
						<Umbrella fill={"#154975"} />
						<p>Precipitation</p>
					</div>
					<p className="font-bold">{weather.total_rain}%</p>
				</div>
				<div className="flex flex-col items-center justify-center border-r w-full h-full">
					<div className="flex">
						<Snow fill={"#154975"} />
						<p>Snow</p>
					</div>
					<p className="font-bold">{weather.snow} mm/h</p>
				</div>
				<div className="flex flex-col items-center justify-center border-t w-full h-full">
					<div className="flex">
						<Totalsnow fill={"#154975"} />
						<p>Total Snow (24h)</p>
					</div>
					<p className="font-bold">{weather.total_snow} mm</p>
				</div>
			</div>
		</div>
	);
};

export default DayForcast;
