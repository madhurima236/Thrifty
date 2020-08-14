import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Content } from "native-base";
import firebase from "../Database/firebase";

var images = [
  "https://bloximages.newyork1.vip.townnews.com/collegiatetimes.com/content/tncms/assets/v3/editorial/1/23/123a58d2-8057-11e6-a666-2fe215f72aec/57e31f8a72ee6.image.jpg?resize=1200%2C798",
  "https://blacksburgfarmersmarket.com/wp-content/uploads/2019/03/vendor-greenbeans-2019.jpg",
  "http://eatsnaturalfoods.com/wp-content/uploads/2020/04/storefront.jpg",
];

var { width, height } = Dimensions.get("window");

function getImage(image_uri, index) {
  console.log(image_uri);
  return (
    <View key={index} style={[{ width: width }, { height: width }]}>
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

  renderSection() {
    return images.map((image, index) => getImage(image, index));
  }

  render() {
    return (
      <View style={styles.container}>
        <Content>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.renderSection()}
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
