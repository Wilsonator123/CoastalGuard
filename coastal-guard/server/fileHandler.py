import json
import os
from pathlib import Path


# File for handling file operations

# Create a file

# Read a file

# Write to a file

# Delete a file


def create_file(filename):
    Path(filename).touch()
    if check_file_exists(filename):
        return True
    else:
        return False


def read_file(filename: str, path="./"):
    try:
        with open(path+filename, "r") as file:
            if filename.endswith(".json"):
                return json.load(file)
            else:
                return file.read()
    except FileNotFoundError:
        return False


def write_to_file(name, data, route="./", extension=""):
    try:
        file_name = route + name + extension
        if not check_file_exists(file_name):
            create_file(file_name)

        if extension == ".json":
            with open(file_name, "r") as file:
                old_data = json.load(file)
            for key in data:
                if data[key] != "None":
                    old_data[key] = data[key]
            with open(filename, "w") as file:
                json.dump(old_data, file, indent=4)
            return True
        else:
            with open(filename, "w") as file:
                file.write(data)
            return True
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


def check_file_exists(filename: str):
    return os.path.exists(filename)
