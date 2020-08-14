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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
// import Settings from "./Settings";

var images = ['/Users/madhurima/Desktop/Thrifty/Frontend/assets/DemoPics/Unknown-2.png', 
'/Users/madhurima/Desktop/Thrifty/Frontend/assets/DemoPics/Unknown-3.png', 
'/Users/madhurima/Desktop/Thrifty/Frontend/assets/DemoPics/Unknown-4.png']

var {width, height} = Dimensions.get('window')

class Profile extends Component {
  constructor(props) {
    super(props)
    firebase.database().ref(`${firebase.auth().currentUser.uid}`).once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  }

  rendersection() {
    return images.map((image, index) => {
      return(
        <View key={index} style={[{width:(width)/3}, {height:(width)/3}]}>
          <Image 
          style={{flex:1, width:undefined, height:undefined }}
          source={{uri="https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/receipt_10?alt=media&token=09e78494-062e-4e3e-a9e0-ed027126ff4c"}}
          />
        </View>
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text> Profile </Text>
        <Button
          color="#00d800"
          title="Settings"
          onPress={() => navigation.navigate("Settings")}
        /> */}
        <Content> 
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.rendersection()}
          </View>
        </Content>
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
