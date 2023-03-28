import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Select = ({ route }) => {
  const { date, time, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, distance, duration, weatherCondition } = route.params;
  const [surgeMultiplier, setSurgeMultiplier] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getSurgeMultiplier = async() => {
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
      const res = await axios.post("http://10.10.62.155:5000/predict", inputData);
      setSurgeMultiplier(res.data.surgeMultiplier);
    }
   
    getSurgeMultiplier();
  }, [route]);

  useEffect(() => {
    if (surgeMultiplier !== null && distance !== null && duration !== null) {
      let baseFare = 25;
      let distanceFare = (parseFloat(distance) * 7).toFixed(2);
      let durationFare = (parseFloat(duration) * 1.2).toFixed(2);
      let surgeFare = (baseFare + parseFloat(distanceFare) + parseFloat(durationFare)) * surgeMultiplier;
      let calculatedPrice = Math.round(surgeFare);
      setPrice(calculatedPrice);
    }
  }, [surgeMultiplier, distance, duration]);
  

  return (
    <View>
      {surgeMultiplier !== null ?
        <Text>Surge Multiplier: {surgeMultiplier}</Text> :
        <Text>Loading surge multiplier...</Text>
      }
      {price !== null ?
        <Text>Price: {price} INR</Text> :
        <Text>Loading price...</Text>
      }
    </View>
  )
}

export default Select;

const styles = StyleSheet.create({});


