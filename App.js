import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import Summary from "./screens/Summary";
import Selection from "./screens/Selection";
import Select from "./screens/Select";
import LoginScreen from "./screens/LoginScreen";
import RegScreen from "./screens/RegScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { auth } from "./firebaseConfig";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegScreen"
            component={RegScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookDetailsScreen"
            component={BookDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Summary"
            component={Summary}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Selection"
            component={Selection}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Select"
            component={Select}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

