import config
from datetime import datetime, timedelta
from logger import LOG
from ratemyprofessors import RateMyProfessors
from sqlalchemy import create_engine
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import relationship

engine = create_engine(f"sqlite:///{config.DATABASE_PATH}", echo=False)
Base = declarative_base()
Session = sessionmaker(bind=engine)
DBSession = Session()


class ConnectionMgr:
    @staticmethod
    def commit():
        DBSession.commit()


class InstructorMgr:
    @staticmethod
    def add_instructor(instructor):
        instructor_record = (
            DBSession.query(Instructor)
            .filter(Instructor.full_name == instructor)
            .first()
        )

        if instructor_record is None:
            LOG.debug(f"Creating new instructor record for: {instructor}")
            instructor_record = InstructorMgr.create_instructor(instructor)

            DBSession.add(instructor_record)
            DBSession.flush()
        else:
            if instructor_record.timestamp < datetime.today() - timedelta(days=1):
                LOG.debug(f"Updating instructor information for: {instructor}")
                instructor_record = InstructorMgr.update_instructor(instructor_record)

        DBSession.commit()

        return instructor_record

    @staticmethod
    def create_instructor(instructor):
        try:
            first_name, last_name, rating, rmp_id = RateMyProfessors.get_instructor(
                instructor
            )
        except ValueError:
            LOG.info(f"RateMyProfessors found no record of instructor {instructor}.")
            instructor_record = Instructor(full_name=instructor)
        else:
            instructor_record = Instructor(
                full_name=instructor,
                first_name=first_name,
                last_name=last_name,
                rating=rating,
                url=f"http://www.ratemyprofessors.com/ShowRatings.jsp?tid={rmp_id}",
            )

        return instructor_record

    @staticmethod
    def update_instructor(instructor_record):
        if instructor_record.timestamp < datetime.today() - timedelta(days=1):
            try:
                first_name, last_name, rating, rmp_id = RateMyProfessors.get_instructor(
                    instructor_record.full_name
                )
            except ValueError:
                instructor_record.timestamp = datetime.now()
                LOG.debug(f"{instructor_record.full_name} not in RMP")
            else:
                if instructor_record.first_name and (
                    first_name != instructor_record.first_name
                ):
                    instructor_record.first_name = first_name

                if instructor_record.rating and rating != instructor_record.rating:
                    instructor_record.rating = rating

                url = f"http://www.ratemyprofessors.com/ShowRatings.jsp?tid={rmp_id}"
                if instructor_record.url and url != instructor_record.url:
                    instructor_record.url = url

                instructor_record.timestamp = datetime.now()
                LOG.debug(f"{instructor_record.full_name} in db updated")

        return instructor_record


class Instructor(Base):
    __tablename__ = "Instructor"

    instructor_id = Column("InstructorId", Integer, primary_key=True)
    full_name = Column("FullName", String, nullable=False)
    first_name = Column("FirstName", String)
    last_name = Column("LastName", String)
    rating = Column("Rating", Float)
    url = Column("URL", String)
    timestamp = Column("Timestamp", DateTime, default=datetime.now)

    def __repr__(self):
        return (
            f"<Instructor(id={self.instructor_id}, "
            f"name={self.full_name}, "
            f"rating={self.rating}, "
            f"url={self.url}, "
            f"timestamp={self.timestamp}, "
        )


class CourseMgr:
    @staticmethod
    def add_course(name, number, discipline):
        exists = (
            DBSession.query(Course)
            .filter(
                Course.name == name,
                Course.number == number,
                Course.discipline == discipline,
            )
            .first()
        ) is not None

        if not exists:
            course = Course(name=name, number=number, discipline=discipline)
            DBSession.add(course)
            DBSession.commit()


class Course(Base):
    __tablename__ = "Course"

    course_id = Column("CourseId", Integer, primary_key=True)
    name = Column("Name", String, nullable=False)
    number = Column("Class", String, nullable=False)
    discipline = Column("Discipline", String, nullable=False)

    def __repr__(self):
        return (
            f"<Course(id={self.course_id}, "
            f"name={self.name}, "
            f"number={self.number}, "
            f"discipline={self.discipline}, "
        )


class ClassOfferingMgr:
    @staticmethod
    def add_class_offering(
        course_name, course_number, instructor_name, term, credits, days, time, crn
    ):
        course_id = (
            DBSession.query(Course.course_id)
            .filter(Course.name == course_name, Course.number == course_number)
            .scalar()
        )
        instructor_id = (
            DBSession.query(Instructor.instructor_id)
            .filter(Instructor.full_name == instructor_name)
            .scalar()
        )

        class_offering_record = (
            DBSession.query(ClassOffering)
            .filter(
                ClassOffering.term == term,
                ClassOffering.course_id == course_id,
                ClassOffering.instructor_id == instructor_id,
                ClassOffering.crn == crn,
                ClassOffering.credits == credits,
            )
            .first()
        )

        if class_offering_record is None:
            class_offering_record = ClassOffering(
                course_id=course_id,
                instructor_id=instructor_id,
                term=term,
                credits=credits,
                crn=crn,
                days=days,
                time=time,
            )

            DBSession.add(class_offering_record)
            DBSession.flush()
        else:
            class_offering_record.timestamp = datetime.now()

        DBSession.commit()

        return class_offering_record


class ClassOffering(Base):
    __tablename__ = "ClassOffering"

    class_offering_id = Column("ClassOfferingId", Integer, primary_key=True)
    course_id = Column(
        "CourseId", Integer, ForeignKey("Course.CourseId"), nullable=False
    )
    course = relationship("Course")
    instructor_id = Column(
        "InstructorId", Integer, ForeignKey("Instructor.InstructorId")
    )
    instructor = relationship("Instructor")
    term = Column("Term", Integer, ForeignKey("Term.Description"))
    credits = Column("Credits", Integer, nullable=False)
    days = Column("Days", String)
    time = Column("Time", String)
    crn = Column("CRN", Integer, nullable=False)
    timestamp = Column("Timestamp", DateTime, default=datetime.now)

    def __repr__(self):
        return (
            f"<ClassOfferingId(id={self.class_offering_id}, "
            f"course_id={self.course_id}, "
            f"instructor_id={self.instructor_id}, "
            f"credits={self.credits}, "
            f"days={self.days}, "
            f"time={self.time}, "
            f"crn={self.crn}, "
            f"timestamp={self.timestamp})>"
        )


class TermMgr:
    @staticmethod
    def add_term(date, description):
        term_record = (
            DBSession.query(Term)
            .filter(Term.date == date, Term.description == description)
            .first()
        )

        if term_record is None:
            term_record = Term(date=date, description=description)

            DBSession.add(term_record)
            DBSession.flush()
            DBSession.commit()

        return term_record


class Term(Base):
    __tablename__ = "Term"

    date = Column("Date", Integer, primary_key=True)
    description = Column("Description", String, primary_key=True)

    def __repr__(self):
        return f"<Term(date={self.date}, " f"description={self.description}>"


def table_exists(name):
    return engine.dialect.has_table(engine, name)


def initialize_database():
    Base.metadata.create_all(engine)

    if table_exists("ClassOffering"):
        refreshed_terms = (
            DBSession.query(Term)
            .order_by(Term.date.desc())
            .limit(config.MAX_TERMS)
            .all()
        )

        for term in refreshed_terms:
            DBSession.query(ClassOffering).filter(
                ClassOffering.term == term.date
            ).delete()
