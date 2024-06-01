import Map from "./Map";
import CaseDetails from "./caseDetails";
import WeatherWidgit from "./(weather)/weatherWidgit";
import TidesWidget from "./(tides)/tidesWidgit";

const Page = ({ data }) => {
	return (
		<div className="border flex flex-col w-full rounded-lg ml-5">
			<div className="ml-5 flex my-3">
				<p className="text-5xl font-bold underline">
					Overview: {data.gin}
				</p>
			</div>
			<div className="flex w-full ">
				<div className="w-[55%] bg-[#D9D9D9] h-[725px] m-5 rounded-lg relative">
					<div className="px-5 mb-5">
						<div className="flex justify-between my-3">
							<div>
								<p className="text-3xl font-bold">
									Case Deatils
								</p>
							</div>
							<div>
								<p className="text-xl font-bold">
									Last Updated: Now
								</p>
							</div>
						</div>

						<div className="mx-1.5">
							<CaseDetails data={data} />
						</div>
					</div>
					<div className="relative">
						<Map />
					</div>
					<div className="flex justify-between absolute bottom-0 w-full p-1.5 items-end">
						<p className="font-semibold">Created at: 20/02/2004</p>
						<p className="text-[#0500FF] font-bold underline text-2xl">
							<a href={data.link}>Original Link</a>
						</p>
					</div>
				</div>
				<div className="flex flex-col w-[45%] mr-5 my-5 rounded-lg">
					<div className="w-full h-1/3 border rounded-t-lg mb-5">
						<WeatherWidgit data={data} />
					</div>

					<div className="w-full h-1/3 border mb-5">
						<TidesWidget data={data} />
					</div>

					<div className="w-full h-1/3 bg-background border rounded-b-lg"></div>
				</div>
			</div>
		</div>
	);
};

export default Page;
