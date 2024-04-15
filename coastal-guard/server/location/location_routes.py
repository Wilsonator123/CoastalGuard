from flask import Blueprint
import requests
from flask import request
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
        target = (request.args.get('lat'), request.args.get('long'))
        data = fileHandler.read_file('camera', './webcams/', '.json')
        camera_list = data['cameras']
        cameras = sort_by_distance(camera_list, target)
        return json.dumps(cameras)
    except Exception as e:
        return str(e)
