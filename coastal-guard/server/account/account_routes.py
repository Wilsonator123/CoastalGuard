from flask import Blueprint
from flask import request
from marshmallow import (
    Schema,
    ValidationError,
    fields,
    validate,
)
from account.login import login as login_function
from account.account_creation import create_account
import sys
sys.path.append('..')
from server.helper.email import email_validator
from flask import make_response


account = Blueprint('account', __name__)

# Schemas
class LoginRequest(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)

class RegisterRequest(Schema):
    email = fields.String(required=True, validate=email_validator)
    password = fields.String(required=True, validate=validate.Length(min=8, max=64, error="Password must be between 8 and 64 characters"))
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)

login_request = LoginRequest()
register_request = RegisterRequest()

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

            return {"message": "Login successful"}, 200
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


