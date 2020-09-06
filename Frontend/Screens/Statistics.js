import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PopUp from "./PopUp";

var { width, height } = Dimensions.get("window");

class Statistics extends Component {
  state = {
    error: false,
  };
  _onImageLoadError = (event) => {
    console.warn(event.nativeEvent.error);
    this.setState({ error: true });
  };
  // componentDidMount() {
  //   this.props.navigation.addListener('focus', () => {
  //     console.log('Profile in focus');
  //     this.render()
  //   });
  // }

  render() {
    let { error } = this.state;

    if (error) {
      return <Text>{"No Pie Chart Found"}</Text>;
    }
    return (
      // <SafeAreaView style={styles.container}>
      //   {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
      //   <Text style={{display: 'flex', width: width, textAlign: 'center'}}>Expenditure breakdown</Text>
      //   <Image
      //     source={{
      //       // uri: userData.pieUrl
      //       uri:
      //         "https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/pie_5?alt=media&token=3796254e-1801-49f7-9fa8-e8a51e6940e1",
      //     }}
      //     style={styles.image}
      //     accessible
      //     accessibilityLabel={"No Pie Chart Found"}
      //     onError={this._onImageLoadError}
      //   />
      //   <Image
      //     source={{
      //       // uri: userData.barUrl,
      //       uri:
      //         "https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/bar_5?alt=media&token=8243f88a-a8c5-478a-ba18-7f5007b33bcc",
      //     }}
      //     style={styles.image}
      //     accessible
      //     accessibilityLabel={"No Pie Chart Found"}
      //     onError={this._onImageLoadError}
      //   />
      //   {/* </ScrollView> */}
      // </SafeAreaView>
      <PopUp
        pieUrl="https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/piechart.png?alt=media&token=0434c912-2a55-4e06-857a-96bb8807d154"
        barUrl="https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/barchart.png?alt=media&token=9560ae94-e41f-48f5-b8f9-5f8c00c37107"
      />
    );
  }
}
export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 200,
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
