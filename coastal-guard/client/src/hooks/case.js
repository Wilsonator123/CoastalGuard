"use server";
export const fetchWeather = async (lat, lon) => {
	"use server";
	const res = await fetch(
		process.env.API_URL + `/weather/get-weather?lat=${lat}&lon=${lon}`
	);
	return await res.json();
};

export const fetchCameras = async (lat, lon) => {
	"use server";
	const res = await fetch(
		process.env.API_URL + `/location/get-cameras?lat=${lat}&lon=${lon}`
	);
	return await res.json();
};
