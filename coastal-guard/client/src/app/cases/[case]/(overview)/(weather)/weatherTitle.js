"use client";
import Image from "next/image";
const SunnyBackground = require("@/assets/weather/SunnyBackground.png");
const CloudyBackground = require("@/assets/weather/CloudyBackground.png");
const RainyBackground = require("@/assets/weather/RainyBackground.png");
const ClearBackground = require("@/assets/weather/ClearBackground.png");
// const StormyBackground = require('@/assets/weather/StormyBackground.png')
// const SnowyBackground = require('@/assets/weather/SnowyBackground.png')
import Sun from "@/assets/weather/icons/sun.svg";

export default function WeatherTitle({ data }) {
	const background = (weather) => {
		let src;
		switch (weather) {
			case "Clear":
				src = ClearBackground;
				break;
			case "Clouds":
				src = CloudyBackground;
				break;
			case "Rain":
				src = RainyBackground;
				break;
			case "Sunny":
				src = SunnyBackground;
				break;
		}
		return (
			<Image
				className="absolute z-10 top-0 left-0"
				src={src}
				fill={true}
			/>
		);
	};

	const icon = (weather) => {};

	const weatherTitle = (weather) => {
		let title = data.weather.main;

		return title.charAt(0).toUpperCase() + title.slice(1);
	};

	return (
		<>
			<div className="flex z-30 ml-5">
				<div>
					<p className="text-[64px] text-white">{data.temp}°</p>
				</div>
				<div className="flex flex-col justify-center pt-2">
					<p className="text-[32px] text-white font-semibold leading-6">
						{weatherTitle()}
					</p>
					<p className="text-xl text-white font-semibold ">Ipswich</p>
				</div>
			</div>
			{data.weather.main === "Sunny" ?? (
				<Sun
					className="absolute right-10 top-5 z-20"
					width={60}
					height={60}
				/>
			)}
			{background(data.weather.main)}
		</>
	);
}
