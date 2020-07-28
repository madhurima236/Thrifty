import numpy as np
import matplotlib.pyplot as plt

from Backend.classifytext import *


class Statistics:

    categories_to_price: Dict[str, float]
    categories: List[str]
    prices: List[float]

    def __init__(self, categories_to_price):
        self.categories_to_price = categories_to_price
        self.categories = []
        self.prices = []
        self.categories_and_prices()

    def categories_and_prices(self) -> None:
        for category in self.categories_to_price:
            self.categories.append(category)
            self.prices.append(self.categories_to_price[category])

    def pie_chart(self):
        plt.pie(self.prices, labels=self.categories, autopct='%0.1f%%')
        plt.show()

    def bar_graphs(self):
        ypos = np.arange(len(self.categories))
        plt.bar(ypos, self.prices, color="magenta")
        plt.xticks(ypos, self.categories)
        plt.ylabel("EXPENDITURE")
        plt.show()


class MultipleReceipts:

    receipts: List[Receipt]
    categories_to_prices: Dict[str, float]

    def __init__(self):
        self.receipts = []
        self.categories_to_prices = {}

    def add_receipt(self, filepath):
        receipt = Receipt(filepath)
        receipt.get_data()
        receipt.create_categories()
        receipt.calculate_cost()

        for category in receipt.categories_to_items:
            if category in self.categories_to_prices:
                total = 0
                for item in receipt.categories_to_items[category]:
                    total += receipt.items_to_price[item]
                self.categories_to_prices[category] += total
            else:
                total = 0
                for item in receipt.categories_to_items[category]:
                    total += receipt.items_to_price[item]
                self.categories_to_prices[category] = total

        self.receipts.append(receipt)

if __name__ == '__main__':
    walmart_receipts = MultipleReceipts()
    walmart_receipts.add_receipt("/Users/madhurima/PycharmProjects/ReceiptManagement/Backend/WalmartReceipts/5c43798f9d036.image.jpg")
    receipt_stats = Statistics(walmart_receipts.categories_to_prices)
    receipt_stats.bar_graphs()
    walmart_receipts.add_receipt("/Users/madhurima/PycharmProjects/ReceiptManagement/Backend/WalmartReceipts/9C5Q9Rt.jpg")
    receipt_stats = Statistics(walmart_receipts.categories_to_prices)
    receipt_stats.bar_graphs()
