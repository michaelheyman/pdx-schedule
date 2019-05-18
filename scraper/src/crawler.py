import requests
import time
import config
from logger import LOG
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from urllib.parse import urljoin


BASE_URL = "https://app.banner.pdx.edu/StudentRegistrationSsb/ssb/"
INIT_URL = urljoin(BASE_URL, "term/termSelection?mode=search")
CLASS_URL = urljoin(BASE_URL, "classSearch/classSearch")
TERMS_URL = urljoin(BASE_URL, "classSearch/getTerms")
SEARCH_URL = urljoin(BASE_URL, "term/search?mode=search")
SCHEDULE_URL = urljoin(BASE_URL, "searchResults/searchResults")
SUBJECTS_URL = urljoin(BASE_URL, "classSearch/get_subject")


def get_tokens(driver):
    """Returns JSESSIONID and uniqueSessionId needed for receiving a
    successful response from HTTP requests

    :param driver: Instantiated selenium driver
    :returns: The JSESSIONID and uniqueSessionId
    """
    session_id = get_jsession_id(driver)
    unique_session_id = get_unique_session_id(driver)

    return session_id, unique_session_id


def get_jsession_id(driver):
    driver.get(INIT_URL)
    cookies = {cookie["name"]: cookie["value"] for cookie in driver.get_cookies()}

    return cookies["JSESSIONID"]


def get_unique_session_id(driver):
    unique_session_id = driver.execute_script("return sessionStorage.getItem(STORAGE)")

    return unique_session_id


def get_terms(cookies, unique_session_id):
    """Gets JSON with list of terms in the form {code : description}

    :param cookies: Cookies needed to authenticate the request
    :param unique_session_id: Parameter needed to authenticate the request
    :returns: JSON with list of the terms
    """

    payload = {
        "uniqueSessionId": unique_session_id,
        "dataType": "json",
        "searchTerm": "",
        "offset": "1",
        "max": config.MAX_TERMS,
    }
    res = requests.get(TERMS_URL, cookies=cookies, params=payload)

    return res.json()


def get_subjects(cookies, unique_session_id, term_date):
    """Gets the subjects that are available for a particular term.

    :param cookies: Cookies needed to authenticate the request.
    :param unique_session_id: Parameter needed to authenticate the request.
    :param term_date: term Where the subjects will be searched for.
    :returns: JSON with list of subjects
    """

    payload = {
        "uniqueSessionId": unique_session_id,
        "dataType": "json",
        "searchTerm": "",
        "term": term_date,
        "offset": "1",
        "max": config.MAX_SUBJECTS,
        # Query string params expect a timestamp with extra 3 digits
        "_:": str(int(time.time() * 1000)),
    }
    res = requests.get(SUBJECTS_URL, cookies=cookies, params=payload)

    return res.json()


def initialize_driver():
    """Initializes Selenium driver with options. Doesn't open or close driver,
    that responsibility is left to the caller.
    """

    options = Options()
    options.add_argument("--headless")
    prefs = {
        # Load without images
        "profile.managed_default_content_settings.images": 2,
        # Load with disk cache to prevent requesting repeated assets
        "disk-cache-size": 4096,
    }
    options.add_experimental_option("prefs", prefs)

    driver = webdriver.Chrome(options=options)

    return driver


def crawl():
    driver = initialize_driver()

    session_id, unique_session_id = get_tokens(driver)

    if None in (session_id, unique_session_id):
        driver.close()
        return None

    cookies = dict(JSESSIONID=session_id)
    terms = get_terms(cookies, unique_session_id)

    for term in terms:
        subjects_json = []
        subjects = get_subjects(cookies, unique_session_id, term["code"])

        for idx, subject in enumerate(subjects):
            LOG.debug(
                f"{term['description']}: "
                f"crawling {idx + 1}/{len(subjects)} subjects "
                f"({subject['description']})"
            )

            authenticate_current_session(term, unique_session_id, cookies)

            sched_json = get_schedule_json(subject, term, unique_session_id, cookies)

            if sched_json["data"]:
                subjects_json.append(sched_json["data"])
            else:
                LOG.warning(
                    f"No course data found for subject '{subject['description']}'."
                )

            # New uniqueSessionId is needed for each subject
            unique_session_id = get_unique_session_id(driver)

            if None in (session_id, unique_session_id):
                driver.close()
                return None

        yield subjects_json

    driver.close()


def get_schedule_json(subject, term, unique_session_id, cookies):
    """Gets JSON representation of the subject for the specified term.

    :param subject: The subject in question.
    :param term: The term in question.
    :param unique_session_id: Unique session id generated by the page which
                              allows authentication.
    :param cookies: Cookies of the previous requests.
    """

    payload = {
        "txt_subject": subject["code"],
        "txt_term": term["code"],
        "startDatepicker": "",
        "endDatepicker": "",
        "uniqueSessionId": unique_session_id,
        "pageOffset": "0",
        "pageMaxSize": "100",
        "sortColumn": "subjectDescription",
        "sortDirection": "asc",
    }
    res = requests.get(
        SCHEDULE_URL, headers={"referer": CLASS_URL}, cookies=cookies, params=payload
    )

    return res.json()


def authenticate_current_session(term, unique_session_id, cookies):
    """Make a POST request that will authenticate the user with this JSESSIONID
    and uniqueSessionId and enable the sched_page GET request to return JSON

    :param term: Term dictionary with code and description keys.
    :param unique_session_id: Unique session id generated by the page which
                              allows authentication.
    :param cookies: Cookies of the previous requests.
    """

    payload = {
        "dataType": "json",
        "endDatepicker": "",
        "startDatepicker": "",
        "studyPath": "",
        "studyPathText": "",
        "term": term["code"],
        "uniqueSessionId": unique_session_id,
    }
    requests.post(
        SEARCH_URL, headers={"referer": INIT_URL}, cookies=cookies, params=payload
    )
