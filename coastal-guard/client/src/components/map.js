import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistance } from "@/hooks/maps";

export default function Map({ gridRef, lon, lat, w3w }) {
	const [distance, setDistance] = useState(null);
	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		const fetchUserLocation = async () => {
			if ("geolocation" in navigator) {
				// Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
				navigator.geolocation.getCurrentPosition(({ coords }) => {
					const { latitude, longitude } = coords;
					setUserLocation(`${latitude},${longitude}`);
				});
			}
		};

		// Fix for the default marker icon issue in Leaflet
		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl:
				"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
			iconUrl:
				"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
			shadowUrl:
				"https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
		});

		fetchUserLocation();
	}, []);

	useEffect(() => {
		const calculateDistance = async () => {
			if (userLocation) {
				const destination = `${lat},${lon}`;
				const distance = await getDistance(userLocation, destination);
				setDistance(distance);
			}
		};

		calculateDistance();
	}, [userLocation, lat, lon]);

	const handleClick = () => {
		window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
	};

	return (
		<>
			<div className="flex justify-center items-center w-full bg-primary h-[225px] relative">
				<MapContainer
					center={[lat, lon]}
					zoom={12}
					scrollWheelZoom={false}
					style={{ height: "225px", width: "100%", zIndex: 0 }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[lat, lon]}>
						<Popup>
							<button onClick={handleClick}>
								Get Directions
							</button>
						</Popup>
					</Marker>
				</MapContainer>
				{distance && (
					<div
						className="absolute top-2 right-2 p-2 bg-white rounded font-bold "
						onClick={handleClick}
					>
						<p>Estimated Time:</p>
						<p className="text-green">{distance}</p>
					</div>
				)}
			</div>
			<div className="flex flex-row w-full justify-between p-2">
				<div>
					<p className="text-xl font-bold">{gridRef}</p>
					<p className="text-xl font-bold">
						{lat.toFixed(5)}, {lon.toFixed(5)}
					</p>
				</div>
				<div>
					<p className="text-xl font-bold">{w3w}</p>
				</div>
			</div>
		</>
	);
}
