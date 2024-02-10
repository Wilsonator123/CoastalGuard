from flask import Flask
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