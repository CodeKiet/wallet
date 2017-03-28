import {View, Text, StyleSheet, TouchableHighlight, BackAndroid, ActivityIndicator} from  'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';

import {Actions} from 'react-native-redux-router';


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }, centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});

class TimeLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: true
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }




    render() {

        return (
            <View style={styles.container}>
               

                <Text>ds</Text>
            </View>
        );
    }
}



module.exports = TimeLine;