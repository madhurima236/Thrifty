// components/dashboard.js

import React, { Component } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
import firebase from "../Database/firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";
import { userData } from '../localData/data';

import Media from "./Media";
import Profile from "./Profile";
import Statistics from "./Statistics";
import Home from "./Home";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faChartPie, faCamera } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        let iconName;
        let color = focused ? '#00d800' : 'gray';

        switch (route.name) {
          case 'Home':
            iconName = faHome
            break;
          case 'Profile':
            // iconName = focused ? 'fa fa-user' : 'fa fa-user-outline';
            iconName = faUser;
            break;
          case 'Media':
            // iconName = focused ? 'fa fa-camera' : 'fa fa-camera-outline';
            iconName = faCamera;
            break;
          case 'Statistics':
            // iconName = focused ? 'fa fa-chart-pie': 'fa fa-chart-pie-outline'
            iconName = faChartPie;
        }

        // You can return any component that you like here!
        // return <Icon name={iconName} size={size} color={color} />;
        return <FontAwesomeIcon icon={iconName} size={size} color={color} />
      },
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Media" component={Media} />
      <Tab.Screen name="Statistics" component={Statistics} />
    </Tab.Navigator>
  );
}

export default class Thrifty extends Component {
  constructor() {
    super();

    this._retrieveData();

    this.state = {
      uid: "",
    };
  }
  _retrieveData = async () => {
    fetch(`http://192.168.0.103:5000/load`, {
      method: 'GET',
      headers: {
        "accepts": "application/json",
        "Access-Control-Allow-Origin": '*',
        // 'Content-Type': 'multipart/form-data',
      },
      body: null
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson !== null && responseJson != {}) {
          // console.log(responseJson)
          userData.receipts = responseJson.receipts
          userData.categoriesToPrice = responseJson.categoriesToPrice
          userData.barUrl = responseJson.barUrl
          userData.pieUrl = responseJson.pieUrl
        }
      })
      .catch(error => console.log(error));
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };
    return <MyTabs></MyTabs>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});

// import React, { Component } from "react";
// import { Button, View, Text, StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// //import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import firebase from "../Database/firebase";

// class DashboardScreen extends Component {
//   HomeScreen({ navigation }) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home</Text>
//         <Button
//           title="Go to profile"
//           onPress={() => navigation.navigate("Profile")}
//         />
//       </View>
//     );
//   }

//   Profile({ navigation }) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Profile</Text>
//         <Button
//           title="Go to camera"
//           onPress={() => navigation.navigate("Camera")}
//         />
//       </View>
//     );
//   }

//   Camera({ navigation }) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Camera</Text>
//         <Button
//           title="Go to statistics"
//           onPress={() => navigation.navigate("Statistics")}
//         />
//       </View>
//     );
//   }

//   Statistics({ navigation }) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Statistics</Text>
//         <Button
//           title="Go to home"
//           onPress={() => navigation.navigate("Profile")}
//         />
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text> DashboardScreen </Text>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Profile" component={Profile} />
//             <Stack.Screen name="Camera" component={Camera} />
//             <Stack.Screen name="Statistics" component={Statistics} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </View>
//     );
//   }
// }
// export default DashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
