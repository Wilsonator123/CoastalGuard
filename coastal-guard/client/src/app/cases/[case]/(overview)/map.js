

export default function Map({gridRef, lon, lat, w3w}) {
    return(
        <>
            <div className="flex justify-center items-center w-full bg-primary h-[225px]">
                <p className="text-5xl font-bold text-white">MAP</p>
            </div>
            <div className="flex flex-row w-full justify-between">
                <div>
                    <p className="text-xl font-bold">GridRef: {gridRef}</p>
                    <p className="text-xl font-bold">Lon, Lat: {lon.toFixed(3)}, {lat.toFixed(3)}</p>
                </div>
                <div>
                    <p className="text-xl font-bold">{w3w}</p>
                </div>
            </div>
        </>
    )
}