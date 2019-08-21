def course_data(course):
    course_data = dict()

    course_data["number"] = f"{course['subject']} {course['courseNumber']}"
    course_data["name"] = course["courseTitle"].replace("&amp;", "&")
    course_data["crn"] = int(course["courseReferenceNumber"])
    course_data["discipline"] = course["subjectDescription"].replace("&amp;", "&")
    course_data["subject"] = course["subject"]
    course_data["days"] = days(course)
    course_data["credits"] = int(course["creditHours"]) if course["creditHours"] else 0
    course_data["time"] = time(course)
    course_data["instructor"] = instructor_name(course)
    course_data["term_description"] = term_description(course)
    course_data["term_date"] = int(course["term"])

    return course_data


def days(record):
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


def instructor_name(rec):
    if rec["faculty"] and len(rec["faculty"]):
        instructor_name = rec["faculty"][0]["displayName"]
        instructor_name = instructor_name.split(", ", maxsplit=1)
        if len(instructor_name) > 1:
            return f"{instructor_name[1]} {instructor_name[0]}"
        else:
            return f"Instructor: {instructor_name}"
    else:
        return "TBD"


def term_date(record):
    return record["term"]


def term_description(record):
    term = record["termDesc"]

    return " ".join(term.split(" ")[0:2])


def time(record):
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
