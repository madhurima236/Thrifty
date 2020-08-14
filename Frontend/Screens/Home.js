import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Content } from "native-base";
import firebase from "../Database/firebase";

var images = [
  "https://bloximages.newyork1.vip.townnews.com/collegiatetimes.com/content/tncms/assets/v3/editorial/1/23/123a58d2-8057-11e6-a666-2fe215f72aec/57e31f8a72ee6.image.jpg?resize=1200%2C798",
  "https://blacksburgfarmersmarket.com/wp-content/uploads/2019/03/vendor-greenbeans-2019.jpg",
  "https://gray-wdbj-prod.cdn.arcpublishing.com/resizer/7X_vXrufafGiriKIm_pcUwTZA3A=/980x0/smart/cloudfront-us-east-1.images.arcpublishing.com/gray/SAFFPPBTYFGZTP3X6CDCAXF7B4.jpg",
];

// var { width, height } = Dimensions.get("window");

function getImage(image_uri, index) {
  console.log(image_uri);
  return (
    <View key={index}>
      <Image style={styles.image} source={{ uri: image_uri }} />
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: 100,
              textAlign: "center",
              paddingBottom: 20,
            }}
          >
            Let's all support local businesses amidst this pandemic. Click on
            the links in the descriptions to shop from their speciifc websites.
          </Text>
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
    padding: 20,
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 160,
    paddingBottom: 60,
    margin: 5,
  },
});
