import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Content } from "native-base";
import firebase from "../Database/firebase";

var images = [require('/Users/madhurima/Desktop/Thrifty/Frontend/assets/photo1.jpg'), require("/Users/madhurima/Desktop/Thrifty/Frontend/assets/photo2.jpg"), 
require("/Users/madhurima/Desktop/Thrifty/Frontend/assets/photo2.jpg")]

var { width, height } = Dimensions.get("window");

function getImage(image_uri, index) {
  console.log(image_uri);
  return (
    <View key={index} style={[{ width: width }, { height: width}]}>
      <Image
        style={{ flex: 1, width: undefined, height: undefined }}
        source={{ uri: image_uri }}
      />
    </View>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    firebase
      .database()
      .ref(`${firebase.auth().currentUser.uid}`)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  }

  renderSection () {
    return images.map((image, index) => 
      getImage(image, index)
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Content>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            { this.renderSection() }
          </View>
        </Content>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
