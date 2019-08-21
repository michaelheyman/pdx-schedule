import json


def read_json(filename):
    data = []
    with open(filename, "r") as file:
        content = file.read()
        data = json.loads(content)

    return data
