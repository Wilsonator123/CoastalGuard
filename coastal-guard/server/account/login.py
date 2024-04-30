import sys
sys.path.append('..')
from server.database.app import Database
from server.helper import auth

db = Database()
def login(email, password):
    try:
        user = db.read_file({"email": email}, 'users')
        if user is None:
            return "Invalid username or password", 401
        if not auth.check_password(password, user['password']):
            return "Invalid username or password", 401

        return user['_id'], 200
    except Exception as e:
        return str(e), 500