import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {WEATHER_API_KEY} from "@env";

const Selection = ({ route, navigation }) => {
  const { date, time, location, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, distance, duration } = route.params;
  const [weatherCondition, setWeatherCondition] = useState('');
  const [surgeMultiplier, setSurgeMultiplier] = useState(null);
  const [surgeFare, setSurgeFare] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [price, setPrice] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseFare = 25;
  const distanceFare = (parseFloat(distance) * 7).toFixed(2);
  const durationFare = (parseFloat(duration) * 1.2).toFixed(2);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_API_KEY}`)
      .then(response => {
        const weather = response.data.weather[0].main;
        setWeatherCondition(weather);
      })
      .catch(error => {
        console.log(error);
      });
  }, [location]);

  useEffect(() => {
    const getSurgeMultiplier = async () => {
      setLoading(true);
      const inputData = {
        date,
        time,
        pickupLatitude,
        pickupLongitude,
        dropoffLatitude,
        dropoffLongitude,
        distance,
        duration,
        weatherCondition,
      };
      const res = await axios.post("http://192.168.138.24:5000/predict", inputData);
      setSurgeMultiplier(res.data.surgeMultiplier);
      setLoading(false);
    }
    getSurgeMultiplier();
  }, [route]);

  useEffect(() => {
    if (surgeMultiplier !== null && distance !== null && duration !== null) {
      let surgeFare = (baseFare + parseFloat(distanceFare) + parseFloat(durationFare)) * surgeMultiplier;
      let calculatedPrice = Math.round(surgeFare);
      setSurgeFare(surgeFare);
      setCalculatedPrice(calculatedPrice);
      setPrice(calculatedPrice);
    }
  }, [surgeMultiplier]);

  const handleBookingConfirmation = () => {
    setIsBookingConfirmed(true);
    navigation.navigate('Select', {
      price,
    });
  }

  const handleOptionSelection = () => {
    setIsOptionSelected(!isOptionSelected);
    setIsBookingConfirmed(false);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../Images/AppBackimg.png')} style={styles.image} resizeMode="cover">
        <View style={styles.heading}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={30} style={{ marginLeft: 10, marginTop: 30 }} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 10, marginTop: 40 }}>Back</Text>
          </View>
        </View>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsHeaderText}>
            FARE DETAILS
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <View>
              <Text style={styles.label}>Currently weather condition in kolkata:</Text>
              <Text style={styles.info}>{weatherCondition}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="inr" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Distance Fare:</Text>
            <Text style={styles.info}>{distanceFare}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="inr" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Duration Fare:</Text>
            <Text style={styles.info}>{durationFare}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="times" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Surge Multiplier:</Text>
            <Text style={styles.info}>{surgeMultiplier}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="inr" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Total Fare:</Text>
            <Text style={styles.info}>{calculatedPrice}</Text>
          </View>
        </View>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsHeaderText}>
            SELECT CAB
          </Text>
        </View>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={require('../Images/CAR.png')}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Taxi</Text>
            <Text style={styles.cardSubtitle}> <FontAwesome name="inr" size={15} color="#666" style={{ marginRight: 10 }} /> {price}</Text>
            {price != null && (
              <CheckBox
                title='Select'
                checked={isOptionSelected}
                onPress={handleOptionSelection}
              />
            )}
          </View>
        </View>
        {isOptionSelected && !isBookingConfirmed && (
          <TouchableOpacity style={styles.button} onPress={handleBookingConfirmation}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        )}
        <Modal visible={loading} transparent={true} animationType='none'>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    fontSize: 40,
    fontWeight: 'bold',
    height: 90,
    color: '#000',
    backgroundColor: '#FFA500',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsHeader: {
    marginVertical: 10,
    alignItems: 'center',
  },
  detailsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
    padding: 12,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 100,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowOffset: { width: 2, height: 2 },
    marginHorizontal: 30,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    width: 335,
    padding: 10,
  },
  cardImage: {
    width: 100,
    height: 80,
  },
  cardText: {
    marginLeft: 60,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 100,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 16
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});


export default Selection;