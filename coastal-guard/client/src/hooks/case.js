"use server";
export const fetchWeather = async (lat, lon) => {
	"use server";
	try {
		if (!lat || !lon) return;

		const res = await fetch(
			process.env.API_URL + `/weather/get-weather?lat=${lat}&lon=${lon}`
		);
		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
};

export const fetchCameras = async (lat, lon) => {
	"use server";
	try {
		const res = await fetch(
			process.env.API_URL + `/location/get-cameras?lat=${lat}&lon=${lon}`
		);
		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
};

export const fetchTides = async (lat, lon) => {
	"use server";
	try {
		const res = await fetch(
			process.env.API_URL + `/weather/get-tides?lat=${lat}&lon=${lon}`
		);

		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
};
