import config
import stringcase
from datetime import datetime, timedelta
from logger import LOG
from firestore import Firestore
from ratemyprofessors import RateMyProfessors

RMP_URL = "http://www.ratemyprofessors.com/ShowRatings.jsp?tid="


class InstructorMgr:
    @staticmethod
    def add_instructor(instructor_name):
        instructor_ref = None

        # instructor_query = Firestore.instructors().where(
        #     "fullName", "==", instructor_name
        # )
        # for elem in instructor_query.stream():
        #     instructor_ref = elem.reference
        #     instructor_dict = elem.to_dict()

        # if instructor_ref is None:
        #     LOG.debug(f"Creating new instructor record for: {instructor_name}")
        #     instructor = InstructorMgr.create_instructor(instructor_name)
        #     _, instructor_ref = Firestore.instructors().add(instructor.to_dict())
        # else:
        #     InstructorMgr.update_instructor(instructor_ref, instructor_dict)

        if instructor_name not in Firestore.instructor_list.keys():
            LOG.debug(f"Creating new instructor record for: {instructor_name}")
            instructor = InstructorMgr.create_instructor(instructor_name)
            _, instructor_ref = Firestore.instructors().add(instructor.to_dict())
        else:
            LOG.debug(f"\nInstructor already existed: {instructor_name}\n")

        #     InstructorMgr.update_instructor(instructor_ref, instructor_dict)

        return instructor_ref

    @staticmethod
    def create_instructor(instructor_name):
        try:
            first_name, last_name, rating, rmp_id = RateMyProfessors.get_instructor(
                instructor_name
            )
        except ValueError:
            LOG.info(
                f"RateMyProfessors found no record of instructor {instructor_name}."
            )
            instructor = Instructor(full_name=instructor_name)
        else:
            instructor = Instructor(
                full_name=instructor_name,
                first_name=first_name,
                last_name=last_name,
                rating=rating,
                # TODO: move RMP_URL to RMP, this class doesn't need to know about this
                url=f"{RMP_URL}{rmp_id}",
            )

        return instructor

    @staticmethod
    def update_instructor(instructor_ref, instructor_dict):
        print(instructor_dict)
        instructor_name = instructor_dict["fullName"]
        timestamp = instructor_dict["timestamp"].timestamp_pb()
        timestamp = datetime.fromtimestamp(timestamp.seconds + timestamp.nanos / 1e9)

        if timestamp < datetime.today() - timedelta(days=config.INSTRUCTOR_UPDATE_RATE):
            LOG.debug(f"Updating instructor information for: {instructor_name}")
            try:
                first_name, last_name, rating, rmp_id = RateMyProfessors.get_instructor(
                    instructor_name
                )
            except ValueError:
                instructor_ref.timestamp = datetime.now()
            else:
                instructor_dict["firstName"] = first_name
                instructor_dict["lastName"] = last_name
                instructor_dict["rating"] = rating
                instructor_dict["url"] = f"{RMP_URL}{rmp_id}"
                instructor_dict["timestamp"] = datetime.now()

                instructor_ref.update(instructor_dict)

        return instructor_ref

    @staticmethod
    def get_instructor_ref(full_name):
        instructor_ref = (
            Firestore.instructors().where("fullName", "==", full_name).limit(1)
        )

        for instructor in instructor_ref.stream():
            return Firestore.instructors().document(instructor.id)

        return None


class Instructor(object):
    def __init__(
        self, full_name, first_name=None, last_name=None, rating=None, url=None
    ):
        self.full_name = full_name
        self.first_name = first_name
        self.last_name = last_name
        self.rating = rating
        self.url = url
        self.timestamp = datetime.now()

    @staticmethod
    def from_dict(source):
        print(source.keys())
        instructor = Instructor(source["fullName"])

        for var in source.keys():
            setattr(instructor, var, source[var])

        return instructor

    def to_dict(self):
        dest = dict()

        for var in vars(self).keys():
            value = getattr(self, var)
            if value is not None:
                dest[stringcase.camelcase(var)] = value

        return dest

    def __repr__(self):
        return (
            f"<Instructor(name={self.full_name}, "
            f"rating={self.rating}, "
            f"url={self.url}, "
            f"timestamp={self.timestamp}, "
        )


class Course(object):
    def __init__(self, name, number, discipline):
        self.name = name
        self.number = number
        self.discipline = discipline

    def to_dict(self):
        dest = dict()

        for var in vars(self).keys():
            value = getattr(self, var)
            if value is not None:
                dest[stringcase.camelcase(var)] = value

        return dest

    def __repr__(self):
        return (
            f"<Course(name={self.name}, "
            f"number={self.number}, "
            f"discipline={self.discipline}, "
        )


