"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { updateUser } from "@/hooks/user";
export default function LoginForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState(null);
	const onSubmit = (data) => {
		axios
			.post("http://localhost:8000/account/login", data, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				withCredentials: true,
			})
			.then(async (res) => {
				await updateUser();
				router.push("/");
			})
			.catch((err) => {
				setError(err.response?.data?.error);
				console.log(err);
			});
	};

	return (
		<div className="flex justify-center">
			<div className="flex flex-col w-2/5 gap-5 border py-5">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-5 px-10"
				>
					{error && (
						<div className="flex justify-center text-error text-md rounded border border-error p-2 text-center">
							⚠ {error} ⚠
						</div>
					)}
					<h1 className="text-3xl text-center">Log In</h1>
					<div className="flex flex-col gap-1">
						<label className="text-lg">Email: </label>
						<input
							type="email"
							name="email"
							{...register("email", { required: true })}
							className="p-1 rounded-md bg-background border"
						/>
						{errors.email && (
							<span className="text-error">
								⚠ Username is required
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-lg">Password:</label>
						<input
							type="password"
							name="password"
							{...register("password", { required: true })}
							className="p-1 rounded-md border bg-background"
						/>
						<div className="self-end underline text-xs cursor-pointer">
							Forgot your password?
						</div>
						{errors.password && (
							<span className="text-error">
								⚠ Password is required
							</span>
						)}
					</div>
					<button
						type="submit"
						className="my-1 p-2 bg-primary border text-white text-xl rounded-2xl hover:brightness-[.9]"
					>
						Log In
					</button>
				</form>
				<div className="flex items-center text-center or mx-3">
					<p className="px-2">or</p>
				</div>
				<div className="flex flex-col px-10">
					<button
						onClick={() => router.push("/register")}
						className="my-1 p-2 bg-button text-text text-xl rounded-2xl hover:brightness-[.9] border"
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
