from email_validator import validate_email, EmailNotValidError
from marshmallow import ValidationError
def email_validator(email):
    try:
        validate_email(email)
    except EmailNotValidError as e:
        raise ValidationError("Invalid email address")