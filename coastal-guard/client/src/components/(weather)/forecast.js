"use client";
import ForecastIcon from "./forecastIcon";
export default function Forecast({ data, hours }) {
	return (
		<div className="flex flex-row justify-evenly h-full rounded-b-md">
			{data.hourly.map((hour, index) => {
				if (index >= hours) return;
				return <ForecastIcon key={index} data={hour} index={index} />;
			})}
		</div>
	);
}
