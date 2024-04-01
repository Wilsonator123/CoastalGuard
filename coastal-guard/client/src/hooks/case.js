'use server'
export const fetchWeather = async (lat, lon) => {
    'use server'
    const res = await fetch(process.env.API_URL + `/weather/get-weather?lat=${lat}&lon=${lon}`);
    const data = await res.json();
    return data;
}