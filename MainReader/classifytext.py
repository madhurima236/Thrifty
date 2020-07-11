# Imports the Google Cloud client library
from typing import List, Dict, Tuple
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


def classify(text, verbose=True) -> str:
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

    item_category = ''

    for category1 in result:
        max_confidence = result[category1]
        item_category = category1
        for category2 in result:
            if (category1 != category2) and max_confidence < result[category2]:
                item_category = category2
                max_confidence = result[category2]

    count = 0
    category = ''

    for ch in item_category:
        if ch == "/":
            count += 1
        if count < 2:
            category = category + ch

    return category


def create_categories(lst_of_items: List[str]) -> Dict:
    lst_of_summaries = find_summaries_wiki(lst_of_items)
    lst_item_categories = {}
    for i in range(len(lst_of_items)):
        lst_item_categories[lst_of_items[i]] = classify(lst_of_summaries[i])
    return lst_item_categories


if __name__ == '__main__':
    lst_item_categories = create_categories(
        ['garlic bread', 'water', 'cadbury'])
    for item in lst_item_categories:
        print(item + ":" + lst_item_categories[item])
