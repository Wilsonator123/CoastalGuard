from flask import Blueprint
import requests
import os
from dotenv import load_dotenv

load_dotenv()

weather = Blueprint('weather', __name__)


@weather.route('/')
def hello_world():
    return 'Hello, World!'

@weather.route('/get-weather', methods=['GET'])
def get_weather():
    lat = 52.6
    lon = 1.2
    print('Getting weather')
    url = ("%(url)s/onecall?lat=%(lat)s&lon=%(lon)s&appid=%(key)s"
           % {"url": os.getenv("WEATHER_URL"), "lat": lat, "lon": lon, "key": os.getenv("WEATHER_API_KEY")})
    response = requests.get(url)
    return response.json()

