// App.js

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Screens/LoginScreen";
import Signup from "./Screens/SignUp";
import DashboardScreen from "./Screens/DashboardScreen";
// import Camera from "./Screens/Camera";
// import Profile from "./Screens/Profile";
// import Statistics from "./Screens/Statistics";

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator initialRouteName="Profile">
//       <Tab.Screen name="Profile" component={Profile} />
//       <Tab.Screen name="Camera" component={Camera} />
//       <Tab.Screen name="Statistics" component={Statistics} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }

// import { StatusBar } from "expo-status-bar";
// import * as React from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// // import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// // import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import LoginScreen from "./Screens/LoginScreen";
// import LoadingScreen from "./Screens/LoadingScreen";
// import DashboardScreen from "./Screens/DashboardScreen";
// import Profile from "./Screens/Profile";
// import Statistics from "./Screens/Statistics";
// import Camera from "./Screens/Camera";

// import * as firebase from "firebase";
// import { firebaseConfig } from "./config";
// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#3740FE",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: "Login" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({ title: "Dashboard" }, { headerLeft: null })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
