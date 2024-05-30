import os
import arrow
import requests
import json
from dotenv import load_dotenv

def get_tides(lat, lon, date = arrow.now()):
    # Get the current date
    # url = "https://api.stormglass.io/v2/tide/extremes/point"
    # date = arrow.get(date).floor('day')
    # end = date.shift(days=1)
    # # Get the tide data for the current date
    # response = requests.get(url,
    #   params = {
    #     'lat': lat,
    #     'lng': lon,
    #     'start': start.to('UTC').timestamp(),
    #     'end': end.to('UTC').timestamp(),
    #   },
    #   headers = {
    #     'Authorization':"450f5246-1e72-11ef-95ed-0242ac130004-450f52be-1e72-11ef-95ed-0242ac130004"
    #   },
    #   timeout=10  # Add a timeout value in seconds
    # )
    # print(response)

    # return response.json()
    with open("./weather_api/exampleTides.json", 'r') as file:
            response = file.read()
    return json.loads(response)

# print(get_tides(37.7749, -122.4194))  # San Francisco, CA