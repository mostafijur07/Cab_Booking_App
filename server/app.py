from flask import Flask, jsonify, request
from flask_cors import CORS
import model

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    # Extract input data from the JSON request
    input_data = request.get_json()
    date = input_data['date']
    time = input_data['time']
    pickupLatitude = input_data['pickupLatitude']
    pickupLongitude = input_data['pickupLongitude']
    dropoffLatitude = input_data['dropoffLatitude']
    dropoffLongitude = input_data['dropoffLongitude']
    distance = input_data['distance']
    duration = input_data['duration']
    weatherCondition = input_data['weatherCondition']

    # Make predictions on the input data
    data = {
        "date": date,
        "time": time,
        "pickupLatitude": pickupLatitude,
        "pickupLongitude": pickupLongitude,
        "dropoffLatitude": dropoffLatitude,
        "dropoffLongitude": dropoffLongitude,
        "distance": distance,
        "duration": duration,
        "weatherCondition": weatherCondition
    }
    y_pred = model.model(data)

    return jsonify({'surgeMultiplier': y_pred})

# main driver function
if __name__ == '__main__':
    app.run(host = '10.10.62.155', port=5000, debug=True)


