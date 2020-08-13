import ast
from typing import Any

from flask import Flask, request, send_file, json
from flask_cors import CORS
from Backend.statistics import *
import os

my_path = os.path.dirname(__file__)

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


@app.route('/single_categorize', methods=['POST'])
def single_categorize():
    req = request
    req_body = ast.literal_eval(req.data.decode('UTF-8'))
    receipt_id = req_body['receipt_id']
    return receipts.single_categories_to_prices(receipt_id)


@app.route('/pie', methods=['POST'])
def pie_chart():
    stats = Statistics(receipts.categories_to_prices)
    stats.pie_chart()
    return send_file(my_path + '/Charts/piechart.png',
                     attachment_filename='pie_chart.png')


@app.route('/single_pie', methods=['POST'])
def single_pie_chart():
    req = request
    req_body = ast.literal_eval(req.data.decode('UTF-8'))
    receipt_id = req_body['receipt_id']
    stats = Statistics(receipts.single_categories_to_prices(receipt_id))
    stats.pie_chart()
    return send_file(my_path + '/Charts/piechart.png')


@app.route('/bar', methods=['POST'])
def bar_graph():
    stats = Statistics(receipts.categories_to_prices)
    stats.bar_graphs()
    return send_file(my_path + '/Charts/barchart.png',
                     attachment_filename='bar_chart.png')


@app.route('/single_bar', methods=['POST'])
def single_bar_graph():
    req = request
    req_body = ast.literal_eval(req.data.decode('UTF-8'))
    receipt_id = req_body['receipt_id']
    stats = Statistics(receipts.single_categories_to_prices(receipt_id))
    stats.bar_graphs()
    return send_file(my_path + '/Charts/barchart.png')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
