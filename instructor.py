class Instructor:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Instructor: {self.name} Rating {self.rating} URL {self.url}"

    def __eq__(self, other):
        if isinstance(other, Instructor):
            return self.name == other.name
        return False
