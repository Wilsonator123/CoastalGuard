import Visibility from "@/assets/visibility.svg";
import Moonset from "@/assets/moonset.svg";
import Temp from "@/assets/temp.svg";
import { unixToTime } from "@/utils/time";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import Firstquarter from "@/assets/moons/firstQuarter.svg";
import Fullmoon from "@/assets/moons/fullMoon.svg";
import Lastquarter from "@/assets/moons/thirdQuarter.svg";
import Newmoon from "@/assets/moons/newMoon.svg";
import Waningcrescent from "@/assets/moons/waningCrescent.svg";
import Waninggibbous from "@/assets/moons/waningGibbous.svg";
import Waxingcrescent from "@/assets/moons/waxingCrescent.svg";
import Waxinggibbous from "@/assets/moons/waxingGibbous.svg";
import Moonbackground from "@/assets/moonBackground.svg";

const nightforecast = ({ weather }) => {
	const [midnight, setMidnight] = useState(null);

	const getMidnight = (hourly, moonrise) => {
		const date = DateTime.fromSeconds(moonrise);
		moonrise = date.plus({ hours: 1 }).toFormat("HH" + ":00");
		const midnight = hourly.find((hour) => hour.hour == moonrise);
		setMidnight(midnight);
	};

	const moonPhase = (moonphase) => {
		let phase;

		if (moonphase < 0.125) phase = "New Moon";
		else if (moonphase < 0.25) phase = "Waxing Crescent";
		else if (moonphase == 0.25) phase = "First Quarter";
		else if (moonphase < 0.5) phase = "Waxing Gibbous";
		else if (moonphase == 0.5) phase = "Full Moon";
		else if (moonphase < 0.75) phase = "Waning Gibbous";
		else if (moonphase == 0.75) phase = "Last Quarter";
		else if (moonphase < 0.87) phase = "Waning Crescent";
		else phase = "New Moon";
		return phase;
	};

	const moonIcon = (moonphase) => {
		let icon;

		if (moonphase < 0.125)
			return (
				<Newmoon
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase < 0.25)
			return (
				<Waxingcrescent
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase == 0.25)
			return (
				<Firstquarter
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase < 0.5)
			return (
				<Waxinggibbous
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase == 0.5)
			return (
				<Fullmoon
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase < 0.75)
			return (
				<Waninggibbous
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase == 0.75)
			return (
				<Lastquarter
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else if (moonphase < 0.87)
			return (
				<Waningcrescent
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
		else
			return (
				<Newmoon
					width={"85"}
					height={"85"}
					className="absolute top-3 right-20 z-20"
				/>
			);
	};

	useEffect(() => {
		if (!weather.hourly || !weather.moonrise) return;
		getMidnight(weather.hourly, weather.moonrise);
	}, [weather]);

	return (
		<div className="row-start-3 col-start-5 col-span-4 row-span-5  flex flex-col gap-2 p-1 h-full">
			<div className="grid grid-cols-2 grid-rows-2 w-full h-1/3 border p-1 text-lg items-center">
				<div className="flex flex-col items-center justify-center border-b w-full h-full">
					<div className="flex">
						<Moonset fill={"#154975"} />
						<p>Moonrise</p>
					</div>
					<p className="font-bold">{unixToTime(weather.moonrise)}</p>
				</div>
				<div className="flex flex-col items-center justify-center border-l w-full h-full">
					<div className="flex">
						<Moonset fill={"#154975"} />
						<p>Moonset</p>
					</div>
					<p className="font-bold">{unixToTime(weather.moonset)}</p>
				</div>
				<div className="flex flex-col items-center justify-center border-r w-full h-full">
					<div className="flex">
						<Temp fill={"#154975"} />
						<p>Clouds</p>
					</div>
					<p className="font-bold">{midnight?.clouds}%</p>
				</div>
				<div className="flex flex-col items-center justify-center border-t w-full h-full">
					<div className="flex">
						<Visibility fill={"#154975"} />
						<p>Visibility</p>
					</div>
					<p className="font-bold">{midnight?.visibility} m</p>
				</div>
			</div>
			<div className="w-full h-1/3 border p-1 text-lg items-center">
				<div className="flex items-center w-full h-full justify-center">
					<div className="flex-1 flex flex-col text-center text-2xl font-bold">
						<p>{moonPhase(weather.moon_phase)}</p>
						<p>{weather.moon_phase}</p>
					</div>
					<div className="flex flex-1 justify-center items-center w-full h-full relative">
						{moonIcon(weather.moon_phase)}
						<Moonbackground
							className="absolute z-10"
							width="150"
							height="150"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default nightforecast;
