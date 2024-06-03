"use client";

import React from "react";
import { logout } from "@/hooks/user";
import { useUserStore } from "@/stores/userStore";
export function DropDown() {
	const user = useUserStore((state) => state.user);
	const handleLogout = async () => {
		await logout();
	};
	return (
		<div className="select-none">
			{user ? (
				<div className="absolute bg-background flex flex-col gap-5 w-full py-3 z-40">
					<button>Account</button>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div className="absolute bg-background flex flex-col gap-5 w-full py-3 z-40">
					<a href="/login">Login</a>
					<a href="/register">Register</a>
				</div>
			)}
		</div>
	);
}
