class Course:
    def __init__(self, name, number, crn, instructor, url):
        self.name = name
        self.number = number
        self.crn = crn
        self.instructor = instructor
        self.url = url

    def __repr__(self):
        return f"{self.number} {self.name} {self.crn} {self.instructor}"

    def __str__(self):
        return f"{self.number} {self.name} {self.crn} {self.instructor} {self.url}"

    def __eq__(self, other):
        if isinstance(other, Course):
            return self.crn == other.crn
        return False
