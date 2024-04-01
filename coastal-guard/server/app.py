from flask import abort, Flask, request
import json
import re

from pathlib import Path
from threading import Thread
import subprocess
import fileHandler
from weather_api.weather_routes import weather

app = Flask(__name__)

app.register_blueprint(weather, url_prefix='/weather')

def emailReader():
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
        cases.append(fileHandler.read_file(file, "./incidents/"))

    return cases


@app.get('/get-case/<case_id>')
def get_case(case_id):
    return fileHandler.read_file('./incidents/' + case_id + '.json')


if __name__ == "__main__":
    t = Thread(target=emailReader)
    t.start()
    app.run(host="0.0.0.0", port=8000, debug=True)
