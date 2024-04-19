'use client'
import { useEffect, useState } from "react";
import { fetchCameras } from "@/hooks/case";

export default function CameraWidgit({ lon, lat }) {
    const [cameras, setCameras] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCameras(lat, lon).then((data) => {
            setCameras(data);
            setLoading(false);
        });

    }, [lon, lat])

    return (
        <>
            {loading ? <p>Loading...</p> :
                <div className="flex flex-col overflow-hidden w-full h-full">{cameras.map((camera) => {
                    return (
                        <div key={camera.name} className="flex text-background">
                            <h1>{camera.name}</h1>
                        </div>
                    )
                })}</div>

            }
        </>

    )
}