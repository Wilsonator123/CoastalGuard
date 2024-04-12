from selenium import webdriver
from bs4 import BeautifulSoup
import time
import re
import json
import os
import logging

os.environ['WDM_LOG'] = str(logging.NOTSET)


class ScrapePage:
    driver = None
    url = None
    source = None

    def __init__(self, url):
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        options.add_argument("--log-level=3")
        self.driver = webdriver.Chrome(options=options)
        self.url = url
        self.get_page_source()

    # Load the webpage
    def get_page_source(self):
        self.driver.get(self.url)

        time.sleep(3)

        page_source = self.driver.page_source

        self.driver.quit()

        self.source = BeautifulSoup(page_source, 'html.parser')

    # Now, page_source contains the fully rendered HTML of the webpage
    def read_tables(self):
        table = self.source.findAll('table')

        tables = []

        for x in table:
            table = x.find_parent()
            data = {}
            title = table.find_parent().find('h3')
            if title:
                data['title'] = title.text
            else:
                break

            headers = []

            header = x.find('thead').find('tr')
            if header:
                header = header.find_all('th')
                for th in header:
                    temp = th.find(class_='heading_label').text
                    headers.append(re.match('(.*?)\t', temp).group(1))
            else:
                headers = []

            data['headers'] = headers

            data['rows'] = []

            rows = x.findAll('tr')

            for row in rows:
                values = []
                if row['data-class_name'] == 'block_headings':
                    value = row.find('td').text
                    values.append(value)
                else:
                    cells = row.find_all('td')
                    for cell in cells:
                        value = cell.find_all('span')
                        value = value[len(value) - 1] if value else None

                        if value is None:
                            value = cell.find(attrs={'aria-hidden': 'true'})
                        if value is not None:
                            values.append(value.text)
                if values:
                    data['rows'].append(values)

            tables.append(data)

        for table in range(len(tables)):
            for row in tables[table].get('rows'):
                temp = {}
                keys = tables[table].get('headers')
                for i in range(len(row)):
                    temp[keys[i]] = row[i]
                tables[table]['rows'][tables[table].get('rows').index(row)] = temp
            del tables[table]['headers']

        return tables