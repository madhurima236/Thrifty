# Imports the Google Cloud client library
import re
from typing import List, Dict, Tuple

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
    total = 0.0

    def __init__(self, filepath):
        self.filepath = filepath
        self.date = date.today()

    def get_data(self) -> None:
        image = cv2.imread(self.filepath, cv2.IMREAD_GRAYSCALE)
        _, image_enhanced = cv2.threshold(image, 180, 255, cv2.THRESH_BINARY)
        image_enhanced = cv2.bilateralFilter(image_enhanced, 9, 75, 75)
        # cv2.imwrite("/Users/madhurima/PycharmProjects/ReceiptManagement/MainReader/WalmartReceipts/enhanced_image.png", image_enhanced)
        text = pytesseract.image_to_string(image_enhanced, lang='eng')

        print(text)
        ignore_items_lst = ['subtotal', 'total', 'tax', 'change', 'tips',
                            'change due', 'tant', 'sub total', 'hst']
        to_ignore = False

        pattern_line = re.compile(r'([A-Za-z][A-Za-z ]*).*(\d{12}?).* (\d+\.\d+)')

        items = {}
        for matches_line in pattern_line.findall(text):
            print(matches_line)
            if matches_line[0].strip().lower() not in ignore_items_lst and not to_ignore:
                if matches_line[0].strip() not in items:
                    items[matches_line[0].strip()] = float(matches_line[2])
                else:
                    items[matches_line[0].strip()] += float(matches_line[2])
            else:
                to_ignore = True
                if matches_line[0].strip().lower() == 'total':
                    self.total += float(matches_line[2])

            if matches_line[1] != '':
                try:
                    session = HTMLSession()
                    print('http://www.walmart.com/search/?query=' + matches_line[1])
                    res = session.get('http://www.walmart.com/search/?query=' + matches_line[1])
                    soup = BeautifulSoup(res.html.html, 'html.parser')
                    links = soup.find_all('a', {'class': 'product-title-link'})
                    if len(links) == 0:
                        print('http://www.walmart.com/search/?query=' +
                              urllib.parse.quote(matches_line[0].strip()))
                        res = session.get(
                            'http://www.walmart.com/search/?query=' +
                            urllib.parse.quote(matches_line[0].strip()))
                        soup = BeautifulSoup(res.html.html, 'html.parser')
                        links = soup.find_all('a',
                                              {'class': 'product-title-link'})
                    link_str = links[0]['href']
                    res_2 = session.get('https://www.walmart.com' + link_str)
                    soup_2 = BeautifulSoup(res_2.html.html, 'html.parser')
                    divs = soup_2.find_all('div', {'class': 'about-product-description'})
                    contents = divs[0].contents
                    text = self._extract_text(contents)
                    print(classify(text))
                except:
                    print(matches_line[0] + ' not found on walmart.com')

        self.items_to_price = items

    def _extract_text(self, lst):
        for element in lst:
            if isinstance(element, str):
                return element
            elif element.name == 'p':
                return element.contents[0]

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
    receipt = Receipt('/Users/AdvayaGupta/Desktop/Coding/Thrifty/MainReader/WalmartReceipts/receipt-ocr-original.jpg.png')
    receipt.get_data()
    print(receipt.items_to_price)
    print(receipt.total)
