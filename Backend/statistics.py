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
        plt.pie(self.prices, labels=self.categories, autopct='%0.1f%%',
                labeldistance=1.3, radius=1.4)
        plt.savefig('Backend/Charts/piechart,png')


    def bar_graphs(self):
        ypos = np.arange(len(self.categories))

        plt.ylabel('Categories', fontsize=8)
        plt.title('Categories Vs Expenditure')
        plt.xticks(ypos, self.categories)
        width = 0.6
        plt.bar(ypos, self.prices, width, capsize=3, color="magenta")

        plt.savefig(filename='Backend/Charts/barchart.png')


class MultipleReceipts:
    receipts_id: List[str]
    id_to_receipt: Dict[str, Receipt]
    categories_to_prices: Dict[str, float]
    id_count: int

    def __init__(self):
        self.receipts_id = []
        self.id_to_receipt = {}
        self.categories_to_prices = {}
        self.id_count = 0

    def create_id(self, receipt) -> str:
        id_receipt = str(self.id_count + 1)
        self.id_count += 1
        self.id_to_receipt[id_receipt] = receipt
        return id_receipt

    def _create_categories(self, receipt) -> None:
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

    def add_receipt(self, filepath) -> str:
        receipt = Receipt(filepath)

        new_id = self.create_id(receipt)
        self.receipts_id.append(new_id)

        self._create_categories(receipt)

        return new_id

    def single_categories_to_prices(self, receipt_id) -> Dict[str, float]:
        return self.id_to_receipt[receipt_id].categories_to_price


if __name__ == '__main__':
    walmart_receipts = MultipleReceipts()
    walmart_receipts.add_receipt(
        "/Users/soumy/PycharmProjects/Thrifty/Backend/WalmartReceipts/5c43798f9d036.image.jpg")
    receipt_stats = Statistics(walmart_receipts.categories_to_prices)
    receipt_stats.pie_chart()
    # receipt_stats.bar_graphs()
    # walmart_receipts.add_receipt("/Users/madhurima/PycharmProjects/ReceiptManagement/Backend/WalmartReceipts/9C5Q9Rt.jpg")
    # receipt_stats = Statistics(walmart_receipts.categories_to_prices)
    # receipt_stats.bar_graphs()
