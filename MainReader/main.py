# Imports the Google Cloud client library
from typing import List
import wikipedia

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account
import os
import json

from google.cloud import language_v1
from google.cloud.language_v1 import enums


def find_summaries_wiki(lst_of_items: List[str]) -> List[str]:
    lst_summaries = []
    for item in lst_of_items:
        try:
            lst_summaries.append(wikipedia.summary(item))
        except:
            try:
                lst_summaries.append(wikipedia.summary(item + ' product'))
            except Exception as e:
                try:
                    lst_summaries.append(wikipedia.summary(item + ' to buy'))
                except:
                    print('Couldn\'t find' + item)
    return lst_summaries


def classify(text, verbose=True):
    """Classify the input text into categories. """

    cred_dict = json.loads(os.environ['GOOGLE_APPLICATION_CREDENTIALS'])
    credentials = service_account.Credentials.from_service_account_info(
        cred_dict)
    # Instantiates a client
    language_client = language.LanguageServiceClient(credentials=credentials)

    document = language.types.Document(
        content=text,
        type=language.enums.Document.Type.PLAIN_TEXT)
    response = language_client.classify_text(document)
    categories = response.categories

    result = {}

    for category in categories:
        # Turn the categories into a dictionary of the form:
        # {category.name: category.confidence}, so that they can
        # be treated as a sparse vector.
        result[category.name] = category.confidence

    if verbose:
        print(text)
        for category in categories:
            print(u'=' * 20)
            print(u'{:<16}: {}'.format('category', category.name))
            print(u'{:<16}: {}'.format('confidence', category.confidence))

    return result


if __name__ == '__main__':
    # text_content = "Jeans are a type of pants or trousers, typically made from denim or dungaree cloth. Often the term 'jeans' refers to a particular style of trousers, called 'blue jeans', which were invented by Jacob W. Davis in partnership with Levi Strauss & Co. in 1871[1] and patented by Jacob W. Davis and Levi Strauss on May 20, 1873. Prior to the Levi Strauss patented trousers, the term 'blue jeans' had been long in use for various garments (including trousers, overalls, and coats), constructed from blue-colored denim."
    # classify(text_content)
    for summary in find_summaries_wiki(['nerds']):
        classify(summary)
