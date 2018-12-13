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

engine = create_engine("sqlite:///:memory:", echo=False)
# engine = create_engine("sqlite:///foo.db", echo=False)
Base = declarative_base()
Session = sessionmaker(bind=engine)
DBSession = Session()


class Instructor(Base):
    __tablename__ = "Instructors"

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


class Course(Base):
    __tablename__ = "Courses"

    id = Column("Id", Integer, primary_key=True)
    name = Column("Name", String, nullable=False)
    number = Column("Number", String, nullable=False)
    crn = Column("CRN", Integer, nullable=False)
    url = Column("URL", String)
    instructor_id = Column(Integer, ForeignKey("Instructors.Id"))
    instructor = relationship("Instructor")
    timestamp = Column("Timestamp", DateTime, default=datetime.utcnow)

    def __repr__(self):
        return (
            f"<Course(id={self.id}, "
            "name={self.name}, "
            "number={self.number}, "
            "crn={self.crn}, "
            "url={self.url}, "
            "instructor_id={self.instructor_id}, "
            "instructor={self.instructor}, "
            "timestamp={self.timestamp})>"
        )


def main():
    Base.metadata.create_all(engine)


main()
