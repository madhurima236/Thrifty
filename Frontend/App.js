import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Fontisto } from "@expo/vector-icons";

import Login from "./Screens/LoginScreen";
import Signup from "./Screens/SignUp";
import Thrifty from "./Screens/Thrifty";
import PopUp from "./Screens/PopUp";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00d800",
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
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: "Log in" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Thrifty"
        component={Thrifty}
        options={({ title: "Thrifty" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="PopUp"
        component={PopUp}
        options={({ title: "Statistics" }, { headerLeft: null })}
      />
        {/* {(pieUrl, barUrl) => <PopUp pieUrl={pieUrl} barUrl={barUrl} />} */}
      {/* </Stack.Screen> */}
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
