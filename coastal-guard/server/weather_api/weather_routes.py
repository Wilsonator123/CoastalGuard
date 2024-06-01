from flask import Blueprint
import requests
from flask import request
import os
from dotenv import load_dotenv
import time
from pathlib import Path
import json
from marshmallow import (
    Schema,
    ValidationError,
    fields,
    pre_load,
    validate,
)

# Schemas

class WeatherRequest(Schema):
    lat = fields.Float(required=True)
    lon = fields.Float(required=True)

class WeatherResponse(Schema):
    date = fields.String(required=True)
    updated = fields.Integer(required=True)
    weather = fields.Dict(required=True)
    temp = fields.Integer(required=True)
    moon_phase = fields.Float(required=True)
    sunrise = fields.Integer(required=True)
    sunset = fields.Integer(required=True)
    visibility = fields.Integer(required=True)
    wind_deg = fields.Integer(required=True)
    wind_speed = fields.Float(required=True)
    rain = fields.Float()
    total_rain = fields.Float()
    snow = fields.Float()
    total_snow = fields.Float()
    clouds = fields.Integer(required=True)
    uvi = fields.Float(required=True)
    humidity = fields.Integer(required=True)
    hourly = fields.List(fields.Dict(), required=True)
    alerts = fields.List(fields.Dict(), missing=[])

    @pre_load
    def filter_weather(self, data, **kwargs):
        data['date'] = time.strftime("%a %d, %b", time.gmtime(data["current"]["dt"]))
        data["hourly"] =[
            {"hour": time.strftime("%H", time.gmtime(hour["dt"]))+':00', "weather": hour["weather"][0]["id"],
             "temp": round(hour["temp"])}
            for hour in data["hourly"][1:7]
        ],
        data["temp"] = round(data["current"]["temp"])

weather_request = WeatherRequest()
weather_response = WeatherResponse()

load_dotenv()

weather = Blueprint('weather', __name__)


@weather.route('/')
def hello_world():
    return 'Helo, World!'


@weather.route('/get-weather', methods=['GET'])
def get_weather():
    try:
        location = weather_request.load(request.args)

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
    except ValidationError as error:
        return {"error": error.messages}, 400


def filter_weather(response):
    return weather_request.dumps({
        "date": response["current"]["dt"],
        "updated": response["current"]["dt"],
        "weather": response["current"]["weather"][0],
        "temp": response["current"]["temp"],
        "moon_phase": response["daily"][0]["moon_phase"],
        "sunrise": response["daily"][0]["sunrise"],
        "sunset": response["daily"][0]["sunset"],
        "visibility": response["current"]["visibility"],
        "wind_deg": response["current"]["wind_deg"],
        "wind_speed": response["current"]["wind_speed"],
        "rain": response["daily"][0].get("rain"),
        "total_rain": response["daily"][0].get("rain"),  # "rain" is the last hour, "total_rain" is the last 24 hours
        "snow": response["daily"][0].get("snow"),
        "total_snow": response["daily"][0].get("snow"),  # "snow" is the last hour, "total_snow" is the last 24 hours
        "clouds": response["current"]["clouds"],
        "uvi": response["current"]["uvi"],
        "humidity": response["current"]["humidity"],
        "hourly": response["hourly"],
        "alerts": response.get("alerts"),
    })


