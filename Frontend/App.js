import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./Screens/LoginScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import Profile from "./Screens/Profile";
import Statistics from "./Screens/Statistics";
import Camera from "./Screens/Camera";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  Profile: Profile,
  Camera: Camera,
  Statistics: Statistics,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Statistics" component={Statistics} />
        </Stack.Navigator>
      </NavigationContainer>
      <AppNavigator />
    </View>
  );
}

// function HomeScreen({ navigation }) {
//   return (
//     <Button
//       title="Go to profile"
//       onPress={() => navigation.navigate("Profile")}
//     />
//   );
// }

// function Profile({ navigation }) {
//   return (
//     <Button
//       title="Go to camera"
//       onPress={() => navigation.navigate("Camera")}
//     />
//   );
// }

// function Camera({ navigation }) {
//   return (
//     <Button
//       title="Go to statistics"
//       onPress={() => navigation.navigate("Statistics")}
//     />
//   );
// }

// function Statistics({ navigation }) {
//   return (
//     <Button title="Go to home" onPress={() => navigation.navigate("Profile")} />
//   );
// }

// export default App;

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Thrifty" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// }
