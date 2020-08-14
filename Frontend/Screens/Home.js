import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Content } from "native-base";
import firebase from "../Database/firebase";

var dict_image = {
  barUrl: "https://via.placeholder.com/300.png/09f/fff",
  pieUrl: "https://via.placeholder.com/300.png/09f/fff",
  receipts: {
    "1": {
      bar: "https://via.placeholder.com/300.png/09f/fff",
      categoriesToPrice: {
        "Business & Industrial": 1,
        "Computers & Electronics": 4.97,
        "Food & Drink": 15.158,
        Health: 1,
        "Hobbies & Leisure": 88.94999999999999,
        Shopping: 11.940000000000001,
      },
      image: "https://via.placeholder.com/300.png/09f/fff",
      pie: "https://via.placeholder.com/300.png/09f/fff",
    },
    "3": {
      bar: "https://via.placeholder.com/300.png/09f/fff",
      categoriesToPrice: {
        "Business & Industrial": 1,
        "Computers & Electronics": 4.97,
        "Food & Drink": 15.158,
        Health: 1,
        "Hobbies & Leisure": 88.94999999999999,
        Shopping: 11.940000000000001,
      },
      image: "https://via.placeholder.com/300.png/09f/fff",
      pie: "https://via.placeholder.com/300.png/09f/fff",
    },
  },
};

var { width, height } = Dimensions.get("window");

function getImage(image_uri) {
  console.log(image_uri);
  return (
    <View style={[{ width: width / 3 }, { height: width / 3 }]}>
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

  render() {
    return (
      <View style={styles.container}>
        <Content>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Object.keys(dict_image.receipts).map((key, index) => {
              return getImage(dict_image.receipts[key].image);
            })}
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
