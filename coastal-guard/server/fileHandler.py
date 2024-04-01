import json
import os
from pathlib import Path

def create_file(filename):
    Path(filename).touch()
    if check_file_exists(filename):
        return True
    else:
        return False


def read_file(filename: str, path="./", extension=""):
    try:
        with open(path+filename+extension, "r") as file:
            if extension == ".json":
                return json.load(file)
            else:
                return file.read()
    except FileNotFoundError:
        return False


def write_to_file(name, data, route="./", extension=""):
    old_data = {}
    try:
        filename = route + name + extension
        if check_file_exists(filename):
            with open(filename) as file:
                old_data = json.load(file)

            for key in data:
                if data[key] != "None":
                    old_data[key] = data[key]

            with open(filename, "w") as file:
                json.dump(old_data, file, indent=4)
                # file.write(old_data
        else:
            with open(filename, "w+") as file:
                # data['updates'] = []
                data = json.dumps(data, indent=4)
                file.write(data)
    except FileNotFoundError:
        return False


def delete_file(filename: str):
    try:
        os.remove(filename)
        return True
    except FileNotFoundError:
        return False


def get_files_in_dir(dir):
    files = []
    dir = Path(dir)
    for x in dir.iterdir():
        if x.is_file():
            files.append(x.name)

    return files


def check_file_exists(filename, path="./", extension=""):
    return os.path.exists(path+filename+extension)
