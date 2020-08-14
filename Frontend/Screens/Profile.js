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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { userData } from "../localData/data";

var dict_image = {
  "barUrl": "https://via.placeholder.com/300.png/09f/fff",
  "pieUrl": "https://via.placeholder.com/300.png/09f/fff",
  "receipts": {
    "1": {
      "bar": "https://via.placeholder.com/300.png/09f/fff",
      "categoriesToPrice": {
        "Business & Industrial": 1,
        "Computers & Electronics": 4.97,
        "Food & Drink": 15.158,
        "Health": 1,
        "Hobbies & Leisure": 88.94999999999999,
        "Shopping": 11.940000000000001,
      },
      "image": "https://via.placeholder.com/300.png/09f/fff",
      "pie": "https://via.placeholder.com/300.png/09f/fff",
    },
    "3": {
      "bar": "https://via.placeholder.com/300.png/09f/fff",
      "categoriesToPrice": {
        "Business & Industrial": 1,
        "Computers & Electronics": 4.97,
        "Food & Drink": 15.158,
        "Health": 1,
        "Hobbies & Leisure": 88.94999999999999,
        "Shopping": 11.940000000000001,
      },
      "image": "https://via.placeholder.com/300.png/09f/fff",
      "pie": "https://via.placeholder.com/300.png/09f/fff",
    },
  },
}

var {width, height} = Dimensions.get('window')

class Profile extends Component {
  constructor(props) {
    super(props)
    firebase.database().ref(`${firebase.auth().currentUser.uid}`).once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  }

  getImage(image_uri) {
    console.log(image_uri)
    return(
      <View style={[{width:(width)/3}, {height:(width)/3}]}>
        <Image 
        style={{flex:1, width:undefined, height:undefined }}
        source={{uri: image_uri}}
        />
      </View>
    );
  }

  rendersection() {
    for (var receipt in dict_image.receipts){
      let imageUrl = dict_image.receipts[receipt].image
      console.log("THIS IS WORKING")
      return(this.getImage(imageUrl));
    }
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
