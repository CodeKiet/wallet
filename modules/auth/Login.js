/**
 * Created by hmd on 10/31/16.
 */
import {View, Text, StyleSheet, TouchableHighlight, TextInput, BackAndroid} from  'react-native';
var tcomb = require('tcomb-form-native');
import React, {Component} from 'react';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
//import SmartScrollView from 'react-native-smart-scroll-view';





var Form = tcomb.form.Form;


// here we are: define your domain model
var Person = tcomb.struct({
    username: tcomb.String,              // a required string
    password: tcomb.String,              // a required string
});


var options = {
    fields: {
        username: {
            placeholder: 'نام کاربری یا شماره تلفن',
            label: 'نام کاربری',
            error: 'نام کاربری معتبر نیست'
        }, password: {
            placeholder: 'گذرواژه',
            label: 'گذرواژه',
            error: 'گذرواژه معتبر نیست'
        }
    }
};

/*<TextInput
 style={{height: 40, borderColor: 'gray', borderWidth: 1}}
 onChangeText={(text) => this.setState({text:text})}
 value={this.state.text}
 />*/

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            forceFocusField: undefined,
            value: {},
            text: "hames"
        });
    }

    goToRegister(){
        // Listen to notification-clicking events
        Actions.register();
        //this._drawer.closeDrawer();
    };

    onChange(value) {
        this.setState({value: value});
    }

    onPress() {

        let hostAddress = "api.rasanak.com";
        if (__DEV__) {
            console.log(this.state.value);
            hostAddress = "localhost:8080";
        }


        fetch(`http://${hostAddress}/api/v0.1/accounts/origin/tokens`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.value)
        }).then(function (resp) {
            if (resp.status > 500) {
                //Commons.Alert(strings[getState().settings.lang].gatewayerror);
                return;
            }

            if (resp.status > 400) {
                //Commons.Alert(strings[getState().settings.lang].credentialsAreWrong);
                return;
            }


            if (resp.status != 201) {
                //Commons.Alert(strings[getState().settings.lang].unknownError);
                return;
            }

            resp.json().then((json) => {
                //Commons.Success(strings[getState().settings.lang].welcome);
                dispatch(LoginState.USER_IS_LOGGEDIN_ACTION(json));
                //console.log('parsed json', json);
            });

        }).catch(function (ex) {
            console.log('parsing failed', ex)
        });
    }


    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Form
                        ref="form"
                        type={Person}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>ورود</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button} onPress={this.goToRegister}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>ثبت نام</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1
    },
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1,
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#CC02FF',
        borderColor: '#CC02FF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});


module.exports = Login;