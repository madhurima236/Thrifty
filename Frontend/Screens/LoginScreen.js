import React, {Component} from "react";
import {View, Text, StyleSheet, Button} from "react-native";


class LoginScreen extends Component {

    render () {
        return(
            <View style={styles.container}>
                <Button title = "LoginScreen"
                onPress={() => alert('button pressed')}
                />
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
