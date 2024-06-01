from flask import abort, Flask, request
from flask_cors import CORS
import json
import re

from pathlib import Path
from threading import Thread
import subprocess
import fileHandler
from weather_api.weather_routes import weather
from location.location_routes import locations
from account.account_routes import account
from weather_api import tides

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
app.register_blueprint(weather, url_prefix='/weather')
app.register_blueprint(locations, url_prefix='/location')
app.register_blueprint(account, url_prefix='/account')


def email_reader():
    subprocess.run(["python", "./emailReader/emailReader.py"])


# emailReader()

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.get('/get-cases')
def get_cases():
    cases = []
    files = fileHandler.get_files_in_dir("./incidents")
    for file in files:
        cases.append(fileHandler.read_file(file.strip(".json"), "./incidents/", ".json"))

    return cases


@app.get('/get-case/<case_id>')
def get_case(case_id):
    return fileHandler.read_file('./incidents/' + case_id + '.json')


@app.get('/get-cameras')
def get_cameras():
    cameras = []
    camera_list = fileHandler.read_file('camera', './webcams/', '.json')
    if not camera_list:
        return abort(404, 'No cameras found')
    for camera in camera_list['cameras']:
        cameras.append(camera.get('name'))

    return cameras


if __name__ == "__main__":
    t = Thread(target=email_reader)
    t.start()
    app.run(host="0.0.0.0", port=8000, debug=True)
