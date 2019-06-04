import asyncio
import json


from crawler import crawl
from logger import LOG
from firestore import Firestore
from fmodel import ClassOfferingMgr, Course, Term


def offline_crawl():
    lst = []
    with open("./tests/fall2019.json", "r") as file:
        content = file.read()
        lst = json.loads(content)

    return lst


async def run():
    LOG.info("RUNNING")
    terms = crawl()
    # terms = offline_crawl()

    if terms is None:
        LOG.error("No JSON returned from the crawler. Exiting.")
        return

    async for term in crawl():
        # for term in terms:
        for idx, discipline in enumerate(term):
            # if idx > 1:
            #     continue
            for course in discipline:
                course = get_course_data(course)
                save_to_database(course)

    # print(f"length of instructor list: {len(Firestore.instructor_list)}")
    # instructor_doc = Firestore.instructors().document()
    # print(instructor_doc)
    # print(instructor_doc.id)
    # instructor_doc.set({"fullName": "Testructor2"})
    # print(f"length of instructor list: {len(Firestore.instructor_list)}")
    Firestore.commit()


def get_course_data(course):
    course_data = dict()

    course_data["number"] = f"{course['subject']} {course['courseNumber']}"
    course_data["name"] = course["courseTitle"].replace("&amp;", "&")
    course_data["crn"] = int(course["courseReferenceNumber"])
    course_data["discipline"] = course["subjectDescription"].replace("&amp;", "&")
    course_data["subject"] = course["subject"]
    course_data["days"] = get_days(course)
    course_data["credits"] = int(course["creditHours"]) if course["creditHours"] else 0
    course_data["time"] = get_time(course)
    course_data["instructor"] = get_instructor_name(course)
    course_data["term_description"] = get_term_description(course)
    course_data["term_date"] = int(course["term"])

    return course_data


def save_to_database(data):
    # InstructorMgr.add_instructor(data["instructor"])

    # if data["instructor"]:
    #     InstructorMgr.add_instructor(data["instructor"])

    course = Course(data["name"], data["number"], data["discipline"])
    term = Term(str(data["term_date"]), data["subject"], data["term_description"])

    ClassOfferingMgr.add_class_offering(
        course=course,
        crn=data["crn"],
        instructor_name=data["instructor"],
        term=term,
        credits=data["credits"],
        days=data["days"],
        time=data["time"],
    )


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


def get_instructor_name(rec):
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
    Firestore.initialize()
    asyncio.get_event_loop().run_until_complete(run())


if __name__ == "__main__":
    main()
