from bs4 import BeautifulSoup
import requests
import re
import logging

from model import DBSession
from model import Base
from model import engine
from model import Instructor
from model import Course

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")
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
            name, crn, number = ScheduleScraper.get_course(elem)
            instructor = ScheduleScraper.get_instructor(elem)

            course = Course(name=name, crn=crn, number=number)
            DBSession.add(course)

            if instructor is None:
                continue

            instructor_record = (
                DBSession.query(Instructor)
                .filter(Instructor.name == instructor)
                .first()
            )

            if instructor_record is None:
                try:
                    first_name, last_name, rating, rmp_id = RateMyProfessorsParser.get_instructor(
                        instructor
                    )
                except ValueError:
                    inst = Instructor(name=instructor)
                else:
                    inst = Instructor(
                        name=instructor,
                        rating=rating,
                        url=f"http://www.ratemyprofessors.com/ShowRatings.jsp?tid={rmp_id}",
                    )
                    LOG.debug(f"{instructor} new")
                finally:
                    DBSession.add(inst)
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
    def get_course(header):
        title = header.string
        name = re.search(r"(?<=^)(.*?)(?=\ -)", title)
        matches = re.findall(r"(?<=\- )(.*?)(?=\ -)", title)

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
    def get_instructor_json(instructor_name):
        url = RateMyProfessorsParser.url.format(instructor_name.replace(" ", "+"))
        response = requests.get(url)
        return response.json()

    @staticmethod
    def get_instructor(instructor_name):
        json = RateMyProfessorsParser.get_instructor_json(instructor_name)
        first_name, last_name, rating, rmp_id = RateMyProfessorsParser.parse_instructor_json(
            json
        )

        return first_name, last_name, rating, rmp_id

    @staticmethod
    def parse_instructor_json(data):
        if data["response"]["numFound"] is not 1:
            raise ValueError("RateMyProfessors could not find professor.")

        rating = data["response"]["docs"][0]["averageratingscore_rf"]
        first_name = data["response"]["docs"][0]["teacherfirstname_t"]
        last_name = data["response"]["docs"][0]["teacherlastname_t"]
        rmp_id = data["response"]["docs"][0]["pk_id"]

        return first_name, last_name, rating, rmp_id


def main():
    Base.metadata.create_all(engine)
    ScheduleScraper.run()


if __name__ == "__main__":
    main()