import React, { useEffect, useState } from 'react'
import Forecast from '../forecast'
import WeatherTitle from './weatherTitle'
import { fetchWeather } from '@/hooks/case'
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
export default function WeatherWidgit(props) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition
    } = useSortable({
        id: props.id,
    });

    useEffect(() => {
        fetchWeather(52.6, 1.2).then((data) => {
            setWeather(data);
            setLoading(false);
        })
    }, [])

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1px solid red",
        marginTop: "10px",
    };


    return (
        <div className="w-[45%] h-1/3">
            {loading ? <p>Loading...</p> :
                <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="h-full">
                    <div className="h-2/3 relative flex items-center ">
                        <WeatherTitle data={weather}/>
                    </div>
                    <div className="h-1/3  bg-background rounded-b-md">
                        <Forecast data={weather}/>
                    </div>
                </div>
            }
        </div>
    )
}