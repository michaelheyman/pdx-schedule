from bs4 import BeautifulSoup
import re
import logging

from model import Base
from model import engine
from model import InstructorMgr
from model import CourseMgr
from crawler import crawl

LOG = logging.getLogger(__name__)


class ScheduleScraper:
    TITLE_CLASS = "ddtitle"
    DEFAULT_CLASS = "dddefault"
    soup = ""

    @staticmethod
    def run():
        content = crawl()

        if content is None:
            LOG.error("No content found to scrape. Exiting.")
            return

        ScheduleScraper.soup = BeautifulSoup(content, "html.parser")

        for elem in ScheduleScraper.soup.find_all("th", ScheduleScraper.TITLE_CLASS):
            name, crn, number = ScheduleScraper.get_course(elem)
            instructor = ScheduleScraper.get_instructor(elem)
            credits = ScheduleScraper.get_credits(elem)

            if instructor is None:
                CourseMgr.add_course(name=name, crn=crn, number=number, credits=credits)
                continue

            instructor_record = InstructorMgr.add_instructor(instructor)
            CourseMgr.add_course(
                name=name,
                crn=crn,
                number=number,
                credits=credits,
                instructor_id=instructor_record.id,
            )

    @staticmethod
    def get_credits(header):
        course_table = header.parent.next_sibling.next_sibling
        credits_text = course_table.find_all(text=re.compile(r"\d\.\d{3} Credits"))

        if not credits_text or len(credits_text) is not 1:
            print(credits_text)
            print(len(credits_text))
            LOG.error("Invalid course credit information in page.")
            return None

        credits_trim = credits_text[0].strip()
        credits = credits_trim.split()[0]

        return int(float(credits))

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


def main():
    Base.metadata.create_all(engine)
    ScheduleScraper.run()


if __name__ == "__main__":
    pass
    main()
