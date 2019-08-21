import requests
import time
import config
from logger import LOG
from pyppeteer import launch
from urllib.parse import urljoin
import json


BASE_URL = "https://app.banner.pdx.edu/StudentRegistrationSsb/ssb/"
INIT_URL = urljoin(BASE_URL, "term/termSelection?mode=search")
CLASS_URL = urljoin(BASE_URL, "classSearch/classSearch")
TERMS_URL = urljoin(BASE_URL, "classSearch/getTerms")
SEARCH_URL = urljoin(BASE_URL, "term/search?mode=search")
SCHEDULE_URL = urljoin(BASE_URL, "searchResults/searchResults")
SUBJECTS_URL = urljoin(BASE_URL, "classSearch/get_subject")


async def get_tokens(browser):
    """Returns JSESSIONID and uniqueSessionId needed for receiving a
    successful response from HTTP requests.

    :param browser: Instantiated pyppeteer browser
    :returns: The JSESSIONID and uniqueSessionId
    """
    page = await browser.newPage()
    await page.goto(INIT_URL)

    session_id = await get_jsession_id(page)
    unique_session_id = await get_unique_session_id(page)

    return session_id, unique_session_id


async def get_jsession_id(page):
    cookies = await page.cookies(INIT_URL)
    cookies = {cookie["name"]: cookie["value"] for cookie in cookies}

    return cookies["JSESSIONID"]


async def get_unique_session_id(page):
    unique_session_id = await page.evaluate("sessionStorage.getItem(STORAGE)")

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


async def initialize_browser():
    """Initializes pyppeteer browser with options. Doesn't open or close browser,
    that responsibility is left to the caller.
    """
    args = [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--ignore-certificate-errors",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--single-process",
    ]
    browser = await launch(args=args, headless=True)

    return browser


async def get_page(browser):
    page = await browser.newPage()
    await page.goto(INIT_URL)
    return page


async def crawl():
    browser = await initialize_browser()

    page = await get_page(browser)
    session_id, unique_session_id = await get_tokens(browser)

    if None in (session_id, unique_session_id):
        browser.close()
        yield None
        return

    cookies = dict(JSESSIONID=session_id)
    terms = get_terms(cookies, unique_session_id)

    for term in terms:
        subjects_json = []
        subjects = get_subjects(cookies, unique_session_id, term["code"])

        for idx, subject in enumerate(subjects):
            # Short circuit the loop
            if idx > 2:
                continue

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
            unique_session_id = await get_unique_session_id(page)

            if None in (session_id, unique_session_id):
                browser.close()
                yield None
                return

        yield subjects_json

    await browser.close()


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


def write_json(data):
    print("PRINTING TO FILE")
    with open("data.json", "a") as outfile:
        json.dump(data, outfile)


def read_json(filename):
    lst = []
    # with open("../data.json", "r") as file:
    with open(filename, "r") as file:
        content = file.read()
        print(f"type: {content}")
        # print(f"contents: {content}")
        lst = json.loads(content)

    print(lst)
