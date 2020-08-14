import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";
import { userData } from "../localData/data";
import { SafeAreaView } from "react-native-safe-area-context";

var { width, height } = Dimensions.get("window");

export default function PopUp(props) {
  var pieUrl, barUrl;
  if(props.route){
    pieUrl = props.route.params.pieUrl;
    barUrl = props.route.params.barUrl;
  } else {
    pieUrl = props.pieUrl;
    barUrl = props.barUrl;
  }
  console.log(pieUrl);
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
      <Text style={{ display: 'flex', width: width, textAlign: 'center' }}>Expenditure breakdown</Text>
      <Image
        source={{
          // uri: userData.pieUrl
          uri:
            pieUrl,
        }}
        style={styles.image}
        // accessible
        // accessibilityLabel={"No Pie Chart Found"}
      //   onError={this._onImageLoadError}
      />
      <Image
        source={{
          // uri: userData.barUrl,
          uri:
            barUrl,
        }}
        style={styles.image}
        // accessible
        // accessibilityLabel={"No Pie Chart Found"}
      //   onError={this._onImageLoadError}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 190,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  image: {
    padding: 90,
    width: "100%",
    height: "100%",
  },
});
