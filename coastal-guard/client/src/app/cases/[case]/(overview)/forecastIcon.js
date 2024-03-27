import ClearMoon from '@/assets/weather/icons/clearMoon.svg';
import CloudMoon from '@/assets/weather/icons/cloudMoon.svg';
import Clouds from '@/assets/weather/icons/clouds.svg';
import RainClouds from '@/assets/weather/icons/rainClouds.svg';
import Sun from '@/assets/weather/icons/sunIcon.svg';
import SunClouds from '@/assets/weather/icons/sunClouds.svg';

const chooseIcon = (weather) => {
    weather = weather.toString();
    if(weather === '800'){
        weather = 'Sun'
    }else if(weather === '801'){
        weather = 'SunClouds'
    }else if(weather.startsWith('8')){
        weather = 'Clouds'
    }else if(weather.startsWith('5') || weather.startsWith('3')){
        weather = 'Rain'
    }

    switch(weather) {
        case 'Clear':
            return <ClearMoon width={31} height={20}/>
        case 'Rain':
            return <RainClouds width={31} height={27}/>
        case 'Sun':
            return <Sun width={30} height={30} />
        case 'SunClouds':
            return <SunClouds width={32} height={27}/>
        case 'Clouds':
            return <Clouds width={31} height={20}/>
        case 'CloudMoon':
            return <CloudMoon width={31} height={20}/>
        default:
            return null;
    }
}
export default function ForecastIcon({data, index}) {
    return (
        <div className={`relative flex flex-col items-center border border-contrast border-opacity-5 w-1/6 min-h-full ${index === 0 ? 'ml-[1px] rounded-bl-md' : ''} ${index != 5 ? 'mr-2' :'mr-[1px] rounded-br-md'}`}>
            <div>
                {data.hour}
            </div>
            <div className="absolute top-[19px] right-1">
                {chooseIcon(data.weather)}
            </div>
            <div className="absolute bottom-0 left-1">
                <p className="text-text text-2xl">{data.temp}°</p>
            </div>
        </div>
    )
}