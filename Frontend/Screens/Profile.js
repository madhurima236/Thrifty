import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
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

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
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
