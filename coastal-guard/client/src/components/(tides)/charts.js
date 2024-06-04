import { useEffect, useRef } from "react";
import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Title,
	Tooltip,
	Legend,
	Filler,
	TimeScale,
	TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-luxon";

Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Title,
	Tooltip,
	Legend,
	Filler,
	TimeScale,
	TimeSeriesScale
);

const TideChart = ({ data }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		const ctx = chartRef.current.getContext("2d");

		const labels = data.map((item) => new Date(item.time));

		const heights = data.map((item) => item.height);

		const chartData = {
			labels: labels,
			datasets: [
				{
					data: heights,
					fill: "start", // Enable fill
					borderColor: "rgba(3, 177, 254, 0)",
					backgroundColor: "rgba(3, 177, 254, 0.2)",
					tension: 0.4, // Set tension for curved lines
				},
			],
		};

		const config = {
			type: "line",
			data: chartData,
			options: {
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					x: {
						type: "time",
						time: {
							unit: "hour",
							displayFormats: {
								hour: "HH",
							},
						},
						ticks: {
							stepSize: 1,
						},
						title: {
							display: false,
							text: "Time",
						},
					},
					y: {
						ticks: {
							stepSize: 0.2,
						},
						title: {
							display: true,
						},
					},
				},
			},
		};

		const myChart = new Chart(ctx, config);

		return () => {
			myChart.destroy();
		};
	}, [data]);

	return (
		<div className="w-[100%] h-[145px] flex items-center justify-center">
			<canvas ref={chartRef}></canvas>
		</div>
	);
};

export default TideChart;
