import Map from './map'
import CaseDetails from './caseDetails'
import WeatherWidgit from './weatherWidgit'
import CameraWidgit from './cameraWidgit'

const Page = ({ data }) => {

    const lastUpdated = (date) => {

        const currentDate = new Date();
        const timeDifference = currentDate - new Date(date);
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

        if (weeksDifference > 0) {
            return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''} ago`;
        } else if (daysDifference > 0) {
            return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
        } else if (hoursDifference > 0) {
            return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
        } else {
            return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
        }
    };
    return (
        <div className="border flex flex-col w-full rounded-lg ml-5">
        <div className="ml-5 flex my-3">
            <p className="text-5xl font-bold underline">Overview: {data.gin}</p>
        </div>
        <div className="flex w-full ">
            <div className="w-[55%] bg-[#D9D9D9] h-[725px] m-5 rounded-lg relative">
                <div className="px-5 mb-5">
                    <div className="flex justify-between my-3">
                        <div>
                            <p className="text-3xl font-bold">Case Details</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">Last Updated: {lastUpdated(data.last_updated)}</p>
                        </div>
                    </div>

                    <div className="mx-1.5">
                        <CaseDetails data={data}/>
                    </div>
                </div>
                <div className="relative">
                    <Map gridRef={data.gridRef} lat={data.lat} lon={data.lon} w3w={data.w3w}/>
                </div>
                <div className="flex justify-between absolute bottom-0 w-full p-1.5 items-end">
                    <p className="font-semibold">Created at: {data.created_at.slice(0,10)}</p>
                    <p className="text-[#0500FF] font-bold underline text-2xl"><a href={data.link}>Original Link</a></p>
                </div>

            </div>
            <div className="flex flex-col w-[45%] bg-[#E48686] mr-5 my-5 rounded-lg">
                <div className="w-full h-1/3 border rounded-t-lg mb-5">
                    <WeatherWidgit lon={data.lon} lat={data.lat} address={data.address}/>
                </div>

                <div className="w-full h-1/3 bg-accent border mb-5">
                    <CameraWidgit lon={data.lon} lat={data.lat}/>
                </div>

                <div className="w-full h-1/3 bg-background border rounded-b-lg">
                </div>

            </div>
        </div>
    </div>
        );
}

export default Page;