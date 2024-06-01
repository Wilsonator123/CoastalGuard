"use client";

import "./globals.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountIcon from "@/assets/account.svg";
import { useUserStore } from "@/stores/userStore";
import { updateUser } from "@/hooks/user";
import { DropDown } from "./dropdown";

export default function Header() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		updateUser().then((res) => {
			if (res) {
				setLoggedIn(true);
			}
		});
	}, []);

	const toggle = () => {
		setShow(!show);
	};
	const user = useUserStore((state) => state.user);
	return (
		<div className="flex items-center justify-between p-2 bg-accent mb-5">
			<h1 className="text-4xl font-semibold text-background">
				Situational Awareness for the CoastGuard
			</h1>
			<div onClick={toggle} className="relative">
				<AccountIcon
					width={90}
					height={90}
					fill={"#fff"}
					className="pointer-events-none"
				/>
				{show && <DropDown loggedIn={loggedIn} />}
			</div>
		</div>
	);
}
