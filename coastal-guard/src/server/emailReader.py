import time
import email
import imaplib
import base64
import os
import re

# account credentials
username = "puffdragon115@gmail.com"
password = "Bulstrode52"
port = 993
imap_server = "imap.gmail.com"
N = 5
print("Starting email reader")

while 1:
    mail = imaplib.IMAP4_SSL(imap_server)
    mail.login(username, password)
    mail.select('inbox')
    result, data = mail.uid('search', None, "ALL") # (ALL/UNSEEN)
    uids = [int(s) for s in data[0].split()]

    for uid in uids:
        if uid > uid_max:
            result, data = mail.uid('fetch', str(uid), '(RFC822)')
            for response_part in data:
                if isinstance(response_part, tuple):
                    print(email.message_from_bytes(response_part[1])) #processing the email here for whatever
            uid_max = uid
    mail.logout()
    time.sleep(1)