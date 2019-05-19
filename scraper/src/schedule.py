import asyncio
from crawler import crawl
from logger import LOG
from model import (
    Base,
    ClassOfferingMgr,
    ConnectionMgr,
    CourseMgr,
    engine,
    initialize_database,
    InstructorMgr,
    TermMgr,
)


async def run():
    LOG.info("RUNNING")
    terms = crawl()

    if terms is None:
        LOG.error("No JSON returned from the crawler. Exiting.")
        return

    async for term in crawl():
        for discipline in term:
            for course in discipline:
                course = get_course_data(course)
                save_to_database(course)


def get_course_data(course):
    course_data = dict()

    course_data["number"] = f"{course['subject']} {course['courseNumber']}"
    course_data["name"] = course["courseTitle"].replace("&amp;", "&")
    course_data["crn"] = int(course["courseReferenceNumber"])
    course_data["discipline"] = course["subjectDescription"].replace("&amp;", "&")
    course_data["days"] = get_days(course)
    course_data["credits"] = int(course["creditHours"]) if course["creditHours"] else 0
    course_data["time"] = get_time(course)
    course_data["instructor"] = get_instructor(course)
    course_data["term_description"] = get_term_description(course)
    course_data["term_date"] = int(course["term"])

    return course_data


def save_to_database(course):
    if course["instructor"] is None:
        CourseMgr.add_course(
            name=course["name"],
            number=course["number"],
            discipline=course["discipline"],
        )
        return

    InstructorMgr.add_instructor(course["instructor"])
    CourseMgr.add_course(
        name=course["name"], number=course["number"], discipline=course["discipline"]
    )

    ClassOfferingMgr.add_class_offering(
        course_name=course["name"],
        course_number=course["number"],
        instructor_name=course["instructor"],
        term=course["term_date"],
        credits=course["credits"],
        days=course["days"],
        time=course["time"],
        crn=course["crn"],
    )

    TermMgr.add_term(date=course["term_date"], description=course["term_description"])


def get_time(record):
    if not record["meetingsFaculty"]:
        return None

    meeting_time = record["meetingsFaculty"][0]["meetingTime"]

    begin_time = meeting_time["beginTime"]
    end_time = meeting_time["endTime"]

    if begin_time and end_time:
        begin_time = begin_time[0:2] + ":" + begin_time[2:]
        end_time = end_time[0:2] + ":" + end_time[2:]
        return f"{begin_time} - {end_time}"

    return None


def get_days(record):
    if not record["meetingsFaculty"]:
        return None

    meeting_time = record["meetingsFaculty"][0]["meetingTime"]

    days = ""

    if meeting_time["monday"]:
        days += "M"
    if meeting_time["tuesday"]:
        days += "T"
    if meeting_time["wednesday"]:
        days += "W"
    if meeting_time["thursday"]:
        days += "R"
    if meeting_time["friday"]:
        days += "F"
    if meeting_time["saturday"]:
        days += "S"
    if meeting_time["sunday"]:
        days += "SU"

    return days


def get_term_description(record):
    term = record["termDesc"]

    return " ".join(term.split(" ")[0:2])


def get_instructor(rec):
    if rec["faculty"] and len(rec["faculty"]):
        instructor_name = rec["faculty"][0]["displayName"]
        instructor_name = instructor_name.split(", ", maxsplit=1)
        if len(instructor_name) > 1:
            return f"{instructor_name[1]} {instructor_name[0]}"
        else:
            return f"Instructor: {instructor_name}"
    else:
        return "TBD"


def main():
    Base.metadata.create_all(engine)
    initialize_database()
    asyncio.get_event_loop().run_until_complete(run())
    ConnectionMgr.commit()


if __name__ == "__main__":
    main()
