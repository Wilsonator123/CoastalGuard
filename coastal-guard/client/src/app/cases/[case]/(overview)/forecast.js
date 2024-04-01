'use client'
import ForecastIcon from './forecastIcon'
export default function Forecast({data}) {

    return(
        <div className="flex flex-row justify-evenly h-full rounded-b-md">
            {data.hourly.map((hour, index) => {
                if(index >= 6) return;
                return <ForecastIcon data={hour} index={index}/>
            })}
        </div>
    )
}