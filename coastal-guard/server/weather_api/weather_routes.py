from flask import Blueprint
import requests
import os
from dotenv import load_dotenv
import time
load_dotenv()

weather = Blueprint('weather', __name__)


@weather.route('/')
def hello_world():
    return 'Helo, World!'


@weather.route('/get-weather', methods=['GET'])
def get_weather():
    lat = 52.6
    lon = 1.2

    url = ("%(url)s/onecall?lat=%(lat)s&lon=%(lon)s&appid=%(key)s&units=metric&exclude=minutely"
           % {"url": os.getenv("WEATHER_URL"), "lat": lat, "lon": lon, "key": os.getenv("WEATHER_API_KEY")})
    response = requests.get(url)
    return filter_weather(response.json())


def filter_weather(response):
    temp = response["current"]["temp"]-273.15
    date = time.strftime("%a %d, %b", time.gmtime(response["current"]["dt"]))
    return {
        "date": date,
        "updated": response["current"]["dt"],
        "weather": response["current"]["weather"][0],
        "temp": temp,
        "moon_phase": response["daily"][0]["moon_phase"],
        "sunrise": response["daily"][0]["sunrise"],
        "sunset": response["daily"][0]["sunset"],
        "visibility": response["current"]["visibility"],
        "wind_deg": response["current"]["wind_deg"],
        "wind_speed": response["current"]["wind_speed"],
        "rain": response["daily"][0].get("rain", 0),
        "total_rain": response["daily"][0].get("rain", 0),  # "rain" is the last hour, "total_rain" is the last 24 hours
        "snow": response["daily"][0].get("snow", 0),
        "total_snow": response["daily"][0].get("snow", 0),  # "snow" is the last hour, "total_snow" is the last 24 hours
        "clouds": response["current"]["clouds"],
        "uvi": response["current"]["uvi"],
        "humidity": response["current"]["humidity"],
        "hourly": [
            {"hour": time.strftime("%H", time.gmtime(hour["dt"])), "weather": hour["weather"][0]["id"]}
            for hour in response["hourly"][:12]
        ],
        "alerts": response.get("alerts", []),
    }


