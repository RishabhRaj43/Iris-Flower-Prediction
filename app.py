import pickle 
import warnings


from flask_cors import CORS
from sklearn.datasets import load_iris

from flask import Flask, jsonify, request


app = Flask(__name__)

CORS(app)

warnings.filterwarnings('ignore')


@app.route("/api/predict",methods=["POST"])
def index():
    iris = load_iris()
    data = request.json
    print(data)
    sl = float(data["sepal_length"])
    sw = float(data["sepal_width"]) 
    pl = float(data["petal_length"])
    pw = float(data["petal_width"])
  
  
    if sl<=0 or sw<=0 or pl<=0 or pw<=0:
      return jsonify({"error":"Invalid Input"}),400
  
    if( sl>7.9 or sw>4.4 or pl>6.9 or pw>2.5):
      return jsonify({"error":"Iris Flower is Out of Range"}),400
  
    with open("model.pkl","rb") as f:
      model = pickle.load(f)
  
    try:
      prediction = model.predict([[sl,sw,pl,pw]])
      predicted = iris.target_names[prediction[0]] 
  
      return jsonify({"prediction":predicted})
  
    except Exception as e:
      return jsonify({"error":str(e)}), 500


if(__name__ == "__main__"):
  print("Starting Python Flask Server For Iris Classification")
  app.run(debug=True)