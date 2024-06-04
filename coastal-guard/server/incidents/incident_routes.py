from flask import Blueprint
from flask import request
from marshmallow import (
    Schema,
    ValidationError,
    fields,
    validate,
    pre_load,
)
import json
from bson import ObjectId
import sys
sys.path.append('..')
from server.database.app import Database

db = Database()
case = Blueprint('case', __name__)

class Case(Schema):
    gin = fields.String(required=True)
    link = fields.String(required=True)
    team = fields.List(fields.String, required=True)
    date = fields.String(required=True)
    location = fields.String(required=True)
    rv = fields.String(required=True)
    grid_ref = fields.String(required=True)
    zone = fields.String(required=True)
    casualty = fields.String(required=True)
    sent = fields.String(required=True)
    lat = fields.Float(required=True)
    lon = fields.Float(required=True)
    address = fields.Dict(required=True)
    w3w = fields.String(required=True)
    resonders = fields.List(fields.Dict, required=True)
    created_at = fields.String(required=True)
    
    @pre_load
    def case_request(self, data, **kwargs):
      print(data)
      data['_id'] = str(data['_id'])
      return data
        
class CaseResponse(Schema):
    data = fields.Nested(Case, required=True)

case_response = CaseResponse()
    
@case.get('/get-cases')
def get_cases():
    cases = db.get_files('incidents')
    for case in cases:
        case['_id'] = str(case['_id'])
    
    arr_str = [json.dumps(d) for d in cases]

    arr_str_no_duplicates = list(dict.fromkeys(arr_str))
    
    arr_no_duplicates = [json.loads(s) for s in arr_str_no_duplicates]
    
    return arr_no_duplicates


@case.get('/get-case/<case_id>')
def get_case(case_id):
    case = db.read_file({"gin": case_id}, 'incidents')
    case['_id'] = str(case['_id'])
    return case