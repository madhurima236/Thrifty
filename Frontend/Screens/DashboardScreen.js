import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

class DashboardScreen extends Component {

    HomeScreen({ navigation }) {
        return (
          <Button
            title="Go to profile"
            onPress={() => navigation.navigate("Profile")}
          />
        );
      }
      
    Profile({ navigation }) {
        return (
          <Button
            title="Go to camera"
            onPress={() => navigation.navigate("Camera")}
          />
        );
      }
      
    Camera({ navigation }) {
        return (
          <Button
            title="Go to statistics"
            onPress={() => navigation.navigate("Statistics")}
          />
        );
      }
      
    Statistics({ navigation }) {
        return (
          <Button title="Go to home" onPress={() => navigation.navigate("Profile")} />
        );
      }



    render () {
        return(
            <View style={styles.container}>
                <Text> DashboardScreen </Text>
                <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Camera" component={Camera} />
                    <Stack.Screen name="Statistics" component={Statistics} />
                </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});