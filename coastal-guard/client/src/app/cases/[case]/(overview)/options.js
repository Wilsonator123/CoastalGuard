import WeatherWidgit from "@/components/(weather)/weatherWidgit";
import CameraWidgit from "./cameraWidgit";
import TidesWidgit from "@/components/(tides)/tidesWidgit";
import TeamWidgit from "@/components/(team)/teamWidgit";
import Close from "@/assets/close.svg";
import React, { useState } from "react";

const Options = ({ change, close, index }) => {
	return (
		<div className="absolute w-[300px] h-full right-[-20px] bg-secondary z-30 flex flex-col gap-5 text-3xl font-bold p-1">
			<button
				onClick={() => {
					close(false);
				}}
				className="absolute top-[-7px] right-[-7px] bg-background z-20 rounded-full border hover:bg-secondary/90 cursor-pointer"
			>
				<Close width="20" height="20" />
			</button>
			<p className="border p-5" onClick={() => change("Weather", index)}>
				Weather Widgit
			</p>
			<p className="border p-5" onClick={() => change("Camera", index)}>
				Camera Widgit
			</p>
			<p className="border p-5" onClick={() => change("Tides", index)}>
				Tides Widgit
			</p>
			<p className="border p-5" onClick={() => change("Team", index)}>
				Team Widgit
			</p>
		</div>
	);
};

export default Options;
