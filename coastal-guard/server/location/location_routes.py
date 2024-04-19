from flask import Blueprint
import requests
from flask import request, abort
import os
import json
import sys
from location.location import sort_by_distance

sys.path.append('../')
from server import fileHandler

locations = Blueprint('locations', __name__)


@locations.route('/')
def hello_world():
    return 'Locations'


@locations.route('/get-cameras', methods=['GET'])
def get_cameras():
    try:
        target = (request.args.get('lat', None), request.args.get('lon', None))
        if target[0] is None or target[1] is None:
            return abort(400, 'No target location provided')
        data = fileHandler.read_file('camera', './webcams/', '.json')
        camera_list = data['cameras']
        cameras = sort_by_distance(camera_list, target)
        return cameras
    except Exception as e:
        return abort(500, 'Error getting cameras')

