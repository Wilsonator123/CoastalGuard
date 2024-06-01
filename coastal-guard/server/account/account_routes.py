from flask import Blueprint
from flask import request
from marshmallow import (
    Schema,
    ValidationError,
    fields,
    validate,
)
from bson import ObjectId

from account.login import login as login_function
from account.account_creation import create_account
import sys
sys.path.append('..')
from server.helper.email import email_validator
from flask import make_response
from server.database.app import Database


account = Blueprint('account', __name__)

# Schemas
class LoginRequest(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)

class RegisterRequest(Schema):
    email = fields.String(required=True, validate=email_validator)
    password = fields.String(required=True, validate=validate.Length(min=8, max=64, error="Password must be between 8 and 64 characters"))
    cpassword = fields.String(required=False)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)

login_request = LoginRequest()
register_request = RegisterRequest()

db = Database()
# Routes
@account.route('/', methods=['GET'])
def function():
    return 'Login page'

@account.route('/login', methods=['POST'])
def login():
    try:
        data = login_request.load(request.get_json())

        result, status = login_function(data['email'], data['password'])
        if status == 200:
            resp = make_response({"message": "Login successful"}, 200)
            resp.set_cookie('userID', str(result), httponly=True, samesite='Strict', max_age=60*60*24*90)
            return resp

        else:
            return {"error": "Invalid username or password"}, 401

    except ValidationError as e:
        print(e)
        return {"error": list(e.messages.values())[0]}, 401


@account.route('/createAccount', methods=['POST'])
def register():
    try:
        data = register_request.load(request.get_json())

        result, status = create_account(data['email'], data['password'], data['first_name'], data['last_name'])
        if status == 200:
            resp = make_response({"message": "Account Created"}, 200)
            resp.set_cookie('userID', str(result), httponly=True, samesite='Strict', max_age=60*60*24*90)
            return resp
        else:
            return {"error": result['error']}, 401

    except ValidationError as e:
        return {"error": list(e.messages.values())[0]}, 401


@account.route('/getAccount', methods=['GET'])
def get_account():
    user_id = request.cookies.get('userID')
    if user_id is None:
        return {"error": "Not logged in"}, 401
    else:
        user_id = ObjectId(user_id)
        result = db.read_file({'_id': user_id}, 'users')
        if result is None:
            return {"error": "User not found"}, 404

        result['_id'] = str(result['_id'])
        del result['password']
        return result, 200