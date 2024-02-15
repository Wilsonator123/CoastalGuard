import os.path
import json
import time
import datetime

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
import re

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]


def main():
    """Shows basic usage of the Gmail API.
  Lists the user's Gmail labels.
  """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        # Call the Gmail API
        service = build("gmail", "v1", credentials=creds)

        response = service.users().messages().list(userId="me", labelIds=["INBOX", "UNREAD"]).execute()
        if "messages" not in response.keys():
            print("No new messages!")
            return
        messages = response["messages"]
        x = 0
        for message in messages:
            message = service.users().messages().get(userId="me", id=message["id"]).execute()
            if not read_message(message):
                # We need to label the message
                service.users().messages().modify(userId="me", id=message["id"],
                                                  body={"addLabelIds": ["TRASH"]}).execute()
                print("Message deleted!")
            else:
                # service.users().messages().modify(userId="me", id=message["id"], body={"removeLabelIds": ["UNREAD"]}).execute()
                print("Message read!")

        time.sleep(5)
    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f"An error occurred: {error}")


def read_message(message):
    try:
        subject = message["payload"]["headers"][19]["value"]
        GIN = find_gin(subject)
        if GIN is None:
            return False
        print("GIN: ", GIN)
        body = message['payload']['parts'][0]['body']['data']  # This is the email body in base64
        body = base64.urlsafe_b64decode(body.encode('UTF8'))  # Decoding the base64 email body

        data = {"gin": GIN}
        data.update(read_body(str(body)))
        filename = data["gin"].replace(" ", "")
        write_to_file(filename, data)
        return True

    except KeyError:
        return False


def find_gin(subject):
    gin = re.search(r"\[\[(.*)\]\]", subject)
    if gin is None:
        gin = re.search(r"202[0-9] (\d*)", subject)
    if gin is None:
        return False

    else:
        temp = gin.group(1).split(" ")

        if temp[0] != str(datetime.date.today().year):
            gin = str(datetime.date.today().year) + " " + gin.group(1)
        else:
            gin = gin.group(1)
    return gin


def read_body(body):
    message = {}
    # The issue is if it fails to find one property, it will fail to find the rest
    try:
        team = re.search(r"Team: (.*?)\\r", body)
        type = re.search(r"Type: (.*?)\\r", body)
        date = re.search(r"When: (.*?UTC)", body)
        location = re.search(r"Loc: (.*?)\\r", body)
        rv = re.search(r"RV: (.*?)\\r", body)
        zone = re.search(r"Zone: (\d*?)\\r", body)
        casualty = re.search(r"Who is the Casualty: (.*?)\\r", body)
        sent = re.search(r"Sent: (.*?UTC)", body)

        message["team"] = team.group(1) if team else "None"

        message["type"] = type.group(1) if type else "None"

        message["date"] = date.group(1) if date else "None"

        message["location"] = location.group(1) if location else "None"

        message["rv"] = rv.group(1) if rv else "None"

        message["zone"] = zone.group(1) if zone else "None"

        message["casualty"] = casualty.group(1) if casualty else "None"

        message["sent"] = sent.group(1) if sent else "None"

        return message

    except AttributeError:
        return


def write_to_file(filename: str, data: dict):
    filename = "./incidents/" + filename + ".json"
    if check_file_exists(filename):
        print("File exists!")
        with open(filename) as file:
            old_data = json.load(file)

        for key in data:
            if data[key] != "None":
                old_data[key] = data[key]

        with open(filename, "w") as file:
            json.dump(old_data, file, indent=4)
            # file.write(old_data
    else:
        print("File does not exist!")
        with open(filename + ".json", "w") as file:
            # data['updates'] = []
            data = json.dumps(data, indent=4)
            file.write(data)


def check_file_exists(filename: str):
    return os.path.exists(filename)


if __name__ == "__main__":
    main()
