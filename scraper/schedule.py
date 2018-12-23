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
    MEETING_TABLE_CLASS = "datadisplaytable"
    soup = ""

    @staticmethod
    def run():
        contents = crawl()

        if contents is None:
            LOG.error("No content found to scrape. Exiting.")
            return

        for content in contents:
            ScheduleScraper.soup = BeautifulSoup(content, "lxml")

            for elem in ScheduleScraper.soup.find_all(
                "th", ScheduleScraper.TITLE_CLASS
            ):
                # TODO: refactor this by passing one class to a function
                name, crn, number = ScheduleScraper.get_course(elem)
                credits = ScheduleScraper.get_credits(elem)

                meeting_table_list = elem.parent.find_next_sibling("tr").findChildren(
                    "table", {"class": ScheduleScraper.MEETING_TABLE_CLASS}
                )
                if meeting_table_list:
                    meeting_table = meeting_table_list[0]
                    instructor = ScheduleScraper.get_instructor(elem)
                    time, days = ScheduleScraper.get_schedule(meeting_table)
                else:
                    instructor = None
                    time, days = (None, None)
                    LOG.warning("No meeting table found for this class")

                if instructor is None:
                    CourseMgr.add_course(
                        name=name,
                        crn=crn,
                        number=number,
                        days=days,
                        time=time,
                        credits=credits,
                    )
                    continue

                instructor_record = InstructorMgr.add_instructor(instructor)
                CourseMgr.add_course(
                    name=name,
                    crn=crn,
                    number=number,
                    days=days,
                    time=time,
                    credits=credits,
                    instructor_id=instructor_record.id,
                )

    @staticmethod
    def get_schedule(meeting_table):
        cells = meeting_table.find_all("td", ScheduleScraper.DEFAULT_CLASS)
        assert cells
        assert len(cells)
        if not cells:
            LOG.error("No cells")
            return None
        if len(cells) < 3:
            LOG.error(f"Not enough cells: {cells}")
            return None

        time_data = cells[2]
        days_data = cells[3]
        time = time_data.get_text()
        days = days_data.get_text()

        if not time or not days:
            LOG.error("Invalid date and time information in page.")
            return None

        return time, days

    @staticmethod
    def get_credits(header):
        course_table = header.parent.find_next_sibling("tr")
        credits_text = course_table.find_all(text=re.compile(r"\d\.\d{3} Credits"))

        if not credits_text:
            LOG.error(
                f"Invalid course credit information in page -- credits_text is null"
            )
            return None
        if len(credits_text) is not 1:
            LOG.error(
                f"Invalid course credit information in page -- credits_text length is {len(credits_text)}."
            )
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
            LOG.info("No matches for name, crn, or number")
            return None
        if len(name.groups()) is not 1:
            return None
        if len(matches) < 2:
            return None

        number = matches[-1]
        crn = matches[-2]

        return name.group(1), crn, number


def main():
    Base.metadata.create_all(engine)
    ScheduleScraper.run()


if __name__ == "__main__":
    pass
    main()
