import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import DashboardScreen from './Screens/DashboardScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen, 
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer
(AppSwitchNavigator);


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
    < AppNavigator />
    </View>
  );
}



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
