import {
    View, Text, StyleSheet, TouchableHighlight, DrawerLayoutAndroid,
    BackAndroid, TouchableNativeFeedback,
} from  'react-native';
import React, {Component} from 'react';
import Tabs from 'react-native-tabs';
import Resource from "./resource/Resource.js"
import Auth from "./auth/Auth.js"

import Button from 'react-native-button';
import {Actions, Router} from 'react-native-redux-router';


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }, welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

BackAndroid.addEventListener('hardwareBackPress', function () {
    /*if (!this.onMainScreen()) {
     this.goBack();*/

    if (Router.props.routes.length > 1) {
        Actions.pop();
        return true;
    }
    return false;
});

class Launch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'second'};

        let auth=new Auth({auth:{}});
        //Resource.LoadByIdPromise(auth,"hamed","/users",{})

    }

    render() {

        var page = <View name="fifth" style={styles.container}>
            <TouchableNativeFeedback
                onPress={this._onPressButton}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{width: 150, height: 100}}>
                    <Text style={{margin: 30}}>Button</Text>
                </View>
            </TouchableNativeFeedback>

            <Text>Launch page</Text>
            <Button onPress={Actions.home}>Go to Register page</Button>


        </View>;
        if (this.state.page != "fifth") {
            page = <View>
                <Text style={styles.welcome}>
                    Welcome to React Native
                </Text>
                <Text style={styles.instructions}>
                    Selected page: {this.state.page}
                </Text>
            </View>
        }

        return (





            <View style={styles.container}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                      selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
                    <Text name="first">جدید</Text>
                    <Text name="second" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
                    <Text name="third">Third</Text>
                    <Text name="fourth" selectedStyle={{color:'green'}}>Fourth</Text>
                    <Text name="fifth">Fifth</Text>

                </Tabs>
                {page}
            </View>



        );

    }
}


module.exports = Launch;