"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function SignUp() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const [error, setError] = useState(null);

	const onSubmit = (data) => {
		axios
			.post("http://localhost:8000/account/createAccount", data, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
			.then((res) => {
				console.log(res.data);
				router.push("/");
			})
			.catch((err) => {
				setError(err.response.data.error);
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
						<div className="flex justify-center text-error text-lg rounded border border-error p-2">
							⚠ {error} ⚠
						</div>
					)}
					<h1 className="text-3xl text-center">Sign Up</h1>
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
								⚠ Email is required
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-lg">First Name: </label>
						<input
							type="text"
							name="text"
							{...register("first_name", { required: true })}
							className="p-1 rounded-md bg-background border"
						/>
						{errors.fname && (
							<span className="text-error">
								⚠ First Name is required
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-lg">Last Name: </label>
						<input
							type="text"
							name="text"
							{...register("last_name", { required: true })}
							className="p-1 rounded-md bg-background border"
						/>
						{errors.lname && (
							<span className="text-error">
								⚠ Last Name is required
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-lg">Password:</label>
						<input
							type="password"
							name="password"
							{...register("password", {
								required: true,
								pattern:
									/^(?=.*[A-Z])(?=.*\d)(?=.*\d)(?=.*[@$!%*?&_-])(.*){8,64}$/gm,
							})}
							className="p-1 rounded-md border bg-background"
						/>
						{errors.password?.type === "required" && (
							<span className="text-error">
								⚠ Password is required
							</span>
						)}
						{errors.password?.type === "pattern" && (
							<span className="text-error">
								⚠ Password must contain at least 8 characters,
								one uppercase letter, one number and one special
								character
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-lg">Confirm Password:</label>
						<input
							type="password"
							name="password"
							{...register("cpassword", {
								required: true,
								validate: {
									equal: (value) =>
										value === getValues("password"),
								},
							})}
							className="p-1 rounded-md border bg-background"
						/>
						{errors.cpassword?.type === "required" && (
							<span className="text-error">
								⚠ Password is required
							</span>
						)}
						{errors.cpassword?.type === "equal" && (
							<span className="text-error">
								⚠ Passwords must match
							</span>
						)}
					</div>

					<button
						type="submit"
						className="my-1 p-2 bg-secondary text-text text-xl rounded-2xl hover:brightness-[.9] border"
					>
						Sign Up
					</button>
				</form>
				<div className="flex items-center text-center or mx-3">
					<p className="px-2">or</p>
				</div>
				<div className="flex flex-col px-10">
					<button
						onClick={() => router.push("/login")}
						className="my-1 p-2 bg-primary text-white text-xl rounded-2xl hover:brightness-[.9]"
					>
						Log In
					</button>
				</div>
			</div>
		</div>
	);
}
