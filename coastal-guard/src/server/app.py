import json
import re

from flask import abort
from pathlib import Path
from flask import Flask
from flask import request
import subprocess
app = Flask(__name__)

def emailReader():
    subprocess.run(["Python", "emailReader.py"])

print("Starting email reader")
emailReader()

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test')
def test():
    return 'Test'

@app.get('/get-cases')
def get_cases():
    cases = []
    p = Path("./incidents")
    for x in p.iterdir():
        if x.is_file() and str(x).endswith(".json"):
            with open(x, "r") as file:
                cases.append(json.load(file))

    return cases

@app.get('/get-case/<case_id>')
def get_case(case_id):
    try:
        with open(f"./incidents/{case_id}.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        abort(404)