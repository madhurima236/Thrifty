import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { userData } from '../localData/data';

class Statistics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{
          uri: userData.pieUrl
        }}
          style={styles.image}
        />
        <Image source={{
          uri: userData.barUrl
        }}
          style={styles.image}
        />
      </View>
    );
  }
}
export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
