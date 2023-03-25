import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import math

def model(Z):
    # Load the dataset and split into training and test sets
    df = pd.read_csv('MyCabBookDataSet.csv')
    X = df[['date', 'time', 'pickupLatitude', 'pickupLongitude', 'dropoffLatitude', 'dropoffLongitude', 'distance', 'duration', 'weatherCondition']]
    y = df['surgeMultiplier']
    X = pd.get_dummies(X, columns=['date', 'time', 'pickupLatitude', 'pickupLongitude', 'dropoffLatitude', 'dropoffLongitude', 'weatherCondition'])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Train a random forest regressor on the training set
    rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_regressor.fit(X_train, y_train)

    # Prepare the input data for prediction
    Z = pd.DataFrame(Z, index=[0])
    Z[['pickupLatitude', 'pickupLongitude', 'dropoffLatitude', 'dropoffLongitude', 'distance', 'duration']] = Z[['pickupLatitude', 'pickupLongitude', 'dropoffLatitude', 'dropoffLongitude', 'distance', 'duration']].astype(float)
    Z = pd.get_dummies(Z, columns=['date', 'time', 'pickupLatitude', 'pickupLongitude', 'dropoffLatitude', 'dropoffLongitude', 'weatherCondition'])
    Z = Z.reindex(columns=X_train.columns, fill_value=0)

    # Make a prediction on the input data
    y_pred = rf_regressor.predict(Z)

    # Return the prediction as a floating-point number rounded to one decimal place
    return round(float(y_pred[0]), 1)


    



