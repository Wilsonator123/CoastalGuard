import Image from 'next/image'
const SunnyBackground = require('@/assets/weather/SunnyBackground.png')
import Sun from '@/assets/weather/icons/Sun.svg'
import Map from './Map'
import Forecast from './forecast'
import CaseDetails from './caseDetails'

const Page = ({ data }) => {
    return (
        <div className="border flex flex-col w-full rounded-lg ml-5">
        <div className="ml-5 flex my-3">
            <p className="text-5xl font-bold underline">Overview: {data.gin}</p>
        </div>
        <div className="flex w-full ">
            <div className="w-3/5 bg-[#D9D9D9] h-[725px] m-5 rounded-lg relative">
                <div className="px-5 mb-5">
                    <div className="flex justify-between my-3">
                        <div>
                            <p className="text-3xl font-bold">Case Deatils</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">Last Updated: Now</p>
                        </div>
                    </div>

                    <div className="mx-1.5">
                        <CaseDetails data={data}/>
                    </div>
                </div>
                <div className="relative">
                    <Map />
                </div>
                <div className="flex justify-between absolute bottom-0 w-full p-1.5 items-end">
                    <p className="font-semibold">Created at: 20/02/2004</p>
                    <p className="text-[#0500FF] font-bold underline text-2xl"><a href={data.link}>Original Link</a></p>
                </div>

            </div>
            <div className="flex flex-col w-2/5 bg-[#E48686] mr-5 my-5 rounded-lg">
                <div className="w-full h-1/3 border rounded-t-lg mb-5">
                    <div className="h-2/3 relative flex items-center ">
                        <div className="flex z-30 ml-5">
                            <div>
                                <p className="text-[64px] text-white">20°</p>
                            </div>
                            <div className="flex flex-col justify-center pt-2">
                                <p className="text-3xl text-white font-semibold leading-6">Sunny</p>
                                <p className="text-xl text-white font-semibold ">Ipswich</p>
                            </div>
                        </div>
                        <Sun className="absolute right-10 top-5 z-20" width={60} height={60}/>
                        <Image className="absolute z-10 top-0 left-0" src={ SunnyBackground } fill={true}/>
                    </div>
                    <div className="h-1/3  bg-background">
                        <Forecast />
                    </div>
                </div>

                <div className="w-full h-1/3 bg-accent border mb-5">
                </div>

                <div className="w-full h-1/3 bg-background border rounded-b-lg">
                </div>

            </div>
        </div>
    </div>
        );
}

export default Page;