import numpy as np
import matplotlib.pyplot as plt

from MainReader.classifytext import *


class Statistics:

    receipt: Receipt
    categories: List[str]
    prices: List[float]

    def __init__(self, receipt):
        self.receipt = receipt
        self.categories = []
        self.prices = []
        self.categories_and_prices()

    def categories_and_prices(self) -> None:
        for category in self.receipt.categories_to_price:
            self.categories.append(category)
            self.prices.append(self.receipt.categories_to_price[category])

    def pie_chart(self):
        plt.pie(self.prices, labels=self.categories, autopct='%0.1f%%')
        plt.show()

    def bar_graphs(self):
        ypos = np.arange(len(self.categories))
        plt.bar(ypos, self.prices, color="magenta")
        plt.xticks(ypos, self.categories)
        plt.ylabel("EXPENDITURE")
        plt.show()


if __name__ == '__main__':
    receipt = Receipt(
        '/Users/madhurima/PycharmProjects/ReceiptManagement/MainReader'
        '/WalmartReceipts/5c43798f9d036.image.jpg')
    receipt.get_data()
    receipt.create_categories()
    receipt.calculate_cost()
    receipt_stats = Statistics(receipt)
    receipt_stats.bar_graphs()
