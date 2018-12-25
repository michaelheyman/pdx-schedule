import requests


class RateMyProfessors:
    url = (
        "http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&"
        "q={0}+AND+schoolid_s%3A775&"
        "qf=teacherfirstname_t+teacherlastname_t+teacherfullname_t&"
        "siteName=rmp&"
        "fl=pk_id+teacherfirstname_t+teacherlastname_t+averageratingscore_rf&fq="
    )

    @staticmethod
    def get_instructor_json(instructor_name):
        url = RateMyProfessors.url.format(instructor_name.replace(" ", "+"))
        response = requests.get(url)
        return response.json()

    @staticmethod
    def get_instructor(instructor_name):
        if len(instructor_name.split()) == 3:
            split = instructor_name.split()
            del split[1]
            instructor_name = " ".join(split)

        json = RateMyProfessors.get_instructor_json(instructor_name)
        first_name, last_name, rating, rmp_id = RateMyProfessors.parse_instructor_json(
            json
        )

        return first_name, last_name, rating, rmp_id

    @staticmethod
    def parse_instructor_json(data):
        rating = None

        if data["response"]["numFound"] is 0:
            raise ValueError("RateMyProfessors could not find professor.")

        instructor_data = data["response"]["docs"][0]

        if "averageratingscore_rf" in instructor_data:
            rating = instructor_data["averageratingscore_rf"]

        first_name = instructor_data["teacherfirstname_t"]
        last_name = instructor_data["teacherlastname_t"]
        rmp_id = instructor_data["pk_id"]

        return first_name, last_name, rating, rmp_id