class ClassOfferingMgr:
    @staticmethod
    def add_class_offering(
        course, crn, instructor_name, term, credits=None, days=None, time=None
    ):
        # instructor_query = Firestore.instructors().where(
        #     "fullName", "==", instructor_name
        # )
        # for elem in instructor_query.stream():
        #     instructor_ref = elem.reference
        instructor_ref = InstructorMgr.add_instructor(instructor_name)

        class_offering = ClassOffering(
            course=course,
            crn=crn,
            term=term,
            instructor_ref=instructor_ref,
            credits=credits,
            days=days,
            time=time,
        )

        LOG.debug(f"Creating new class record for {course.number}:{class_offering.crn}")
        class_offering_dict = class_offering.to_dict()

        # class_offering_dict["instructor"] = instructor_ref
        # class_offering_dict["instructor"] = instructor_name
        class_offering_dict["timestamp"] = datetime.now()

        if not Firestore.classes().document(term.date).get().exists:
            LOG.info(f"{term.date} didn't exist in the term document")
            new_term = Firestore.classes().document(document_id=term.date)
            new_term.create(document_data=term.to_dict())

        Firestore.add_class(term=term, document_data=class_offering_dict)


class ClassOffering(object):
    def __init__(
        self, course, crn, credits, term, instructor_ref=None, days=None, time=None
    ):
        self.course = course
        self.crn = crn
        self.credits = credits
        self.instructor = instructor_ref
        self.days = days
        self.time = time
        self.term = term
        self.timestamp = datetime.now()

    def to_dict(self):
        dest = dict()

        for var in vars(self).keys():
            objects = ["course", "term"]

            if var in objects:
                value = getattr(self, var).to_dict() if getattr(self, var) else None
            elif var == "instructor_ref":
                # pdb.set_trace()
                dest["instructor_ref"] = self.instructor_ref
                pass
            else:
                value = getattr(self, var)

            if value is not None:
                dest[stringcase.camelcase(var)] = value

        return dest

    def __repr__(self):
        return (
            f"<ClassOfferingId(course={self.course}, "
            f"instructor_name={self.instructor_name}, "
            f"credits={self.credits}, "
            f"days={self.days}, "
            f"time={self.time}, "
            f"crn={self.crn}, "
            f"term={self.term}, "
            f"timestamp={self.timestamp})>"
        )


class Term(object):
    def __init__(self, date, subject, description):
        self.date = date
        # TODO: do you need a subject with the term? NO, change this
        self.subject = subject
        self.description = description

    def to_dict(self):
        dest = dict()

        for var in vars(self).keys():
            value = getattr(self, var)
            if value is not None:
                dest[stringcase.camelcase(var)] = value

        return dest

    def __repr__(self):
        return f"<Term(date={self.date}, " f"description={self.description}>"


# class Firestore:
#     @staticmethod
#     def initialize_database():
#         courses_ref = Firestore.classes()

#         if genlen(courses_ref.stream()):
#             refreshed_terms = list()
#             [
#                 refreshed_terms.append(elem.id)
#                 for elem in courses_ref.order_by("code", direction="DESCENDING")
#                 .limit(config.MAX_TERMS)
#                 .stream()
#             ]

#             print(f"refreshed_terms: {refreshed_terms}")
#             # courses_ref.document(
#             #     "201903"
#             # ).delete()  # TODO: disable when getting actual data

#             # enable this when getting actual data
#             for term in refreshed_terms:
#                 courses_ref.document(term).delete()


def genlen(generator):
    total = sum(1 for _ in generator)
    return total if total > 0 else None


def test():
    inst = Instructor("Mark P Jones", "Mark", "Jones", rating=3.88)
    term = Term("201904", "Fall 2019")
    course = Course("Functional Programming", "CS 466", "Computer Science")
    classoffering = ClassOffering(course, 12345, 4, inst, term=term)

    # print(inst.to_dict())
    # print(term.to_dict())
    # print(course.to_dict())
    print(classoffering.to_dict())

    # import json
    # json.dumps(classoffering.to_dict(), default=str)


# initialize_database()

# inst = Instructor("Mark P Jones", "Mark", "Jones", rating=3.88)
# newinst = Instructor.from_dict(inst.to_dict())
# print(newinst.to_dict())

# InstructorMgr.add_instructor("Mark P Jones")
# InstructorMgr.add_instructor("Karla Fant")
# InstructorMgr.add_instructor("Chris Gilmore")
# InstructorMgr.add_instructor("Mark W Morrissey")

# new_course = Course("Malware", "CS455", "Computer Science")
# new_term = Term("201904", "Fall 2019")
# new_class_offering = ClassOffering(
#     course=new_course,
#     crn=12345,
#     term=new_term,
#     instructor="Katie Casamento",
#     credits=4,
#     days="TR",
#     time="08:00 - 12:00",
# )

# ClassOfferingMgr.add_class_offering(new_class_offering)
# ClassOfferingMgr.add_class_offering(
#     new_course,
#     12345,
#     "Katie Casamento",
#     new_term,
#     credits=4,
#     days="TR",
#     time="08:00 - 12:00",
# )

# ClassOfferingMgr.add_class_offering(
#     new_course,
#     12345,
#     "Wu-Chang Feng",
#     new_term,
#     credits=4,
#     days="TR",
#     time="08:00 - 12:00",
# )
