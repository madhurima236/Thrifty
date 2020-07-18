import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <Button
      title="Go to profile"
      onPress={() => navigation.navigate("Profile")}
    />
  );
}

function Profile({ navigation }) {
  return (
    <Button
      title="Go to camera"
      onPress={() => navigation.navigate("Camera")}
    />
  );
}

function Camera({ navigation }) {
  return (
    <Button
      title="Go to statistics"
      onPress={() => navigation.navigate("Statistics")}
    />
  );
}

function Statistics({ navigation }) {
  return (
    <Button title="Go to home" onPress={() => navigation.navigate("Profile")} />
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
