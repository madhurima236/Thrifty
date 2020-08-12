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
import firebase from "../Database/firebase";
import PhotoGrid from 'react-native-photo-grid';
// import Settings from "./Settings";

class Profile extends Component {
  constructor(props) {
    super(props)
    firebase.database().ref(`${firebase.auth().currentUser.uid}`).once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  }
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
        <Image source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/my-image?alt=media&token=bfed5150-12e0-4f01-8593-767ee91ac704'
        }}
        style={styles.image}
         />
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
  image: {
    width: "100%",
    height: "100%"
    }
});
