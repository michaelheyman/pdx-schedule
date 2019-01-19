from bs4 import BeautifulSoup
import re
import logging

from model import Base
from model import engine
from model import InstructorMgr
from model import CourseMgr
from model import ClassOfferingMgr
from model import ConnectionMgr
from model import TermMgr
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

        for content, term_name, term_date in contents:
            ScheduleScraper.soup = BeautifulSoup(content, "lxml")
            discipline = ScheduleScraper.soup.find("b").get_text()

            for elem in ScheduleScraper.soup.find_all(
                "th", ScheduleScraper.TITLE_CLASS
            ):
                ScheduleScraper.get_class_data(elem, discipline, term_name, term_date)

        ConnectionMgr.commit()

    @staticmethod
    def get_class_data(elem, discipline, term_name, term_date):
        name, crn, number = ScheduleScraper.get_course(elem)
        credits = ScheduleScraper.get_credits(elem)

        meeting_table_list = elem.parent.find_next_sibling("tr").findChildren(
            "table", {"class": ScheduleScraper.MEETING_TABLE_CLASS}
        )
        if meeting_table_list:
            meeting_table = meeting_table_list[0]
            instructor_name = ScheduleScraper.get_instructor(meeting_table)
            time, days = ScheduleScraper.get_schedule(meeting_table)
        else:
            instructor_name = None
            time, days = (None, None)
            LOG.warning("No meeting table found for this class")

        if instructor_name is None:
            CourseMgr.add_course(name=name, number=number, discipline=discipline)
            return

        InstructorMgr.add_instructor(instructor_name)
        CourseMgr.add_course(name=name, number=number, discipline=discipline)

        ClassOfferingMgr.add_class_offering(
            course_name=name,
            course_number=number,
            instructor_name=instructor_name,
            term=term_name,
            credits=credits,
            days=days,
            time=time,
            crn=crn,
        )

        TermMgr.add_term(date=term_date, description=term_name)

    @staticmethod
    def get_discipline(elem):
        pass

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

        time_data = cells[1]
        days_data = cells[2]
        time = time_data.get_text()
        days = days_data.get_text()

        if not time or not days:
            LOG.error("Invalid date and time information in page.")
            return None

        format_time = time.split(" - ")
        if len(format_time) is 2:
            if len(format_time[0]) is 4:
                format_time[0] = "0" + format_time[0]
            if len(format_time[1]) is 4:
                format_time[1] = "0" + format_time[1]
            time = " - ".join(format_time)

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
    def get_instructor(meeting_table):
        if not meeting_table:
            return None

        cells = meeting_table.find_all("td", ScheduleScraper.DEFAULT_CLASS)
        if not cells:
            return None

        last_cell = cells[-1]
        sep = " (P)"
        last_cell_text = last_cell.get_text()
        instructor_name = last_cell_text.split(sep, 1)[0]
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
