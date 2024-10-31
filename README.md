# 🚖 Cab Booking App

## 📜 Project Description
This project is a cab booking application developed using **React Native** and **Expo**. It incorporates a machine learning-based surge price prediction system to accurately forecast prices within the application. The system utilizes the **OpenWeatherMap API** for real-time weather data, enhancing the user experience. Additionally, the app integrates the **OpenRouteService API** and **React Native Maps** for efficient route planning and navigation. Secure user authentication and database functionality are provided by **Firebase**.

The app simplifies cab booking with a user-friendly interface, allowing users to book a cab in five easy steps. This project offers a comprehensive convenient and efficient cab booking solution with robust features and reliable functionalities.

---
## 📑 Table of Contents
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [Surge Price Prediction Model](#-surge-price-prediction-model)
- [Getting Started](#-getting-started)
- [License](#-license)

---
## ✨ Features
- **User Authentication:** Secure login and registration with Firebase.
- **Real-Time Price Prediction:** Surge price prediction using machine learning and weather data.
- **Current Weather Data Fetch:** Using OpenWeatherMap api.
- **Route Planning:** Efficient route planning and navigation with OpenRouteService API and React Native Maps.
- **Seamless User Experience:** Book a cab in five steps with a clean and intuitive UI.
- **Data Storage:** User and booking information stored securely in Firebase.

---
## 🗂️ Folder Structure 
### Screens Folder
1. `LoginScreen.js` - Login screen with Firebase Auth.
2. `RegScreen.js` - Registration screen to store user info in Firebase.
3. `HomeScreen.js` - Home page.
4. `MapScreen.js` - Displays map for route selection.
5. `Selection.js` - Date and time selection.
6. `Select.js` - Shows predicted fare and available cars for booking.
7. `Summary.js` - Displays final booking details.
8. `BookDetailsScreen.js` - Shows booking history.

### Server Folder
- Contains the Machine Learning model and dataset.

### Configuration Files
- `App.js` - Links all screens.
- `FirebaseConfig.js` - Contains Firebase configuration.
- `.env` - Stores API keys and sensitive information.

---
## 🖼 Screenshots

Below are screenshots of the app's main screens:

| Login Screen                                   | Registration Screen                          |
|------------------------------------------------|----------------------------------------------|
| ![Login Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/Login.jpg)   | ![Registration Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/Reg.jpg) |

| Home Screen                                    | Map Screen                                   |
|------------------------------------------------|----------------------------------------------|
| ![Home Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/HomePage.jpg) | ![Map Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/Map.jpg) |

| Selection Screen                               | Prediction Screen                            |
|------------------------------------------------|----------------------------------------------|
| ![Selection Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/Selection.jpg) | ![Prediction Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/Select.jpg) |

| Summary Screen                                 | Booking Details Screen                       |
|------------------------------------------------|----------------------------------------------|
| ![Summary Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/Summary.jpg) | ![Booking Details Screen](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/BookDetails.jpg) |

---
## 🔍 Surge Price Prediction Model
- This project includes a surge price prediction system built using a Random Forest Regressor in Python. The system predicts the surge multiplier for cab fares in Kolkata based on various factors such as date, time, location, distance, duration, and weather.

### Model Overview
The model leverages a Random Forest Regressor algorithm, known for handling nonlinear data. The model was trained on a dataset of over 1,000 rows of historical data. By analyzing the dataset’s features, the model predicts the surge multiplier, allowing users to understand how external factors affect pricing.

### Key Components of the Model
1. **Features and Target:**
  - Features (X): date, time, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, distance, duration, weatherCondition
  - Target (y): surgeMultiplier
2. **Data Preprocessing:**
  - One-Hot Encoding for categorical features.
  - Train-Test Split (70% training, 30% testing).

### Dataset
The dataset contains detailed cab booking data for the city of Kolkata. It includes 1,000 rows, each representing an individual booking instance, and provides the following attributes:
1.**Date and Time:** Specifies when the booking was made.
2.**Pickup and Drop-off Locations:** Latitude and longitude coordinates for both the pickup and drop-off points.
3.**Distance and Duration:** Indicates the travel distance and estimated time for each trip.
4.**Weather Condition:** Captures the prevailing weather conditions at the time of booking.
5.**Surge Multiplier:** The target variable indicating the surge multiplier, which adjusts based on various factors such as time, location, and weather.
This dataset is utilized to train the machine learning model, enabling it to predict surge pricing accurately by analyzing patterns and correlations among these attributes.

### Model Training:
Random Forest with 100 decision trees.

### Model Evaluation:
**Metrics:**
- Mean Absolute Error (MAE): 0.1328
- Mean Squared Error (MSE): 0.0255
- Root Mean Squared Error (RMSE): 0.1598
- R² Score: 0.69

These results indicate reasonable accuracy, explaining 69% of the variance in surge pricing.

### 📊 Data Visualization

Below are the visualizations generated from the dataset analysis:

| Surge Multiplier Distribution                 | Actual vs. Predicted Comparison               |
|-----------------------------------------------|-----------------------------------------------|
| ![Surge Multiplier Distribution](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/SurgeMultiplierDistribution.png) | ![Actual vs. Predicted Comparison](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/ActualVsPredicted.png) |

| Scatter Plot of Actual vs. Predicted          |
|-----------------------------------------------|
| ![Scatter Plot of Actual vs. Predicted](https://github.com/mostafijur07/Cab_Booking_App/blob/master/Screenshots/RandomForestRegressor.png) |

---
## 🚀 Getting Started
---
To Create A Blank React-Native Project
1. sudo apt install nodejs npm
2. sudo npm install -g expo-cli
3. expo init <Folder Name> # Name of the app. For Example: cab_book. The project folder will be created in the current directory.
4. Select Blank
5. npm start
   
---
To set up a cloned React Native and Expo project, we need to install the necessary dependencies and development environment.
1. Install Node.js and npm: Download and install Node.js, which includes npm (Node Package Manager), if it isn’t installed.
2. Install Expo CLI: Run the following command in your terminal to install the Expo CLI globally.
   npm install -g expo-cli
3. Clone the Project From GitHub: Open a terminal in the directory where you want to place the project and run:
   git clone <your-github-repo-url>
4. Navigate to the Project Directory: Use the terminal to navigate into the cloned project folder:
   cd your-project-folder
5. Install Project Dependencies: Run the following command to install all the dependencies listed in the package.json file:
   npm install
   If you want to install dependencies one at a time: Run the following command:
   npm install <dependencies name>
   For Example: npm install axios
6. Now run the project:
   npm start.
   
---

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.


