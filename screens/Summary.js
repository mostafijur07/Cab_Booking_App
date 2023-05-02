import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const Summary = ({ navigation, route }) => {
  const { pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, distance, duration } = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const location = "Kolkata";

  useEffect(() => {
    if (date && time) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [date, time]);

  const handleDateConfirm = (selectedDate) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);
    const isInvalidDate = selectedDateTime.getTime() < currentDate.setHours(0, 0, 0, 0);
    if (isInvalidDate) {
      alert('Please select a current or future date.');
      setDate('');
    } else {
      const formattedDate = formatDate(selectedDate);
      setDate(formattedDate);
    }
    setDatePickerVisibility(false);
  };
  

  const handleTimeConfirm = (selectedTime) => {
    const formattedTime = formatTime(selectedTime);
    if (isTimeValid(selectedTime)) {
      setTime(formattedTime);
    } else {
      alert('Invalid pickup time! Please select a time that is at least 30 minutes ahead of the current time.');
      setTime('');
    }
    setTimePickerVisibility(false);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };


  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isTimeValid = (selectedTime) => {
    const now = new Date();
    const pickupTime = new Date(selectedTime);
    const minTimeDiff = now.setMinutes(now.getMinutes() + 30);
    return pickupTime.getTime() >= minTimeDiff;
  };
  

  const AddDateTime = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, {
      BookDate: date,
      PickupTime: time,
    });
  }

  const handleNextButton = () => {
    AddDateTime();
    navigation.navigate('Selection', {
      date,
      time,
      pickupLatitude,
      pickupLongitude,
      dropoffLatitude,
      dropoffLongitude,
      distance,
      duration,
      location,
    });
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
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Select Pickup Date And Time
          </Text>
        </View>
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <View style={styles.inputContainer}>
            <Icon name="calendar" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Day of Travel:</Text>
            <Text style={styles.input}>{date || 'Select date'}</Text>
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
          <View style={styles.inputContainer}>
            <Icon name="clock-o" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.label}>Pickup Time:</Text>
            <Text style={styles.input}>{time || 'Select time'}</Text>
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
        />
        {showNextButton && (
          <View style={styles.detailsHeader} onPress={handleNextButton}>
            <Text style={styles.detailsHeaderText}>
              RIDE DETAILS
            </Text>
          </View>
        )}
        {showNextButton && (
          <View style={styles.infoContainer} onPress={handleNextButton}>
            <View style={styles.infoBox}>
              <Icon name="calendar" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Day of Travel:</Text>
              <Text style={styles.info}>{date}</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="clock-o" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Pickup Time:</Text>
              <Text style={styles.info}>{time}</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="car" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Distance:</Text>
              <Text style={styles.info}>{distance} km</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="clock-o" size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={styles.label}>Duration:</Text>
              <Text style={styles.info}>{duration} mins</Text>
            </View>
          </View>
        )}
        {showNextButton && (
          <TouchableOpacity style={[styles.button, showNextButton ? {} : { opacity: 0.5 }]} disabled={!showNextButton} onPress={handleNextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
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
    marginVertical: 20,
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
  header: {
    backgroundColor: "#FFA500",
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "gray",
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 60,
    borderRadius: 10,
    marginTop: 30,
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
  input: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 40,
    elevation: 100,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowOffset: { width: 2, height: 2 },
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

export default Summary;




