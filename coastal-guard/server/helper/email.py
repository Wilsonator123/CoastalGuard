from email_validator import validate_email, EmailNotValidError

def email_validator(email):
    try:
        validate_email(email)
    except EmailNotValidError as e:
        raise ValidationError("Invalid email address")