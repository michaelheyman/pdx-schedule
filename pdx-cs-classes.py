from bs4 import BeautifulSoup
import requests
import course
import instructor
import pprint

pp = pprint.PrettyPrinter(indent=4)

TITLE_CLASS   = 'ddtitle'
DEFAULT_CLASS = 'dddefault'
rmp_url = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=20&q={0}+AND+schoolid_s%3A775&defType=edismax&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=20&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s&fq='

courses = list()
instructors = list()

def get_paired_sibling(header):
    return header.parent.next_sibling.next_sibling

def get_instructor(course_info_table):
    return course_info_table.find_all('td', DEFAULT_CLASS)[-1].get_text()[0:-3]

def get_course_info(full_title):
    first_delimiter = full_title.index(' - ')
    second_delimiter = full_title.index(' - ', first_delimiter + 1)
    third_delimiter = full_title.index(' - ', second_delimiter + 1)

    name = full_title[0: first_delimiter]
    crn = full_title[first_delimiter + 3: second_delimiter]
    number = full_title[second_delimiter + 3: third_delimiter]

    return name, crn, number

def get_rmp_json(instructor_name):
    url = rmp_url.format(instructor_name.replace(' ', '+'))
    r = requests.get(url)
    return r.json()

def parse_rmp_json(data):
    if data['response']['numFound'] == 1:
        rmp_id = data['response']['docs'][0]['pk_id']
        rating = data['response']['docs'][0]['averageratingscore_rf']
        first_name = data['response']['docs'][0]['teacherfirstname_t']
        last_name = data['response']['docs'][0]['teacherlastname_t']
        name = f"{first_name} {last_name}"
        return rmp_id, rating, name

    return None
    

with open('index.html') as fp:
    soup = BeautifulSoup(fp, 'html.parser')

test_title = soup.find('th', TITLE_CLASS)
test_course = get_paired_sibling(soup.find('th', TITLE_CLASS))

#print(get_course_info(test_title.string))

#c1 = course.Course('CS', 123, 'person', 'www.google.com')
#print(c1)

for elem in soup.find_all('th', TITLE_CLASS):
    name, crn, number = get_course_info(elem.string)
    instructor = get_instructor(get_paired_sibling(elem))
    courses.append(course.Course(name, number, crn, instructor, ''))

for course in courses:
    print(course)

print(len(courses))
