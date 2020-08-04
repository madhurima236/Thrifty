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
    r = request
    file = r.files['receipt']
    file.save('Backend/WalmartReceipts/receipt')
    try:
        receipts.add_receipt('Backend/WalmartReceipts/receipt')
        return receipts.categories_to_prices
    except Exception as e:
        return {'error': str(e), 'request': request}, 500


# 1. Category to prices - Done!
# 1.1 Categories to items
# 2. Pie Chart
# 3. Bar Graph

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
