# Imports the Google Cloud client library
import re
from typing import List, Dict, Tuple, Optional

import numpy as np
import wikipedia

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account
import os
import json
import io

import cv2
import pytesseract
from PIL import Image
from datetime import date
from requests_html import HTMLSession
from bs4 import BeautifulSoup

import urllib


def classify(text) -> Optional[str]:
    """Classify the input text into categories. """

    if len(text.split()) >= 20:
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
            if count < 2 and ch != '/':
                category = category + ch

        return category
    else:
        return None


def _extract_text(lst) -> str:
    for element in lst:
        if isinstance(element, str):
            return element
        elif element.name == 'p':
            return element.contents[0]


class Receipt:
    filepath: str
    date: date
    items_to_price: Dict[str, float]
    categories_to_price: Dict[str, float]
    categories_to_items: Dict[str, List[str]]
    items_to_product_code: Dict[str, str]
    total: float

    def __init__(self, filepath):
        self.filepath = filepath
        self.date = date.today()
        self.items_to_price = {}
        self.categories_to_price = {}
        self.categories_to_items = {}
        self.items_to_product_code = {}
        self.total = 0.0

    def get_data(self) -> None:
        image = cv2.imread(self.filepath, cv2.IMREAD_GRAYSCALE)
        _, image_enhanced = cv2.threshold(image, 180, 255, cv2.THRESH_BINARY)
        image_enhanced = cv2.bilateralFilter(image_enhanced, 9, 75, 75)
        # cv2.imwrite("/Users/madhurima/PycharmProjects/ReceiptManagement/Backend/WalmartReceipts/enhanced_image.png", image_enhanced)
        text = pytesseract.image_to_string(image_enhanced, lang='eng')

        # print(text)
        ignore_items_lst = ['subtotal', 'total', 'tax', 'change', 'tips',
                            'change due', 'tant', 'sub total', 'hst']
        to_ignore = False

        pattern_line = re.compile(r'([A-Za-z][A-Za-z ]*).*(\d{12}).* '
                                  r'(\d+\.\d+)|([A-Za-z][A-Za-z ]*).* '
                                  r'(\d+\.\d+)')

        items = {}
        for matches_line in pattern_line.findall(text):
            # print(matches_line)
            item_name = ''
            prod_id = ''
            price = ''
            if matches_line[0] != '':
                item_name = matches_line[0].strip().lower()
                prod_id = matches_line[1]
                price = float(matches_line[2])
            else:
                item_name = matches_line[3].strip().lower()
                price = float(matches_line[4])

            if item_name not in ignore_items_lst and not to_ignore:
                if item_name not in items:
                    items[item_name] = price
                else:
                    items[item_name] += price
            else:
                to_ignore = True
                if item_name == 'total':
                    self.total += price

            self.items_to_product_code[item_name] = prod_id

        self.items_to_price = items

    def _find_summaries_wiki(self) -> Dict:
        item_to_summaries = {}
        for item in self.items_to_price:
            try:
                item_to_summaries[item] = wikipedia.summary(item)
            except:
                try:
                    item_to_summaries[item] = wikipedia.summary(
                        item + ' product')
                except:
                    try:
                        item_to_summaries[item] = (
                            wikipedia.summary(item + ' to buy'))
                    except:
                        summary = self._find_summary_walmart(item)
                        if summary is not None:
                            item_to_summaries[item] = summary
        return item_to_summaries

    def _find_summary_walmart(self, item) -> Optional[str]:
        prod_id = self.items_to_product_code[item]
        try:
            session = HTMLSession()
            res = session.get(
                'http://www.walmart.com/search/?query=' + prod_id)
            soup = BeautifulSoup(res.html.html, 'html.parser')
            links = soup.find_all('a', {'class': 'product-title-link'})
            if len(links) == 0:
                res = session.get(
                    'http://www.walmart.com/search/?query=' +
                    urllib.parse.quote(item))
                soup = BeautifulSoup(res.html.html, 'html.parser')
                links = soup.find_all('a',
                                      {'class': 'product-title-link'})
            link_str = links[0]['href']
            res_2 = session.get('https://www.walmart.com' + link_str)
            soup_2 = BeautifulSoup(res_2.html.html, 'html.parser')
            divs = soup_2.find_all('div',
                                   {'class': 'about-product-description'})
            contents = divs[0].contents
            return _extract_text(contents)
        except:
            print(item + ' not found on walmart.com')

    def create_categories(self) -> None:
        item_to_summaries = self._find_summaries_wiki()
        item_categories = {}
        for item in item_to_summaries:
            category = classify(item_to_summaries[item])
            if category is not None:
                item_categories[item] = category

        for item in item_categories:
            if item_categories[item] in self.categories_to_items:
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
    receipt = Receipt(
        '/Backend/WalmartReceipts/receipt-ocr-original.jpg.png')
    receipt.get_data()
    receipt.create_categories()
    receipt.calculate_cost()
    print(receipt.categories_to_price)
