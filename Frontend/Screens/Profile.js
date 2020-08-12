import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Settings,
  TouchableOpacity
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
    this.state = { items: [] };
    firebase.database().ref(`${firebase.auth().currentUser.uid}`).once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  }

  componentDidMount() {
    // Build an array of 60 photos
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
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
        <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />
        {/* <Image source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/my-image?alt=media&token=bfed5150-12e0-4f01-8593-767ee91ac704'
        }}
        style={styles.image}
      /> */}
      </View>
    );
  }

  renderHeader() {
    return(
      <Text>I'm on top!</Text>
    );
  }

  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          console.log(1)
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
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
