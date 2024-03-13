import os


class FileWriter:
    def does_file_exist(self, filename: str):
        return os.path.exists(filename)
