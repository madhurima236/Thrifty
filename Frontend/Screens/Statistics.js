import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, Image } from "react-native";
import { userData } from '../localData/data';

class Statistics extends Component {
  state = {
    error: false
  };
  _onImageLoadError = (event) => {
    console.warn(event.nativeEvent.error);
    this.setState({ error: true });
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      console.log('Profile in focus');
      this.render()
    });
  }
  render() {
    let { error } = this.state;

    if (error) {
      return (
        <Text>{'No Pie Chart Found'}</Text>
      );
    }
    return (

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Image source={{
          uri: userData.pieUrl
        }}
          style={styles.image}
          accessible
          accessibilityLabel={'No Pie Chart Found'}
          onError={this._onImageLoadError}
        />
        <Image source={{
          uri: userData.barUrl
        }}
          style={styles.image}
          accessible
          accessibilityLabel={'No Pie Chart Found'}
          onError={this._onImageLoadError}
        />
      </ScrollView>
    );
  }
}
export default Statistics;

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
