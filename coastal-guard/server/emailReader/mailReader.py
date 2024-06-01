import re
import base64
import datetime
import sys

sys.path.append('../')
from server import fileHandler
from server.location.location import set_location
from server.web_scraper import scrape_page
from server.database import app as database


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

            self.scrape_webpage(self.data.get("link", None))

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
        try:
            team = re.search(r"Team: (.*?)\\r", body)
            type = re.search(r"Type: (.*?)\\r", body)
            date = re.search(r"When: (.*?UTC)", body)
            location = re.search(r"Loc: (.*?)\\r", body)
            rv = re.search(r"RV: (.*?)\\r", body)
            if rv is not None:
                grid_ref = re.search(r"(TM.*)", rv.group(1))
            else:
                grid_ref = None
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

            message["grid_ref"] = grid_ref.group(1) if grid_ref else "None"

            message["zone"] = zone.group(1) if zone else "None"

            message["casualty"] = casualty.group(1) if casualty else "None"

            message["sent"] = sent.group(1) if sent else "None"

            return message

        except AttributeError:
            print("Error in reading body")
            return

    def update_location(self):
        grid_ref = self.data["grid_ref"]

        if self.exists:
            old_data = fileHandler.read_file(self.gin, './incidents/', '.json')
            if grid_ref == "None":
                return
            if old_data["grid_ref"] != grid_ref:
                print("Updating location")
                location = set_location(grid_ref)
                for key in location:
                    self.data[key] = location[key]
        else:
            location = set_location(grid_ref)

            for key in location:
                self.data[key] = location[key]

    def check_link_summary(self, link):
        summary = re.sub(r"incident-responder\?", "incident-responder-summary?", link)
        return summary

    def scrape_webpage(self, link):
        if link is None or link == "None":
            return

        page = scrape_page.ScrapePage(link)
        data = page.read_tables()
        self.data["team"] = self.get_teams(data)
        self.data["responders"] = self.get_responders(data)

    def get_teams(self, data):
        teams = []

        for table in data:
            if table["title"] == "Team/s Attending":
                for row in table["rows"]:
                    call_sign = row.get("Call Sign", "None")
                    if call_sign != "None" and call_sign != "-":
                        teams.append(call_sign)
        return teams

    def get_responders(self, data):
        for table in data:
            if table["title"] == "Volunteers Attending":
                return table["rows"]
        return