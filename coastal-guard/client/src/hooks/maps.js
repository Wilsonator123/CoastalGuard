"use server";

import axios from "axios";

export const getDistance = async (origin, destination) => {
	"use server";
	const apiKey = process.env.MAPS;
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}&traffic_model=best_guess&departure_time=now&units=imperial`;

	try {
		const response = await axios.get(url);
		return response.data.rows[0].elements[0]["duration_in_traffic"].text;
	} catch (error) {
		console.error("Error fetching travel time:", error);
		return null;
	}
};
