import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const Summary = ({ navigation, route }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    // Check if all three fields are filled up
    if (date && time && location) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [date, time, location]);

  const handleDateConfirm = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };

  const handleTimeConfirm = (selectedTime) => {
    const formattedTime = formatTime(selectedTime);
    setTime(formattedTime);
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

  const handleNextButton = () => {
    // Check if all three fields are filled up before navigating
    if (date && time && location) {
      const { pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } = route.params;
      navigation.navigate('Selection', {
        date,
        time,
        location,
        pickupLatitude,
        pickupLongitude,
        dropoffLatitude,
        dropoffLongitude,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#666" style={{ marginRight: 10 }} />
          <Text style={styles.label}>Day of Travel:</Text>
          <Text style={styles.input}>{date || 'Select a date'}</Text>
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
          <Text style={styles.label}>Time of Travel:</Text>
          <Text style={styles.input}>{time || 'Select a time'}</Text>
        </View>
        </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />
      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color="#666" style={{ marginRight: 10 }} />
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a location"
          onChangeText={(text) => setLocation(text)}
          value={location}
        />
      </View>
      {showNextButton && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
},
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
},
label: {
fontWeight: 'bold',
marginRight: 10,
},
input: {
flex: 1,
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 4,
padding: 10,
},
nextButton: {
backgroundColor: '#007AFF',
borderRadius: 4,
padding: 10,
alignItems: 'center',
marginTop: 20,
},
nextButtonText: {
color: '#fff',
fontWeight: 'bold',
},
});

export default Summary;