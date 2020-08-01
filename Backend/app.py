from flask import Flask, request, send_file, json
from flask_cors import CORS
from Backend.statistics import *


app = Flask(__name__)
CORS(app)

receipts = MultipleReceipts()

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!', 200


@app.route('/categorize', methods=['POST'])
def categorize():
    file = request.files['receipt']
    file.save('Backend/WalmartReceipts/receipt')
    receipts.add_receipt('Backend/WalmartReceipts/receipt')
    return receipts.categories_to_prices



# 1. Category to prices - Done!
# 1.1 Categories to items
# 2. Pie Chart
# 3. Bar Graph
