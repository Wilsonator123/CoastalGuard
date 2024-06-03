"use server";
import { cookies } from "next/headers";
export const getUser = async () => {
	"use server";
	try {
		const id = cookies().get("userID");
		if (!id) return false;

		const response = await fetch(
			process.env.API_URL + `/account/getAccount`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: "userID=" + id.value,
				},
				withCredentials: true,
				credentials: "include",
			}
		);
		return await response.json();
	} catch (error) {
		return false;
	}
};

export const getCustomLayout = async () => {
	"use server";
	try {
		const id = cookies().get("userID");
		if (!id) return false;

		const response = await fetch(
			process.env.API_URL + `/account/getLayout`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: "userID=" + id.value,
				},
				withCredentials: true,
				credentials: "include",
			}
		);
		return await response.json();
	} catch (error) {
		return false;
	}
};

export const setCustomLayout = async (layout) => {
	"use server";
	try {
		const id = cookies().get("userID");
		if (!id) return false;

		const response = await fetch(
			process.env.API_URL + `/account/setLayout`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: "userID=" + id.value,
				},
				body: JSON.stringify({ layout }),
				withCredentials: true,
				credentials: "include",
			}
		);
		return await response.json();
	} catch (error) {
		console.error("Error setting layout:", error);
		return false;
	}
};

export const clearUser = async () => {
	"use server";
	try {
		const id = cookies().get("userID");
		if (!id) return false;
		cookies().set("userID", "", { expires: new Date(0) });
	} catch (error) {
		return false;
	}
};
