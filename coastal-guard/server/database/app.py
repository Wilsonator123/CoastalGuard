from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
class Database:
    client = None
    uri = 'mongodb+srv://dbUser:Bulstrode_52@coastguard.psdmwo8.mongodb.net/?retryWrites=true&w=majority&appName=CoastGuard',

    def __init__(self):
        client = MongoClient(self.uri, server_api=ServerApi('1'))
        self.client = client['CoastGuard']

    def read_file(self, args, collection):
        return self.client[collection].find_one(args)

    def create_file(self, data, collection):
        return self.client[collection].insert_one(data)

    def write_to_file(self, args, data, collection):
        return self.client[collection].update_one(args, {'$set': data}, upsert=True)

    def delete_file(self, args, collection):
        return self.client[collection].delete_one(args)

    def get_files(self, collection, query={}):
        return self.client[collection].find(query)
