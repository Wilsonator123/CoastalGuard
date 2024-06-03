import CaseDetails from "@/components/caseDetails";
import WeatherWidgit from "@/components/(weather)/weatherWidgit";
import CameraWidgit from "./cameraWidgit";
import TidesWidgit from "@/components/(tides)/tidesWidgit";
import TeamWidgit from "@/components/(team)/teamWidgit";
import React, { useEffect, useState } from "react";
import Options from "./options";
import Default from "@/components/default";
import { getCustomLayout, setCustomLayout } from "@/hooks/fetchUser";

const Page = ({ data }) => {
	const [editing, setEditing] = useState(false);
	const [showOptions, setShowOptions] = useState({
		show: false,
		index: null,
	});

	const toggle = (value, index) => {
		setShowOptions({ show: value, index: index });
	};

	const componentList = [
		{
			Default: <Default add={toggle} edit={editing} name="Default" />,
			Tides: (
				<TidesWidgit
					data={data}
					edit={editing}
					remove={remove}
					name="Tides"
				/>
			),
			Team: (
				<TeamWidgit
					data={data}
					edit={editing}
					remove={remove}
					name="Team"
				/>
			),

			Weather: (
				<WeatherWidgit
					data={data}
					hours={6}
					edit={editing}
					remove={remove}
					name="Weather"
				/>
			),
			Camera: (
				<CameraWidgit
					lat={data.lat}
					lon={data.lon}
					edit={editing}
					remove={remove}
					name="Camera"
				/>
			),
		},
	];

	const [reset, setReset] = useState(null);
	const [loading, setLoading] = useState(true);
	const [components, setComponents] = useState(null);

	const toggleEdit = (value) => {
		setEditing(value);
		const temp = components.map((item, index) => {
			return React.cloneElement(item, {
				edit: !editing,
				position: index,
			});
		});
		setComponents(temp);
		if (value) setReset(temp);
		else setReset(null);
	};

	const resetItems = () => {
		setComponents(reset);
	};

	function changeComponent(comp, index) {
		comp = componentList[0][comp];
		setComponents((prevComponents) => {
			return prevComponents.map((component, i) => {
				if (i === index) {
					return React.cloneElement(comp, {
						edit: editing,
						position: index,
					});
				}
				return component;
			});
		});
		setShowOptions({ show: false, index: null });
	}

	function remove(index) {
		setComponents((prevComponents) => {
			return prevComponents.map((component, i) => {
				if (i === index) {
					return React.cloneElement(
						<Default add={toggle} name="Default" />,
						{
							position: index,
							edit: editing,
						}
					);
				}
				return component;
			});
		});
	}

	const saveLayout = async () => {
		const layout = components.map((component) => {
			return component.props.name;
		});

		await setCustomLayout(layout);

		toggleEdit(false);
	};

	const initComp = (layout) => {
		setComponents(
			layout.map((component, index) => {
				return React.cloneElement(componentList[0][component], {
					edit: editing,
					position: index,
				});
			})
		);
		setLoading(false);
	};

	useEffect(() => {
		const getLayout = async () => {
			let layout = await getCustomLayout();
			if (!layout) {
				layout = ["Weather", "Tides", "Camera"];
			}
			initComp(layout);
			setLoading(false);
		};
		getLayout();
	}, []);

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="border flex flex-col w-full rounded-lg ml-5 relative">
					<div className="ml-5 flex my-3 justify-between">
						<p className="text-5xl font-bold">
							Overview: {data.gin}
						</p>
						{editing ? (
							<div>
								<button
									onClick={resetItems}
									className="h-[45px] w-[100px] bg-background border border-text text-text text-xl font-semibold rounded mr-5"
								>
									Reset
								</button>
								<button
									onClick={() => saveLayout()}
									className="h-[45px] w-[100px] bg-primary text-white text-xl font-semibold rounded mr-5"
								>
									Save
								</button>
							</div>
						) : (
							<div>
								<button
									onClick={() => toggleEdit(true)}
									className="w-[100px] h-[45px] bg-primary text-white text-xl font-semibold rounded mr-5"
								>
									Edit
								</button>
							</div>
						)}
					</div>
					<div className="flex w-full h-[725px]">
						<div className="w-[55%] bg-[#D9D9D9] m-5 h-full rounded-lg relative">
							<CaseDetails data={data} />
						</div>
						<div className="flex flex-col w-[45%] h-full mr-5 my-5 relative gap-2">
							{showOptions.show && (
								<Options
									close={toggle}
									index={showOptions.index}
									change={changeComponent}
								/>
							)}
							{components.map((component, index) => (
								<div
									key={index}
									className="flex h-1/3 w-full relative border border-secondary rounded-lg items-center justify-center"
								>
									{component}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Page;
