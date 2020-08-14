import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { userData } from "../localData/data";
import { SafeAreaView } from "react-native-safe-area-context";

class Statistics extends Component {
  state = {
    error: false,
  };
  _onImageLoadError = (event) => {
    console.warn(event.nativeEvent.error);
    this.setState({ error: true });
  }
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
      <SafeAreaView style={styles.container}>
        {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
        <Text>Expenditure breakdown</Text>
        <Image
          source={{
            // uri: userData.pieUrl
            uri:
              "https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/pie_5?alt=media&token=3796254e-1801-49f7-9fa8-e8a51e6940e1",
          }}
          style={styles.image}
          accessible
          accessibilityLabel={"No Pie Chart Found"}
          onError={this._onImageLoadError}
        />
        <Image
          source={{
            // uri: userData.barUrl,
            uri:
              "https://firebasestorage.googleapis.com/v0/b/thrifty-c8d4b.appspot.com/o/bar_5?alt=media&token=8243f88a-a8c5-478a-ba18-7f5007b33bcc",
          }}
          style={styles.image}
          accessible
          accessibilityLabel={"No Pie Chart Found"}
          onError={this._onImageLoadError}
        />
        {/* </ScrollView> */}
      </SafeAreaView>
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
    padding: 180,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  image: {
    padding: 100,
    width: "100%",
    height: "100%",
  },
});
