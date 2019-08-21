import extract
from google.cloud import firestore
import utils
from logger import LOG
from firestore import Firestore, FirestoreBatch
from fmodel import InstructorMgr


def read_instructors():
    instructors = set()
    term_date = None
    json_contents = utils.read_json("./tests/fall2019.json")

    for term in json_contents:
        for discipline in term:
            for course in discipline:
                instructor_name = extract.instructor_name(course)
                instructors.add(instructor_name)
                term_date = extract.term_date(course)

    if not term_date:
        LOG.error("No term was found in the file with JSON.")
        return

    return term_date, instructors


def write_instructors(term_date, instructors):
    # TODO: add term to Instructor, but remove it from to_dict(
    batch = FirestoreBatch()
    collection_ref = Firestore.instructors()
    # document_ref = Firestore.instructors().document(term_date)
    for instructor in instructors:
        record = InstructorMgr.create_instructor(instructor)
        batch.add_collection(collection_ref, record)
        # batch.add_document(document_ref, record)

    batch.commit()
    LOG.debug(f"Wrote {len(instructors)} instructors to Firestore.")


# term_date, instructors = read_instructors()
# write_instructors(term_date, instructors)


def read_all_instructors():
    instructor_refs = list()
    instructors = Firestore.instructors()

    for instructor in instructors.stream():
        instructor_refs.append(instructor.reference)
        print(f"reading instructor")

    return instructor_refs


def update_all_instructors():
    instructors = read_all_instructors()

    for instructor in instructors:
        print("updating instructors")
        instructor.update({"lastName": "Curry"})

    # instructor.reference.update({'foo': 'bar'})


def trans_test():
    # transaction = FirestoreTransaction()
    db = firestore.Client()
    transaction = db.transaction()

    # read instructors
    instructor_refs = list()
    instructors = Firestore.instructors()
    for instructor in instructors.stream():
        instructor_refs.append(instructor.reference)
        print(f"reading instructor")

    # update instructors
    for idx, instructor in enumerate(instructor_refs):
        print("updating instructors")
        transaction.update(instructor, {"lastName": "Curry"})
        if idx % 500 == 0:
            print("\n\ncommitting transaction\n\n")
            transaction.commit()

    transaction.commit()


db = firestore.Client()
transaction = db.transaction()
instructor_ref = db.collection("instructors").document("01LRjTDOqomHi8WOVBix")


@firestore.transactional
def update_in_transaction(transaction, instructor_ref):
    snapshot = instructor_ref.get(transaction=transaction)
    timestamp = snapshot.get("timestamp")
    # print(f"snapshot: {snapshot.to_dict()}")
    print(timestamp)
    print(type(timestamp))
    # transaction.update(instructor_ref, {"lastName": snapshot.get("population") + 1})

    transaction.update(instructor_ref, {"lastName": "Curry"})


result = update_in_transaction(transaction, instructor_ref)

print(f"result: {result}")
