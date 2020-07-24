# Imports the Google Cloud client library
import re
from typing import List, Dict, Tuple
import wikipedia

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account
import os
import json

import cv2
import pytesseract
from PIL import Image
from datetime import date


def classify(text) -> str:
    """Classify the input text into categories. """

    cred_dict = json.loads(os.environ['GOOGLE_APPLICATION_CREDENTIALS'])
    credentials = service_account.Credentials.from_service_account_info(
        cred_dict)
    # Instantiates a client
    language_client = language.LanguageServiceClient(
        credentials=credentials)

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
            if (category1 != category2) and \
                    (max_confidence < result[category2]):
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


class Receipt:
    filepath = ""
    date = ""
    items_to_price = {}
    categories_to_price = {}
    categories_to_items = {}

    def __init__(self, filepath):
        self.filepath = filepath
        self.date = date.today()

    def get_data(self) -> None:
        im = Image.open(self.filepath)
        text = pytesseract.image_to_string(im, lang='eng')

        pattern_line = re.compile(r'([A-Za-z ]+).* (\d+\.\d+)')

        items = {}
        for matches_line in pattern_line.findall(text):
            items[matches_line[0]] = float(matches_line[1])

        self.items_to_price = items

    def _find_summaries_wiki(self) -> Dict:
        item_to_summaries = {}
        for item in self.items_to_price:
            try:
                item_to_summaries[item] = wikipedia.summary(item)
            except:
                try:
                    item_to_summaries[item] = wikipedia.summary(item + ' product')
                except Exception as e:
                    try:
                        item_to_summaries[item] = (
                            wikipedia.summary(item + ' to buy'))
                    except:
                        print('Couldn\'t find' + item)
        return item_to_summaries

    def create_categories(self) -> None:
        item_to_summaries = self._find_summaries_wiki()
        item_categories = {}
        for item in item_to_summaries:
            item_categories[item] = classify(item_to_summaries[item])

        for item in item_categories:
            if item_categories[item] in self.categories_to_items[item_categories[item]]:
                self.categories_to_items[item_categories[item]].append(item)
            else:
                self.categories_to_items[item_categories[item]] = [item]

    def calculate_cost(self) -> None:
        for category in self.categories_to_items:
            if category in self.categories_to_price:
                total = 0
                for item in self.categories_to_items[category]:
                    total += self.items_to_price[item]
                self.categories_to_price[category] += total
            else:
                total = 0
                for item in self.categories_to_items[category]:
                    total += self.items_to_price[item]
                self.categories_to_price[category] = total


if __name__ == '__main__':
    receipt = Receipt('/Users/madhurima/PycharmProjects/ReceiptManagement/MainReader/WalmartReceipts/Screenshot 2020-07-20 at 6.01.34 PM.png')
    receipt.filepath = '/Users/madhurima/PycharmProjects/ReceiptManagement/MainReader/WalmartReceipts/Screenshot 2020-07-20 at 6.01.34 PM.png'
    receipt.get_data()
    print(receipt.items_to_price)