import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Welcome to Thrifty! Let's get started!</Text>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
