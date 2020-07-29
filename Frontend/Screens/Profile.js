import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Settings,
} from "react-native";
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Button,
} from "native-base";
// import Settings from "./Settings";

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
        <Button
          color="#00d800"
          title="Settings"
          onPress={() => navigation.navigate("Settings")}
        />
        {/* <Button
          color="#00d800"
          title="Logout"
          style={{ width: 80, height: 80 }}
          onPress={() => this.signOut()} */}
        {/* /> */}
      </View>
    );
  }
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
