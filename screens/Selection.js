import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Selection = ({ route, navigation }) => {
  const { date, time, location, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } = route.params;
  const [weatherCondition, setWeatherCondition] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  // prepare input data

  useEffect(() => {

    // Calculate distance using haversine formula
    const toRadians = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(dropoffLatitude - pickupLatitude);
    const dLon = toRadians(dropoffLongitude - pickupLongitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(pickupLatitude)) *
        Math.cos(toRadians(dropoffLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c;
    setDistance(distanceInKm.toFixed(2));

    // Calculate ride duration
    const durationInHours = distanceInKm / 30;
    const durationInMinutes = durationInHours * 60;
    setDuration(durationInMinutes.toFixed(2));    
    
    const formattedDate = date.split('/').reverse().join('-');
    const formattedTime = time.replace(' ', '');

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=7b3d96abb616e47159a5c5c6b968767c`)
      .then(response => {
        const weather = response.data.weather[0].main;
        setWeatherCondition(weather);
      })
      .catch(error => {
        console.log(error);
      });
  }, [date, time, location, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude]);

const onPressConfirm = () => {
  navigation.navigate('Select', {
  date,
  time,
  pickupLatitude,
  pickupLongitude,
  dropoffLatitude,
  dropoffLongitude,
  distance,
  duration,
  weatherCondition
  });
  };

  return (
    <View>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
      <Text>Location: {location}</Text>
      <Text>Pickup Latitude: {pickupLatitude}</Text>
      <Text>Pickup Longitude: {pickupLongitude}</Text>
      <Text>Dropoff Latitude: {dropoffLatitude}</Text>
      <Text>Dropoff Longitude: {dropoffLongitude}</Text>
      <Text>Ride Distance: {distance} km</Text>
      <Text>Ride Duration: {duration} minutes</Text>
      <Text>Weather Condition: {weatherCondition}</Text>
      <Button title="Confirm" onPress={onPressConfirm} />
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({});


