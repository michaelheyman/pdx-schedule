from bs4 import BeautifulSoup
import re

from model import Base
from model import engine
from model import InstructorMgr
from model import CourseMgr


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

            if instructor is None:
                CourseMgr.add_course(name=name, crn=crn, number=number)
                continue

            instructor_record = InstructorMgr.add_instructor(instructor)
            CourseMgr.add_course(
                name=name, crn=crn, number=number, instructor_id=instructor_record.id
            )

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
    main()
