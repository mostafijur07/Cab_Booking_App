import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const Select = ({ navigation, route }) => {
  const { price } = route.params;
  const bookingID = Math.floor(Math.random() * 100000);

  const AddBookId = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, {
      BookingID: bookingID,
    });
  }

  const handleNextButton = () => {
    AddBookId();
    navigation.navigate('HomeScreen', {
      // bookingID,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../Images/AppBackimg.png')} style={styles.image} resizeMode="cover">
      <View style={styles.heading}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={30}  style={{ marginLeft: 10, marginTop: 30 }} />
          </TouchableOpacity>
          <View>
          <Text style={{ fontSize:25,fontWeight:"bold",   marginLeft: 10, marginTop: 40 }}>Back</Text>
          </View>
        </View>
        <View style={styles.detailsHeader}>
            <Text style={styles.detailsHeaderText}>
              BOOKING DETAILS
            </Text>
          </View>
        <View style={styles.infoBooking}>
          <View style={styles.infoBox}>
            <FontAwesome name="bookmark-o" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Booking ID:</Text>
              <Text style={styles.info}>{bookingID}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="inr" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Fare amount:</Text>
              <Text style={styles.info}>{price}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="inr" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Payment Mode:</Text>
              <Text style={styles.info}>By cash</Text>
          </View>
        </View>
        <View style={styles.detailsHeader}>
            <Text style={styles.detailsHeaderText}>
              INFORMATION
            </Text>
          </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            {/* <Text style={styles.label}>Please wait until the car arrives at your pickup location. The driver will give you a call. Kindly show your booking ID to the driver. </Text> */}
            <Text style={styles.label}>Next please go {'['} Home {'] > ['} Profile {'] > ['} My Booking {']'}  </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Thank you for choosing our service. </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNextButton}>
          <Text style={styles.buttonText}>Back To Home</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
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
    height: 100,
    color: '#000',
    backgroundColor: '#FFA500',
  },
  detailsHeader: {
    marginVertical : 10,
    alignItems: 'center',
  },
  detailsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop : 20,
    color: '#000',
    padding: 12,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 30,
    elevation: 100,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowOffset: { width: 2, height: 2 },
  },
  infoBooking: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 30,
    elevation: 100,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowOffset: { width: 2, height: 2 },
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
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
});

export default Select;




