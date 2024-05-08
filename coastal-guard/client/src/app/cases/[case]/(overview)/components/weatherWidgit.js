import React, { useEffect, useState } from 'react'
import Forecast from '../forecast'
import WeatherTitle from './weatherTitle'
import { fetchWeather } from '@/hooks/case'
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import Close from "@/assets/close.svg";
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
        disabled: !props.edit,
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
        cursor: props.edit ? 'grab' : 'default'
    };

    const handleClick = () => {
        props.remove(props.id);
    }


    return (
        <div className="w-[472px] h-[220px] relative">
            <button onClick={handleClick} className="absolute top-[-7px] right-[-7px] bg-background z-20 rounded-full border hover:bg-secondary/90 cursor-pointer" >
                <Close width="20" height="20" />
            </button>
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