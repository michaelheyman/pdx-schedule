from crawler import crawl
from logger import LOG
from model import Base
from model import engine
from model import InstructorMgr
from model import CourseMgr
from model import ClassOfferingMgr
from model import ConnectionMgr
from model import TermMgr


def run():
    LOG.info("RUNNING")
    disciplines = crawl()

    if disciplines is None:
        LOG.error("No JSON found to parse. Exiting.")
        return

    for discipline in disciplines:
        for course in discipline:
            number = f"{course['subject']} {course['courseNumber']}"
            name = course["courseTitle"].replace("&amp;", "&")
            crn = int(course["courseReferenceNumber"])
            discipline = course["subjectDescription"].replace("&amp;", "&")
            days = get_days(course)
            credits = int(course["creditHours"]) if course["creditHours"] else 0
            time = get_time(course)
            instructor = get_instructor(course)
            term_description = get_term_description(course)
            term_date = int(course["term"])

            save_to_database(
                name,
                number,
                discipline,
                instructor,
                term_date,
                term_description,
                credits,
                days,
                time,
                crn,
            )

    ConnectionMgr.commit()


def save_to_database(
    name,
    number,
    discipline,
    instructor,
    term_date,
    term_description,
    credits,
    days,
    time,
    crn,
):
    if instructor is None:
        CourseMgr.add_course(name=name, number=number, discipline=discipline)
        return

    InstructorMgr.add_instructor(instructor)
    CourseMgr.add_course(name=name, number=number, discipline=discipline)

    ClassOfferingMgr.add_class_offering(
        course_name=name,
        course_number=number,
        instructor_name=instructor,
        term=term_date,
        credits=credits,
        days=days,
        time=time,
        crn=crn,
    )

    TermMgr.add_term(date=term_date, description=term_description)


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


def print_class(rec):
    print(f"Number: {rec['subject']} {rec['courseNumber']}")
    print(f"Title: {rec['courseTitle'].replace('&amp;', '&')}")
    print(f"CRN: {int(rec['courseReferenceNumber'])}")
    print(f"Discipline: {rec['subjectDescription'].replace('&amp;', '&')}")
    print(f"Days: {get_days(rec)}")
    print(f"Credits: {int(rec['creditHours'])}")
    print(f"Time: {get_time(rec)}")
    print(f"Instructor: {get_instructor(rec)}")
    print(f"Term description: {get_term_description(rec)}")
    print(f"Term date: {int(rec['term'])}")
    print("\n")


def main():
    Base.metadata.create_all(engine)
    run()


if __name__ == "__main__":
    main()
