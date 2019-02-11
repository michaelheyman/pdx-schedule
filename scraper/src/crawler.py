import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

import logging

logging.basicConfig(level=logging.ERROR, format="%(levelname)s: \t%(message)s")
LOG = logging.getLogger(__name__)


BASE_URL = "https://banweb.pdx.edu/pls/oprd/"
INIT_URL = urljoin(BASE_URL, "bwckschd.p_disp_dyn_sched")
TERM_URL = urljoin(BASE_URL, "bwckgens.p_proc_term_date")
SCHEDULE_URL = urljoin(BASE_URL, "bwckschd.p_get_crse_unsec")
REDIRECT_STRING = "You will be redirected"


def crawl(local=False):
    if local:
        return open_local_file()

    init_page = requests.get(INIT_URL)

    if not init_page.ok:
        LOG.error("Failed to access initial page")
        return None

    soup = BeautifulSoup(init_page.content, "html.parser")

    options = soup.find_all("option")

    if len(options) < 2:
        LOG.error(f"Not enough options ({len(options)} on initial page")
        return None

    latest_term = options[1]
    latest_term_date = str(latest_term["value"])
    latest_term_name = latest_term.get_text().split(" ")[0:2]
    latest_term_name = " ".join(latest_term_name)

    persistence = init_page.cookies["persistence"]
    LOG.info(f"persistence: {persistence}")

    term_page = requests.post(
        TERM_URL,
        headers={"referer": INIT_URL},
        cookies={"persistence": persistence},
        data={
            "p_calling_proc": "bwckschd.p_disp_dyn_sched",
            "p_term": latest_term_date,
        },
    )

    if not term_page.ok:
        LOG.error("Failed to access term page")
        return None
    if REDIRECT_STRING in term_page.text:
        LOG.error("Invalid request sent to term page")
        return None

    term_soup = BeautifulSoup(term_page.content, "html.parser")
    term_list = term_soup.find("select", {"id": "subj_id"})
    term_list = term_list.find_all("option")

    for term in term_list:
        subject = term["value"]
        LOG.debug(subject)

        scrape_page = requests.post(
            SCHEDULE_URL,
            headers={"referer": TERM_URL},
            cookies={"persistence": persistence},
            data=[
                ("term_in", str(latest_term["value"])),
                ("sel_subj", "dummy"),
                ("sel_subj", subject),
                ("sel_day", "dummy"),
                ("sel_schd", "dummy"),
                ("sel_insm", "dummy"),
                ("sel_insm", "%"),
                ("sel_camp", "dummy"),
                ("sel_levl", "dummy"),
                ("sel_levl", "%"),
                ("sel_sess", "dummy"),
                ("sel_instr", "dummy"),
                ("sel_instr", "%"),
                ("sel_ptrm", "dummy"),
                ("sel_attr", "dummy"),
                ("sel_attr", "%"),
                ("sel_crse", ""),
                ("sel_title", ""),
                ("sel_from_cred", ""),
                ("sel_to_cred", ""),
                ("begin_hh", "0"),
                ("begin_mi", "0"),
                ("begin_ap", "a"),
                ("end_hh", "0"),
                ("end_mi", "0"),
                ("end_ap", "a"),
            ],
        )

        if not scrape_page.ok:
            LOG.error(f"Failed to access {subject} schedule page")

        if REDIRECT_STRING in term_page.text:
            LOG.error("Invalid request sent to scrape page")

        yield scrape_page.content, latest_term_name, latest_term_date


def open_local_file():
    try:
        with open("index.html") as fp:
            soup = BeautifulSoup(fp, "html.parser")
            return soup
    except IOError:
        LOG.error("Problem opening index.html file")
