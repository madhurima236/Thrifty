from flask import Flask, redirect, render_template, request, send_file, json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!', 200

@app.route('/categorize', methods=['POST'])
def categorize():
    file = request.files['receipt']


# 1. Category to items
# 2. Pie Chart
# 3. Bar Graph
