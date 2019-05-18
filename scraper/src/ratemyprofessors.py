import requests


class RateMyProfessors:
    url = (
        "https://search-production.ratemyprofessors.com/solr/rmp/select/?solrformat=true&"
        "wt=json&q={0}&"
        "qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t&fq=schoolname_t"
        "%3A%22Portland+State+University%22&fq=schoolid_s%3A775"
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

        instructor_name = uncommon_alias(instructor_name)
        json = RateMyProfessors.get_instructor_json(instructor_name)
        first_name, last_name, rating, rmp_id = RateMyProfessors.parse_instructor_json(
            json
        )

        return first_name, last_name, rating, rmp_id

    @staticmethod
    def parse_instructor_json(data):
        rating = None

        if data["response"]["numFound"] == 0:
            raise ValueError("RateMyProfessors could not find professor.")

        instructor_data = data["response"]["docs"][0]

        if "averageratingscore_rf" in instructor_data:
            rating = instructor_data["averageratingscore_rf"]

        first_name = instructor_data["teacherfirstname_t"]
        last_name = instructor_data["teacherlastname_t"]
        rmp_id = instructor_data["pk_id"]

        return first_name, last_name, rating, rmp_id


aliases = {"Barton": "Bart"}


def uncommon_alias(instructor_name):
    names = instructor_name.split()
    first_name = names[0]

    if first_name in aliases:
        names[0] = aliases[first_name]

    return " ".join(names)
