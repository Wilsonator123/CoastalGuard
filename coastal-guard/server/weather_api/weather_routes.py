from flask import Blueprint
import requests
from flask import request
import os
from dotenv import load_dotenv
import time
from pathlib import Path
import json



load_dotenv()

weather = Blueprint('weather', __name__)


@weather.route('/')
def hello_world():
    return 'Helo, World!'


@weather.route('/get-weather', methods=['GET'])
def get_weather():

    # lat = request.args.get("lat")
    # lon = request.args.get("lon")
    #
    # if not lat or not lon:
    #     return {"error": "Missing lat or lon"}, 400
    #
    # url = ("%(url)s/onecall?lat=%(lat)s&lon=%(lon)s&appid=%(key)s&units=metric&exclude=minutely"
    #        % {"url": os.getenv("WEATHER_URL"), "lat": lat, "lon": lon, "key": os.getenv("WEATHER_API_KEY")})
    # response = requests.get(url)
    # if response.status_code != 200:
    #     return {"error": "Error fetching weather data"}, 500
    # return filter_weather(response.json())
    with open("./weather_api/exampleResponse.json", 'r') as file:
        response = file.read()
    return json.loads(response)





def filter_weather(response):
    date = time.strftime("%a %d, %b", time.gmtime(response["current"]["dt"]))
    return {
        "date": date,
        "updated": response["current"]["dt"],
        "weather": response["current"]["weather"][0],
        "temp": round(response["current"]["temp"]),
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
            {"hour": time.strftime("%H", time.gmtime(hour["dt"]))+':00', "weather": hour["weather"][0]["id"],
             "temp": round(hour["temp"])}
            for hour in response["hourly"][1:7]
        ],
        "alerts": response.get("alerts", []),
    }


