import Image from "next/image";
import Moon from "@/app/assets/moon.svg";
import Map from "@/app/assets/map.svg";
import TwitterBird from "@/app/assets/twitterBird.svg";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between text-center">
        <div className="flex w-full h-64 bg-primary text-background text-left items-center justify-center">
            <div className="text-4xl font-semibold italic w-[1190px]"> Welcome to the situational awareness app designed for HM CoastGuard</div>
        </div>

        <div className="flex flex-row w-full justify-evenly items-center px-8 my-20">
            <div className = "flex flex-col w-[380px] h-[435px] bg-zinc bg-opacity-20 items-center">
                <Moon width={150} height={150} fill={"#fff"} className="mt-8"/>
                <div className="text-3xl font-bold underline my-5">Lighting Info</div>
                <div className="text-2xl w-80 text-center">We collect a vast range of lighting information including looking at the sun, sky and moon to determine the lighting conditions</div>
            </div>
            <div className="flex flex-col w-[380px] h-[435px] bg-zinc bg-opacity-20 items-center">
                <Map width={150} height={150} fill={"#fff"} className="mt-8"/>
                <div className="text-3xl font-bold underline my-5">GIS Info</div>
                <div className="text-2xl w-80 text-center">Using GIS we incorporate maps with geographical information such as multiple layers and elevation and terrain mapping
                </div>
            </div>
            <div className="flex flex-col w-[380px] h-[435px] bg-zinc bg-opacity-20 items-center">
                <TwitterBird width={150} height={150} fill={"#fff"} className="mt-8"/>
                <div className="text-3xl font-bold underline my-5">Social Media Feed</div>
                <div className="text-2xl w-80 text-center">By implementing all the major social media platforms we can give up-to-date tweets and information
                </div>
            </div>
        </div>

    </main>
  );
}
