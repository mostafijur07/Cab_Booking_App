import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, Modal, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import {MAP_API_KEY} from "@env";

const MapScreen = () => {
  const [pickupLatitude, setPickupLatitude] = useState(null);
  const [pickupLongitude, setPickupLongitude] = useState(null);
  const [dropoffLatitude, setDropoffLatitude] = useState(null);
  const [dropoffLongitude, setDropoffLongitude] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
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

  const fetchRouteData = async () => {
    if (pickupLatitude && pickupLongitude && dropoffLatitude && dropoffLongitude) {
      setLoading(true);
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${MAP_API_KEY}&start=${pickupLongitude},${pickupLatitude}&end=${dropoffLongitude},${dropoffLatitude}`;
      try {
        const response = await axios.get(url);
        const route = response.data.features[0].geometry.coordinates.map((coordinate) => ({
          latitude: coordinate[1],
          longitude: coordinate[0],
        }));
        const distanceInMeters = response.data.features[0].properties.segments[0].distance;
        const durationInSeconds = response.data.features[0].properties.segments[0].duration;
        const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);
        const durationInMinutes = (durationInSeconds / 60).toFixed(2);
        setRouteCoordinates(route);
        setDistance(distanceInKilometers);
        setDuration(durationInMinutes);
        setShowNextButton(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRouteData();
  }, [pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude]);

  const handleEditPress = () => {
    setPickupLatitude("");
    setPickupLongitude("");
    setDropoffLatitude("");
    setDropoffLongitude("");
    setRouteCoordinates("");
  };

  const handleNextPress = () => {
    navigation.navigate("Summary", {
      pickupLatitude,
      pickupLongitude,
      dropoffLatitude,
      dropoffLongitude,
      routeCoordinates: JSON.stringify(routeCoordinates),
      distance,
      duration,
    });
  };

  const initialRegion = {
    latitude: 22.5726, longitude: 88.3639, latitudeDelta: 0.0922, longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={styles.container}>
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
          Select the pickup and destination locations by tapping on the map
        </Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={handleMapPress}
      >
        {!!pickupLatitude && !!pickupLongitude && (
          <Marker
            coordinate={{
              latitude: pickupLatitude,
              longitude: pickupLongitude,
            }}
            title="Pickup Location"
          />
        )}
        {!!dropoffLatitude && !!dropoffLongitude && (
          <Marker
            coordinate={{
              latitude: dropoffLatitude,
              longitude: dropoffLongitude,
            }}
            title="Destination Location"
          />
        )}
        {!!routeCoordinates.length && !!pickupLatitude && !!pickupLongitude && !!dropoffLatitude && !!dropoffLongitude && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000"
            strokeWidth={4}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.EditButton} onPress={handleEditPress}>
        <FontAwesome name="pencil" size={20} style={{ marginRight: 5 }} />
        <Text style={styles.nextButtonText}>Edit</Text>
      </TouchableOpacity>
      {showNextButton && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      <Modal visible={loading} transparent={true} animationType='none'>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3",
  },
  heading: {
    flexDirection: 'row',
    fontSize: 40,
    fontWeight: 'bold',
    height: 90,
    color: '#000',
    backgroundColor: '#FFA500',
  },
  backButton: {
    marginTop: 16
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
  map: {
    flex: 1,
  },
  EditButton: {
    flexDirection: 'row',
    position: "absolute",
    right: 20,
    backgroundColor: "#FFA500",
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 200,
    borderRadius: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 20,
    right: 20,
    backgroundColor: "#FFA500",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
},
});

export default MapScreen;