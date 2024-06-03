import CaseDetails from "@/components/caseDetails";
import WeatherWidgit from "@/components/(weather)/weatherWidgit";
import CameraWidgit from "./cameraWidgit";
import TidesWidget from "@/components/(tides)/tidesWidgit";
import TeamWidgit from "@/components/(team)/teamWidgit";

const Page = ({ data }) => {
	return (
		<div className="border flex flex-col w-full rounded-lg ml-5">
			<div className="ml-5 flex my-3">
				<p className="text-5xl font-bold">Overview: {data.gin}</p>
			</div>
			<div className="flex w-full ">
				<div className="w-[55%] bg-[#D9D9D9] h-[725px] m-5 rounded-lg relative">
					<CaseDetails data={data} />
				</div>
				<div className="flex flex-col w-[45%] mr-5 my-5 rounded-lg">
					<div className="w-full h-1/3 border rounded-t-lg mb-5">
						<WeatherWidgit data={data} hours={6} />
					</div>
					<div className="w-full h-1/3 border mb-5">
						<TidesWidget data={data} />
					</div>

					<div className="w-full h-1/3 bg-accent border mb-5">
						<TeamWidgit data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
