import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
  const [pickupLatitude, setPickupLatitude] = useState(null);
  const [pickupLongitude, setPickupLongitude] = useState(null);
  const [dropoffLatitude, setDropoffLatitude] = useState(null);
  const [dropoffLongitude, setDropoffLongitude] = useState(null);
  const navigation = useNavigation();

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    if (!pickupLatitude && !pickupLongitude) {
      setPickupLatitude(parseFloat(latitude.toFixed(4)));
      setPickupLongitude(parseFloat(longitude.toFixed(4)));
    } else if (!dropoffLatitude && !dropoffLongitude) {
      setDropoffLatitude(parseFloat(latitude.toFixed(4)));
      setDropoffLongitude(parseFloat(longitude.toFixed(4)));
    }
  };

  const handleNextPress = () => {
    if (pickupLatitude && pickupLongitude && dropoffLatitude && dropoffLongitude) {
      navigation.navigate('Summary', {
        pickupLatitude,
        pickupLongitude,
        dropoffLatitude,
        dropoffLongitude,
      });
    }
  }; 
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Select pickup and dropoff location by pressing into the map
        </Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handleMapPress}
      >
        {!!pickupLatitude && !!pickupLongitude && (
          <Marker
            coordinate={{
              latitude: parseFloat(pickupLatitude),
              longitude: parseFloat(pickupLongitude),
            }}
          />
        )}
        {!!dropoffLatitude && !!dropoffLongitude && (
          <Marker
            coordinate={{
              latitude: parseFloat(dropoffLatitude),
              longitude: parseFloat(dropoffLongitude),
            }}
          />
        )}
      </MapView>
      {pickupLatitude && pickupLongitude && dropoffLatitude && dropoffLongitude && (
        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MapScreen;










