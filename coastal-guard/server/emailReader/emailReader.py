import os.path
import json
import time
import datetime
from googleapiclient.errors import HttpError
import base64
import re
from auth import authenticate
import sys
sys.path.append('../')
from server import fileHandler

def main():
    try:
        service = authenticate()

        response = service.users().messages().list(
            userId="me",
            labelIds=["INBOX", "UNREAD"]
        ).execute()

        if "messages" not in response.keys():
            return

        messages = response["messages"]

        for message in messages:
            print('Reading Message')
            message = service.users().messages().get(
                userId="me",
                id=message["id"]
            ).execute()

            if not read_message(message):
                # We need to label the message
                service.users().messages().modify(
                    userId="me",
                    id=message["id"],
                    body={"addLabelIds": ["TRASH"]}
                ).execute()
            # else:
                # service.users().messages().modify(userId="me", id=message["id"], body={"removeLabelIds": ["UNREAD"]})
            # .execute()

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
            body = message['payload']['parts'][0]['body']['data']  # This is the email body in base64
            body = base64.urlsafe_b64decode(body.encode('UTF8'))  # Decoding the base64 email body

            data = {"gin": GIN, "status": "open"}
            data.update(read_body(str(body)))
            filename = data["gin"].replace(" ", "")
            fileHandler.write_to_file(filename, data, '../incidents/', '.json')
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
            gin = str(datetime.date.today().year) + "" + gin.group(1)
        else:
            gin = gin.group(1).replace(" ", "")
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
        link = re.search(r"<(https.*)>", body)

        message["link"] = check_link_summary(link.group(1)) if link else "None"

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

def check_link_summary(link: str):
    summary = re.sub(r"incident-responder\?", "incident-responder-summary?", link)
    return summary

# def write_to_file(filename: str, data: dict):
#     filename = "./incidents/" + filename + ".json"
#     if check_file_exists(filename):
#         with open(filename) as file:
#             old_data = json.load(file)
#
#         for key in data:
#             if data[key] != "None":
#                 old_data[key] = data[key]
#
#         with open(filename, "w") as file:
#             json.dump(old_data, file, indent=4)
#             # file.write(old_data
#     else:
#         with open(filename, "w+") as file:
#             # data['updates'] = []
#             data = json.dumps(data, indent=4)
#             file.write(data)

if __name__ == "__main__":
    main()
