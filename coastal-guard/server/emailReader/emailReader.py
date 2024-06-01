import os.path
import json
import time
import datetime
from googleapiclient.errors import HttpError
import base64
import re
from auth import authenticate
from mailReader import EmailReader

def main():
    try:
        service = authenticate()

        messages = check_inbox(service)

        for message in messages:
            message = get_message(service, message["id"])
            EmailReader().read_mail(message)
            mark_as_read(service, message["id"])

    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f"An error occurred: {error}")

def check_inbox(service):
    response = service.users().messages().list(
        userId="me",
        labelIds=["INBOX", "UNREAD"]
    ).execute()

    if "messages" not in response.keys():
        return []

    return response["messages"]

def get_message(service, msg_id):
    return service.users().messages().get(userId="me", id=msg_id).execute()

def mark_as_read(service, msg_id):
    service.users().messages().modify(
        userId="me",
        id=msg_id,
        body={
            "removeLabelIds": ["UNREAD"]
        }
    ).execute()

if __name__ == "__main__":
    main()
