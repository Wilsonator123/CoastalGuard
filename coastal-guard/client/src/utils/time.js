import { DateTime } from "luxon";

export const unixToTime = (unix) => {
	const date = DateTime.fromSeconds(unix);
	return date.toLocaleString(DateTime.TIME_SIMPLE);
};
