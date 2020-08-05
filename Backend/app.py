from typing import Any

from flask import Flask, request, send_file, json
from flask_cors import CORS
from Backend.statistics import *

app = Flask(__name__)
CORS(app)

receipts = MultipleReceipts()


@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!', 200


@app.route('/upload_receipt', methods=['POST'])
def upload_receipt():
    img_file = request.files['receipt']
    img_file.save('Backend/WalmartReceipts/receipt')
    receipts.add_receipt('Backend/WalmartReceipts/receipt')


@app.route('/categorize_prices', methods=['POST'])
def categorize_prices() -> Any:
    upload_receipt()
    try:
        return receipts.categories_to_prices
    except Exception as e:
        return {'error': str(e), 'request': request}, 500


@app.route('/pie_chart', methods=['POST'])
def pie_chart():
    categories_to_prices = categorize_prices()
    if type(categories_to_prices) is str:
        print(categories_to_prices)
    else:
        stats = Statistics(categories_to_prices)
        stats.pie_chart()


@app.route('/bar_graph', methods=['POST'])
def bar_graph():
    categories_to_prices = categorize_prices()
    if type(categories_to_prices) is str:
        print(categories_to_prices)
    else:
        stats = Statistics(categories_to_prices)
        stats.bar_graphs()


# 1. Category to prices - Done!
# 1.1 Categories to items
# 2. Pie Chart
# 3. Bar Graph

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
