from flask import Flask
app = Flask(__name__)

@app.route('app.py/test', methods = ['GET'])
def test():
    return "{food:ham"


app.run()
