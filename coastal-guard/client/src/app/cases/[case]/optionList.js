"use client";

export default function OptionList({ changePage, active }) {
	const isActive = (page) => {
		return page == active ? "bg-primary" : "bg-accent";
	};

	return (
		<div className="flex flex-col h-[500px] w-[250px] bg-accent">
			<div
				className={`flex items-center w-full h-12 ${isActive(
					"overview"
				)}`}
			>
				<p
					className="text-background font-semibold text-2xl pl-2.5"
					onClick={() => changePage("overview")}
				>
					Overview
				</p>
			</div>
			<div
				className={`flex items-center w-full h-12 ${isActive(
					"details"
				)}`}
				onClick={() => changePage("details")}
			>
				<p className="text-background font-semibold text-2xl pl-2.5">
					Case Details
				</p>
			</div>
			<div
				className={`flex items-center w-full h-12 ${isActive(
					"weather"
				)}`}
				onClick={() => changePage("weather")}
			>
				<p className="text-background font-semibold text-2xl pl-2.5">
					Weather Details
				</p>
			</div>
		</div>
	);
}
