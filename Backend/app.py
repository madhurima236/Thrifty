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


@app.route('/upload', methods=['POST'])
def upload_receipt():
    img_file = request.files['receipt']
    img_file.save('Backend/WalmartReceipts/receipt')
    try:
        receipt_id = receipts.add_receipt('Backend/WalmartReceipts/receipt')
        return {'receipt_id': receipt_id}
    except Exception as e:
        return {'error': str(e), 'request': request}, 500


@app.route('/categorize', methods=['POST'])
def categorize_prices() -> Any:
    return receipts.categories_to_prices


@app.route('/pie', methods=['POST'])
def pie_chart():
    stats = Statistics(receipts.categories_to_prices)
    stats.pie_chart()


@app.route('/bar', methods=['POST'])
def bar_graph():
    stats = Statistics(receipts.categories_to_prices)
    stats.bar_graphs()


# 1. Category to prices - Done!
# 1.1 Categories to items
# 2. Pie Chart
# 3. Bar Graph

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
