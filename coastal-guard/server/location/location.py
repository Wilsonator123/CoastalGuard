import os
import sys
from geopy.geocoders import Nominatim, What3WordsV3
from geopy import distance
from OSGridConverter import grid2latlong


def set_location(grid_ref):
    location = {}
    try:
        coords = get_coords_from_grid_ref(grid_ref)
        if coords:
            location['lat'] = coords[0]
            location['lon'] = coords[1]

        address = get_location_from_coords(location['lat'], location['lon'])
        if address:
            location['address'] = address

        w3w = get_w3w_from_coords(location['lat'], location['lon'])
        if w3w:
            location['w3w'] = w3w
        return location
    except Exception as e:
        return {}


def get_coords_from_grid_ref(grid_ref):
    try:
        l = grid2latlong(grid_ref)
        return l.latitude, l.longitude
    except Exception as e:
        return None


def get_location_from_coords(lat, lon):
    try:
        geolocator = Nominatim(user_agent="coastal-guard")
        location = geolocator.reverse(f"{lat}, {lon}")
        return location.raw['address']
    except Exception as e:
        return None


def get_w3w_from_coords(lat, lon):
    w3w = What3WordsV3(api_key="HQYDBHWG")
    return w3w.reverse(f"{lat}, {lon}").raw['words']


def compare_distance(loc, target):
    try:
        loc = (loc['lat'], loc['long'])
        return distance.distance(loc, target).miles
    except:
        pass


def sort_by_distance(locations, target):
    return sorted(locations, key=lambda x: compare_distance(x, target))
