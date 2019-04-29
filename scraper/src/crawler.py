import requests
import time
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
MAX_TERMS = 1
MAX_SUBJECTS = 100


def get_tokens(driver):
    """Returns JSESSIONID and uniqueSessionId needed for receiving a
    successful response from HTTP requests
    """
    driver.get(INIT_URL)
    unique_session_id = driver.execute_script("return sessionStorage.getItem(STORAGE)")

    cookies = driver.get_cookies()
    cookies_dict = {}
    for cookie in cookies:
        cookies_dict[cookie["name"]] = cookie["value"]

    session_id = cookies_dict["JSESSIONID"]

    return session_id, unique_session_id


def get_term_dates(cookies, unique_session_id):
    """Gets list of term dates as a strings in the format YYYYMMDD"""

    payload = {
        "uniqueSessionId": unique_session_id,
        "dataType": "json",
        "searchTerm": "",
        "offset": "1",
        "max": MAX_TERMS,
    }
    res = requests.get(TERMS_URL, cookies=cookies, params=payload)

    terms_dict = res.json()
    term_dates = []

    for term in terms_dict:
        term_dates.append(term["code"])

    return term_dates


def get_subjects(cookies, unique_session_id, term_date):
    """Returns JSON with list of subjects"""

    payload = {
        "uniqueSessionId": unique_session_id,
        "dataType": "json",
        "searchTerm": "",
        "term": term_date,
        "offset": "1",
        "max": MAX_SUBJECTS,
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
    cookies = dict(JSESSIONID=session_id)

    term_dates = get_term_dates(cookies, unique_session_id)

    for term_date in term_dates:
        subjects = get_subjects(cookies, unique_session_id, term_date)

        for subject in subjects:
            payload = {
                "dataType": "json",
                "endDatepicker": "",
                "startDatepicker": "",
                "studyPath": "",
                "studyPathText": "",
                "term": term_date,
                "uniqueSessionId": unique_session_id,
            }
            # Make a POST request that will authenticate the user with this JSESSIONID
            # and uniqueSessionId and enable the sched_page GET request to return JSON
            requests.post(
                SEARCH_URL,
                headers={"referer": INIT_URL},
                cookies=cookies,
                params=payload,
            )

            payload = {
                "txt_subject": subject["code"],
                "txt_term": term_date,
                "startDatepicker": "",
                "endDatepicker": "",
                "uniqueSessionId": unique_session_id,
                "pageOffset": "0",
                "pageMaxSize": "100",
                "sortColumn": "subjectDescription",
                "sortDirection": "asc",
            }
            sched_page = requests.get(
                SCHEDULE_URL,
                headers={"referer": CLASS_URL},
                cookies=cookies,
                params=payload,
            )

            # New JSESSIONID and uniqueSessionId is needed for every subject
            session_id, unique_session_id = get_tokens(driver)

            yield sched_page.json()["data"]

    driver.close()
