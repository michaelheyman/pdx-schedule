from bs4 import BeautifulSoup
import requests
import re
import logging

from model import DBSession
from model import Base
from model import engine
from model import Instructor
from model import Course

from sqlalchemy import exists

logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')
LOG = logging.getLogger(__name__)

class ScheduleScraper:
    TITLE_CLASS = "ddtitle"
    DEFAULT_CLASS = "dddefault"
    soup = ""

    @staticmethod
    def run():
        with open("index.html") as fp:
            ScheduleScraper.soup = BeautifulSoup(fp, "html.parser")

        for elem in ScheduleScraper.soup.find_all("th", ScheduleScraper.TITLE_CLASS):
            name, crn, number = ScheduleScraper.get_course_info(elem.string)
            instructor = ScheduleScraper.get_instructor(elem)

            course = Course(name=name, crn=crn, number=number)
            DBSession.add(course)

            if instructor is None:
                continue

            instructor_record = DBSession.query(Instructor).\
                    filter(Instructor.name == instructor).first()

            if instructor_record is None:
                inst = Instructor(name=instructor, rating=5.0, url="www.google.com")
                DBSession.add(inst)
                LOG.debug(f"{instructor} new")
            else:
                LOG.debug(f"{instructor} was already in db!")

        DBSession.commit()

    @staticmethod
    def get_instructor(header):
        course_table = header.parent.next_sibling.next_sibling
        if not course_table:
            return None

        cells = course_table.find_all("td", ScheduleScraper.DEFAULT_CLASS)
        if not cells:
            return None

        last_cell = cells[-1]
        instructor_name = last_cell.get_text()[0:-3].strip()
        if not instructor_name:
            return None

        return instructor_name

    @staticmethod
    def get_course_info(full_title):
        name = re.search("(?<=^)(.*?)(?=\ -)", full_title)
        matches = re.findall("(?<=\- )(.*?)(?=\ -)", full_title)

        if not name or not matches:
            return None
        if len(name.groups()) is not 1:
            return None
        if len(matches) is not 2:
            return None

        crn = matches[0]
        number = matches[1]

        return name.group(1), crn, number


class RateMyProfessorsParser:
    url = "http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&q={0}+AND+schoolid_s%3A775&qf=teacherfirstname_t+teacherlastname_t+teacherfullname_t&siteName=rmp&fl=pk_id+teacherfirstname_t+teacherlastname_t+averageratingscore_rf&fq="

    @staticmethod
    def get_instructor_json(self, instructor_name):
        url = RateMyProfessorsParser.url.format(instructor_name.replace(" ", "+"))
        response = requests.get(url)
        print(f"{instructor_name} {response}")
        return response.json()

    @staticmethod
    def get_instructor_rating(self, instructor_name):
        json = RateMyProfessorsParser.get_instructor_json(instructor_name)
        try:
            name, rating = RateMyProfessorsParser.parse_instructor_json(json)
        except ValueError:
            print(f"No data found for {instructor_name}")
            return (None, None)

        return name, rating

    @staticmethod
    def parse_instructor_json(self, data):
        if data["response"]["numFound"] is not 1:
            # return (None, None)
            raise ValueError("RateMyProfessors could not find professor.")

        rating = data["response"]["docs"][0]["averageratingscore_rf"]
        first_name = data["response"]["docs"][0]["teacherfirstname_t"]
        last_name = data["response"]["docs"][0]["teacherlastname_t"]
        name = f"{first_name} {last_name}"

        return name, rating


def main():
    Base.metadata.create_all(engine)
    scraper = ScheduleScraper.run()


if __name__ == "__main__":
    main()
