from flask import Blueprint
import requests
from flask import request
import os
from dotenv import load_dotenv
import time
from datetime import datetime
from pathlib import Path
import json
from decimal import Decimal
from marshmallow import (
    Schema,
    ValidationError,
    fields,
    pre_load,
    validate,
)
from weather_api.tides import get_tides

# Schemas

class WeatherRequest(Schema):
    lat = fields.Float(required=True)
    lon = fields.Float(required=True)
    
    @pre_load
    def weather_request(self, data, **kwargs):
        return {
            "lon": float(data["lon"]),
            "lat": float(data["lat"]),
        }
    
    

class WeatherResponse(Schema):
    summary = fields.String(required=True)
    date = fields.String(required=True)
    updated = fields.Integer(required=True)
    weather = fields.Dict(required=True)
    temp = fields.Integer(required=True)
    moon_phase = fields.Float(required=True)
    moonrise = fields.Integer(required=True)
    moonset = fields.Integer(required=True)
    sunrise = fields.Integer(required=True)
    sunset = fields.Integer(required=True)
    visibility = fields.Integer(required=True)
    wind_deg = fields.Integer(required=True)
    wind_speed = fields.Float(required=True)
    rain = fields.Float(allow_null=True)
    total_rain = fields.Float(allow_null=True)
    snow = fields.Float(allow_null=True)
    total_snow = fields.Float(allow_null=True)
    clouds = fields.Integer(required=True)
    uvi = fields.Float(required=True)
    humidity = fields.Integer(required=True)
    hourly = fields.List(fields.Dict(), required=True)
    alerts = fields.List(fields.Dict(), missing=[], allow_null=True)
    night_temp = fields.Integer(allow_null=True)
    day_temp = fields.Integer(allow_null=True)

    @pre_load
    def filter_weather(self, response, **kwargs):
        data = {
            "summary": response["daily"][0]['summary'],
            "date": response["current"]["dt"],
            "updated": response["current"]["dt"],
            "weather": response["current"]["weather"][0],
            "temp": response["current"]["temp"],
            "moon_phase": response["daily"][0]["moon_phase"],
            "moonrise": response["daily"][0]["moonrise"],
            "moonset": response["daily"][0]["moonset"],
            "sunrise": response["daily"][0]["sunrise"],
            "sunset": response["daily"][0]["sunset"],
            "visibility": response["current"]["visibility"],
            "wind_deg": response["current"]["wind_deg"],
            "wind_speed": response["current"]["wind_speed"],
            "rain": response["daily"][0].get("rain", 0),
            "total_rain": response["daily"][0].get("pop", 0),  # "rain" is the last hour, "total_rain" is the last 24 hours
            "snow": response["daily"][0].get("snow", 0),
            "total_snow": response["daily"][0].get("snow", 0),  # "snow" is the last hour, "total_snow" is the last 24 hours
            "clouds": response["current"]["clouds"],
            "uvi": response["current"]["uvi"],
            "humidity": response["current"]["humidity"],
            "hourly": response["hourly"],
            "alerts": response.get("alerts", []),
            "night_temp": response["daily"][0]["temp"]["night"],
            "day_temp": response["daily"][0]["temp"]["day"],
        }
        data['date'] = time.strftime("%a %d, %b", time.gmtime(data["date"]))
        data["hourly"] =[
            {
                "dt": hour["dt"], 
                "weather": hour["weather"][0]["id"],
                "temp": round(hour["temp"]),
                "visibility": hour["visibility"],
                "clouds": hour["clouds"],
            }
            for hour in data["hourly"][1:24]
        ]
        data["temp"] = round(data["temp"])
        
        return data

class Station(Schema):
    name = fields.String(required=True)
    lat = fields.Float(required=True)
    lon = fields.Float(required=True)
    
    @pre_load
    def filter_station(self, data, **kwargs):
        data = {
            "lon": data["lon"],
            "name": data["name"],
            "lat": data["lat"],
        }
        return data
    
class TidesRequest(Schema):
    lat = fields.Float(required=True)
    lon = fields.Float(required=True)
    
    @pre_load
    def filter_location(self, data, **kwargs):
        data = {
            "lat": float(data["lat"]),
            "lon": float(data["lon"]),
        }
        return data
    
class TidesResponse(Schema):
    data = fields.List(fields.Dict(), required=True, error_message="Data is required")
    station = fields.Nested(Station, required=True, error_message="Station is required")
    
    @pre_load
    def filter_tides(self, data, **kwargs):
        data['data'] = [{
            "type": "High" if item["EventType"] == "HighWater" else "Low",
            "date": item["DateTime"] if item.get("DateTime") else item["Date"],
            "height": item["Height"],
        } for item in data["data"]]
        data['station'] = {
            "name": data["station"]["properties"]["Name"],
            "lat": data["station"]["lat"],
            "lon": data["station"]["long"],
        }
    

        
        return data

weather_request = WeatherRequest()
weather_response = WeatherResponse()
tides_request = TidesRequest()
tides_response = TidesResponse()

load_dotenv()

weather = Blueprint('weather', __name__)


@weather.route('/')
def hello_world():
    return 'Helo, World!'


@weather.route('/get-weather', methods=['GET'])
def get_weather():
    try:
        
        location = weather_request.load(request.args)
        lon = location["lon"]
        lat = location["lat"]

        
        url = ("%(url)s/onecall?lat=%(lat)s&lon=%(lon)s&appid=%(key)s&units=metric&exclude=minutely"
               % {"url": os.getenv("WEATHER_URL"), "lat": lat, "lon": lon, "key": os.getenv("WEATHER_API_KEY")})
        response = requests.get(url)
        
        if response.status_code != 200:
            
            return {"error": "Error fetching weather data"}, 500
        data = response.json()
        
        return weather_response.loads(json.dumps(data))
        # with open("./weather_api/exampleResponse.json", 'r') as file:
        #     response = file.read()
        # return json.loads(response)
    except ValidationError as error:
        return {"error": error.messages}, 400


@weather.route('/get-tides', methods=['GET'])
def tides():
    try:
        location = tides_request.load(request.args) 
        tides_data = get_tides(location["lat"], location["lon"])
        return tides_response.load(tides_data)
    
        # with open("./weather_api/exampleTides.json", 'r') as file:
        #         response = file.read()
        # return json.loads(response)
    except ValidationError as error:
        print(error)
        return {"error": error.messages}, 400