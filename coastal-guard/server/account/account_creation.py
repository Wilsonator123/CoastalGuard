import sys
sys.path.append('..')
from server.database.app import Database
from server.helper import auth

db = Database()

def create_account(email, password, first_name, last_name):
    try:
        if db.read_file({'email': email}, 'users'):
            return {"error": "Email already in use"}, 400

        result = db.create_file({
            'email': email,
            'password': auth.hash_password(password),
            'first_name': first_name,
            'last_name': last_name
        }, 'users')


        return str(result.inserted_id), 200
    except Exception as e:
        print(e)
        return {"error": "Server Error"}, 500