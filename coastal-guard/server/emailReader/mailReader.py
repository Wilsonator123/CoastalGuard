import re
import base64
import datetime
import sys
sys.path.append('../')
from server.database import app as database
from location import set_location

class EmailReader:
    data = {}
    gin = None
    filename = None
    exists = False
    db = database.Database()
    file = {}

    def __init__(self):
        pass

    def read_mail(self, message):
        try:
            subject = message["payload"]["headers"][19]["value"]
            self.find_gin(subject)
            if self.gin is None:
                return False

            self.file = self.db.read_file({"gin": self.gin}, 'incidents')

            if self.file is not None:
                self.exists = True

            body = message['payload']['parts'][0]['body']['data']  # This is the email body in base64
            body = base64.urlsafe_b64decode(body.encode('UTF8'))  # Decoding the base64 email body

            self.data = {"gin": self.gin}

            body = self.read_body(str(body))
            if body is not None:
                self.data.update(body)

            self.update_location()

            if self.exists:
                self.data["last_updated"] = str(datetime.datetime.now())
                for key, value in list(self.data.items()):
                    if value == "None":
                        del self.data[key]
                self.db.write_to_file({"gin": self.gin}, self.data, 'incidents')
            else:
                self.data["created_at"] = str(datetime.datetime.now())
                print(self.db.create_file(self.data, 'incidents'))
            return True
        except KeyError:
            return False


    def find_gin(self, subject):
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
        self.gin = gin


    def read_body(self, body):
        message = {}
        # The issue is if it fails to find one property, it will fail to find the rest
        try:
            team = re.search(r"Team: (.*?)\\r", body)
            type = re.search(r"Type: (.*?)\\r", body)
            date = re.search(r"When: (.*?UTC)", body)
            location = re.search(r"Loc: (.*?)\\r", body)
            rv = re.search(r"RV: (.*?)\\r", body)
            if rv is not None:
                gridRef = re.search(r"(TM.*)", rv.group(1))
            else:
                gridRef = None
            zone = re.search(r"Zone: (\d*?)\\r", body)
            casualty = re.search(r"Who is the Casualty: (.*?)\\r", body)
            sent = re.search(r"Sent: (.*?UTC)", body)
            link = re.search(r"<(https.*?)>", body)

            message["link"] = self.check_link_summary(link.group(1)) if link else "None"

            message["team"] = team.group(1) if team else "None"

            message["type"] = type.group(1) if type else "None"

            message["date"] = date.group(1) if date else "None"

            message["location"] = location.group(1) if location else "None"

            message["rv"] = rv.group(1) if rv else "None"

            message["gridRef"] = gridRef.group(1) if gridRef else "None"

            message["zone"] = zone.group(1) if zone else "None"

            message["casualty"] = casualty.group(1) if casualty else "None"

            message["sent"] = sent.group(1) if sent else "None"

            return message

        except AttributeError:
            print("Error in reading body")
            return

    def update_location(self):
        gridRef = self.data["gridRef"]

        if self.exists:
            old_data = self.file
            if gridRef == "None":
                return

            if old_data["gridRef"] != gridRef:
                print("Updating location")
                location = set_location(gridRef)
                for key in location:
                    self.data[key] = location[key]
        else:
            print("Updating location")
            location = set_location(gridRef)

            for key in location:
                self.data[key] = location[key]


    def check_link_summary(self, link):
        summary = re.sub(r"incident-responder\?", "incident-responder-summary?", link)
        return summary
