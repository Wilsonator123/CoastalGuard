import os
import sys
import arrow
import requests
import json
from dotenv import load_dotenv
load_dotenv()
sys.path.append('../')
from server.location.location import sort_by_distance

def get_closest_tide_station(lat, lon):
    with open("./weather_api/station_list.json", 'r') as file:
        data = json.load(file)
      
    closest_station = sort_by_distance(data, (lat, lon))
    return closest_station

def get_tides(lat, lon):
    # Get the current date
    try:
        station = get_closest_tide_station(lat, lon)
        station_id = station[0]['properties']['Id']
        url = os.getenv("TIDES_URL") + f"/{station_id}/TidalEvents?duration=2"
        # Get the tide data for the current date
        response = requests.get(url,
        headers = {
            'Ocp-Apim-Subscription-Key': os.getenv("TIDE_API_KEY")
        },
        timeout=10  # Add a timeout value in seconds
        )
        
        response = response.json()
        
        return {'data': response, 'station': station[0]}
    except Exception as e:
        print(e)
        return {"error": "Error fetching tide data"}
    


def get_station_list():
    url = "https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations"
    response = requests.get(url,
    headers = {
        'Ocp-Apim-Subscription-Key': "231c3cc55d63422b8ad166f61d0c3f71"
    },
    timeout=10  # Add a timeout value in seconds
    )
    print(response.json())
    return response.json()
