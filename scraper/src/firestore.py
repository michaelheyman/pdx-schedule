import config
from google.cloud import firestore
from logger import LOG


class Firestore:
    """Singleton class to access firestore and its collections"""

    __instance = None
    __client = None
    __batch = None
    batch_buffer = list()
    batch_size = 500
    instructor_list = {}

    def __init__(self):
        def on_snapshot(docs, changes, read_time):
            # collection = docs[0].reference.parent # this fails if collections are empty
            for change in changes:
                try:
                    # print(f"change.document: {change.document}")
                    # print(f"change.document.dict: {change.document.to_dict()}") # this is printing {}
                    instructor_name = change.document.get("fullName")
                except KeyError:
                    # pdb.set_trace()
                    print(change.document.to_dict())
                    print("CAUGHT INTIAL EXCEPTION\n\n")
                # print(change.document.get("fullName"))

                """
                if change.type.name == "REMOVED":
                    Firestore.instructor_list.pop(instructor_name)
                    print("Removed: {}".format(change.document.id))
                else:
                    print("Modified: {}".format(change.document.id))
                    Firestore.add_instructor(instructor_name)
                """

                if change.type.name == "ADDED":
                    if instructor_name:
                        Firestore.add_instructor(instructor_name)
                    # print("Added: {}".format(change.document.id))
                elif change.type.name == "MODIFIED":
                    Firestore.instructor_list.pop(instructor_name)
                    # print("Modified: {}".format(change.document.id))
                    # print(change.document.reference.parent.id)
                elif change.type.name == "REMOVED":
                    Firestore.instructor_list.pop(instructor_name)
                    # print("Removed: {}".format(change.document.id))

        if Firestore.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            Firestore.__instance = self
            Firestore.__client = firestore.Client()
            Firestore.__batch = firestore.Client().batch()
            # Firestore.classes().on_snapshot(on_snapshot)
            Firestore.instructors().on_snapshot(on_snapshot)

    @staticmethod
    def client():
        if Firestore.__instance is None:
            Firestore()
        return Firestore.__client

    @staticmethod
    def batch():
        if Firestore.__batch is None:
            Firestore()
        return Firestore.__batch

    @staticmethod
    def initialize():
        def genlen(generator):
            total = sum(1 for _ in generator)
            return total if total > 0 else None

        def delete_collection(coll_ref, batch_size=500):
            """ Remember to batch commit after this """
            docs = coll_ref.stream()
            deleted = 0

            batch = Firestore.client().batch()
            for doc in docs:
                batch.delete(doc.reference)
                deleted = deleted + 1

                if deleted % batch_size == 0:
                    print("reached batch limit, committing")
                    batch.commit()

            if deleted == 0:
                print("No documents found to delete.")
            # elif deleted % batch_size != 0:
            #     print(f"Batch committing leftover {deleted % batch_size} docs")
            #     batch.commit()

            print(f"Deleted {deleted} docs")

        if Firestore.__instance is None:
            Firestore()

        classes_ref = Firestore.classes()

        # TODO: find a way around this
        if not genlen(classes_ref.list_documents()):
            LOG.info("There were no documents in the classes collection")
            return

        refreshed_terms = list()
        [
            refreshed_terms.append(elem)
            for elem in classes_ref.limit(config.MAX_TERMS)
            .order_by("date", direction="DESCENDING")
            .stream()
        ]

        for term in refreshed_terms:
            for coll in term.reference.collections():
                delete_collection(coll)

        print("\n\n\nFINAL COMMIT\n\n\n")
        Firestore.batch().commit()

    @staticmethod
    def classes():
        return Firestore.client().collection("classes")

    @staticmethod
    def instructors():
        return Firestore.client().collection("instructors")

    # https://github.com/GoogleCloudPlatform/python-docs-samples/blob/38ccb43060225fe61f99f53ff4dccc2ceeffd84f/firestore/cloud-client/snippets.py#L803
    @staticmethod
    def commit():
        print("\n\nCOMMIT explicitely called\n\n")
        for elem in Firestore.batch_buffer:
            document = elem["document"]
            data = elem["data"]
            Firestore.batch().set(document, data)

        Firestore.batch_buffer = list()
        Firestore.batch().commit()

    @staticmethod
    def add_class(term, document_data):
        buffer = Firestore.batch_buffer

        term_ref = Firestore.classes().document(term.date)
        subject_ref = term_ref.collection(term.subject)

        new_document = subject_ref.document()
        Firestore.batch_buffer.append({"document": new_document, "data": document_data})

        if len(buffer) >= 500:
            print(f"Committing batch buffer from add_class -- was full")
            Firestore.commit()

    @staticmethod
    def add_instructor(name):
        if name not in Firestore.instructor_list.keys():
            # print(f"new instructor: {name}")
            Firestore.instructor_list[name] = Firestore.instructors().document()
        # else:
        #     print(f"old instructor: {name}")
        return Firestore.instructor_list[name].path

    # @staticmethod
    # def load_instructors():
    #     for instructor in Firestore.instructors().stream():
    #         Firestore.instructors_list[instructor.get("fullName")] = instructor


"""
Firestore.instructors().document("00xPEGljmSIaLhbqvujr").set(
    {"fullName": "Ken Selden", "foo": "bar"}
)
Firestore.instructors().document("00xPEGljmSIaLhbqvujr").set(
    {"fullName": "Ken Selden", "baz": "qux"}
)

import time

time.sleep(3)
print(Firestore.instructor_list)
"""
