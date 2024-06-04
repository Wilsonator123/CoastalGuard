from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
class Database:
    client = None
    uri = os.getenv('MONGO_URI')

    def __init__(self):
        client = MongoClient(self.uri)
        self.client = client['CoastGuard']
        self.client

    def read_file(self, args, collection):
        return self.client[collection].find_one(args)

    def create_file(self, data, collection):
        return self.client[collection].insert_one(data)

    def write_to_file(self, args, data, collection):
        return self.client[collection].update_one(args, {'$set': data}, upsert=True)

    def delete_file(self, args, collection):
        return self.client[collection].delete_one(args)

    def get_files(self, collection, query={}):
        return list(self.client[collection].find(query))