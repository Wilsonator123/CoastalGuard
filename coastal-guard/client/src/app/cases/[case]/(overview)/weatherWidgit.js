import React, { useEffect, useState } from 'react'
import Forecast from './forecast'
import WeatherTitle from './weatherTitle'
import { fetchWeather } from '@/hooks/case'
export default function WeatherWidgit() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeather(52.6, 1.2).then((data) => {
            setWeather(data);
            setLoading(false);
        })
    }, [])


    return (
        <>
            {loading ? <p>Loading...</p> :
                <>
                    <div className="h-2/3 relative flex items-center ">
                        <WeatherTitle data={weather}/>
                    </div>
                    <div className="h-1/3  bg-background rounded-b-md">
                        <Forecast data={weather}/>
                    </div>
                </>
            }
        </>
    )
}