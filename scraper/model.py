from datetime import datetime

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
from parser import RateMyProfessors

import logging

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")
LOG = logging.getLogger(__name__)

engine = create_engine("sqlite:///alldisciplines.db", echo=False)
Base = declarative_base()
Session = sessionmaker(bind=engine)
DBSession = Session()


class InstructorMgr:
    @staticmethod
    def add_instructor(instructor):
        instructor_record = (
            DBSession.query(Instructor)
            .filter(Instructor.full_name == instructor)
            .first()
        )

        if instructor_record is None:
            try:
                first_name, last_name, rating, rmp_id = RateMyProfessors.get_instructor(
                    instructor
                )
            except ValueError:
                LOG.debug(f"{instructor} not found")
                instructor_record = Instructor(full_name=instructor)
            else:
                instructor_record = Instructor(
                    full_name=instructor,
                    first_name=first_name,
                    last_name=last_name,
                    rating=rating,
                    url=f"http://www.ratemyprofessors.com/ShowRatings.jsp?tid={rmp_id}",
                )
                LOG.debug(f"{instructor} new")

            DBSession.add(instructor_record)
            DBSession.flush()
        else:
            LOG.debug(f"{instructor} was already in db!")

        DBSession.commit()

        return instructor_record


class Instructor(Base):
    __tablename__ = "Instructor"

    id = Column("Id", Integer, primary_key=True)
    full_name = Column("FullName", String, nullable=False)
    first_name = Column("FirstName", String)
    last_name = Column("LastName", String)
    rating = Column("Rating", Float)
    url = Column("URL", String)
    timestamp = Column("Timestamp", DateTime, default=datetime.utcnow)

    def __repr__(self):
        return (
            f"<Instructor(id={self.id}, "
            "name={self.full_name}, "
            "rating={self.rating}, "
            "url={self.url}, "
            "timestamp={self.timestamp})>"
        )


class CourseMgr:
    @staticmethod
    def add_course(name, crn, number, days, time, credits, instructor_id=None):
        course = Course(
            name=name,
            crn=crn,
            number=number,
            days=days,
            time=time,
            credits=credits,
            instructor_id=instructor_id,
        )
        DBSession.add(course)
        DBSession.commit()


class Course(Base):
    __tablename__ = "Course"

    id = Column("Id", Integer, primary_key=True)
    name = Column("Name", String, nullable=False)
    number = Column("Class", String, nullable=False)
    days = Column("Days", String)
    time = Column("Time", String)
    credits = Column("Credits", Integer, nullable=False)
    crn = Column("CRN", Integer, nullable=False)
    url = Column("URL", String)
    instructor_id = Column("InstructorId", Integer, ForeignKey("Instructor.Id"))
    instructor = relationship("Instructor")
    timestamp = Column("Timestamp", DateTime, default=datetime.utcnow)

    def __repr__(self):
        return (
            f"<Course(id={self.id}, "
            "name={self.name}, "
            "number={self.number}, "
            "days={self.days}, "
            "time={self.time}, "
            "credits={self.credits}, "
            "crn={self.crn}, "
            "url={self.url}, "
            "instructor_id={self.instructor_id}, "
            "instructor={self.instructor}, "
            "timestamp={self.timestamp})>"
        )


def main():
    Base.metadata.create_all(engine)


main()
