import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import firebase from 'firebase';

class LoginScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => 
        {
            if (user) {
                this.props.navigation.navigate
                ('DashboardScreen');
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        }
        )
    }

    render () {
        return(
            <View style={styles.container}>
                <Text> LoginScreen </Text>
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
