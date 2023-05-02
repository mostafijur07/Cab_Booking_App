import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Pressable, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const BookDetailsScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [bookingID, setBookingID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetUserData = async () => {
      setLoading(true);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserName(docSnap.data().UserName);
        setBookingID(docSnap.data().BookingID);
        setPhoneNumber(docSnap.data().PhoneNumber);
        setDate(docSnap.data().BookDate);
        setTime(docSnap.data().PickupTime);
        setLoading(false);
      }
    }
    GetUserData();
  }, []);

  const handleNextButton = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
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
            BOOKING CONFIRMATION
          </Text>
        </View>
        <View style={styles.infoBooking}>
          <View style={styles.infoBox}>
            <FontAwesome name="user-circle-o" size={20} style={{ marginRight: 10 }} />
            <Text style={styles.label}>User Name:</Text>
            <Text style={styles.info}>{userName}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="phone" size={20} style={{ marginRight: 10 }} />
            <Text style={styles.label}>Contact Number:</Text>
            <Text style={styles.info}>{phoneNumber}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="bookmark-o" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.info}>{bookingID}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="calendar" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Day of Travel:</Text>
            <Text style={styles.info}>{date}</Text>
          </View>
          <View style={styles.infoBox}>
            <FontAwesome name="clock-o" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Pickup Time:</Text>
            <Text style={styles.info}>{time}</Text>
          </View>
        </View>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsHeaderText}>
            INFORMATION
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Please wait until the car arrives at your pickup location. The driver will give you a call. </Text>
          </View>
          <View>
            <Text style={styles.label}>Kindly show your booking confirmation to the driver.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNextButton}>
          <Text style={styles.buttonText}>Back To Home</Text>
        </TouchableOpacity>
        <Modal visible={loading} transparent={true} animationType='none'>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  )
}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
export default BookDetailsScreen

