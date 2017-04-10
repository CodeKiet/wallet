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
import ButtonComponent, {CircleButton, RoundButton, RectangleButton} from 'react-native-button-component';
//import SmartScrollView from 'react-native-smart-scroll-view';
var _ = require('lodash');

const stylesheet = _.cloneDeep(tcomb.form.Form.stylesheet);
//stylesheet.textbox.normal.color = '#00FF00';
stylesheet.textbox.normal = {
    color: "white",
    fontSize: 20,
    fontFamily: "iransans",
    opacity: 0.5,
    height: 64,
    padding: 7,
    borderRadius: 4,
    borderWidth: 0,
    marginBottom: 5,
    backgroundColor: '#607D8B',
};
stylesheet.textbox.notEditable.color = "white";
import LinearGradient from 'react-native-linear-gradient';

var Form = tcomb.form.Form;


// here we are: define your domain model
var Person = tcomb.struct({
    username: tcomb.Number,              // a required string
    password: tcomb.String,              // a required string
});


var options = {
    fields: {
        username: {
            placeholder: 'شماره تلفن',
            label: ' ',
            error: 'نام کاربری معتبر نیست',
            help: 'مثلا 09129035040',
            placeholderTextColor:"#BDBDBD",

            stylesheet: stylesheet // overriding the style of the textbox
        }, password: {
            placeholder: 'Password',
            label: ' ',
            error: 'گذرواژه معتبر نیست',
            stylesheet: stylesheet, // overriding the style of the textbox
            password: true,
            secureTextEntry: true,
            placeholderTextColor:"#BDBDBD",
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

    goToRegister() {
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
        var self = this;
        return (
            <LinearGradient
                start={{x: 0.25, y: 0.5}} end={{x: 0.75, y: 0.5}}
                locations={[0,0.23,1]}
                colors={['#ffffff', '#f6f6f6', '#ededed']}
                style={styles.container}>


                <Text style={{fontFamily:"iransans",fontSize:26,color:"gray",}}>ورود</Text>
                <Form
                    ref="form"
                    type={Person}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    style={{flex:1,}}
                />

                <View
                    style={{position: 'absolute', bottom:0, left: 0, right: 0,flexDirection:"row", justifyContent:"center",height:64}}>
                    <ButtonComponent
                        buttonState={this.state.buttonState||"upload"} // "upload" or "uploading"
                        text="Button"
                        type="primary"
                        shape="rectangle"
                        backgroundColors={['#FF5722', '#FFAB91']}
                        height={64}

                        style={{flex:1}}
                        textStyle={{fontFamily:"iransans",fontSize:16}}

                        states={{
                            upload: {
                              text: 'ثبت نام',
                              backgroundColors: ['#FF5722', '#FF7043'],
                              onPress: () => {
                                self.goToRegister()
                              },
                            },
                            uploading: {
                              text: 'ثبت نام',


                              backgroundColors: ['#ff4949', '#fe6060'],
                              spinner: true,
                              onPress: () => {
                                self.goToRegister()
                              },
                            },
                          }}
                    >
                    </ButtonComponent >
                    <ButtonComponent
                        buttonState={this.state.buttonState||"upload"} // "upload" or "uploading"
                        text="Button"
                        type="primary"
                        shape="rectangle"
                        backgroundColors={['#FF5722', '#FFAB91']}
                        height={64}
                        style={{flex:1}}
                        textStyle={{fontFamily:"iransans",fontSize:16}}
                        states={{
                            upload: {
                              text: 'ورود',
                              backgroundColors: ['#FF5722', '#FF7043'],
                              onPress: () => {
                                self.setState({ buttonState: 'uploading' });
                              },
                            },
                            uploading: {
                              text: 'در حال ورود',


                              backgroundColors: ['#ff4949', '#fe6060'],
                              spinner: true,
                              onPress: () => {
                                self.setState({ buttonState: 'upload' });
                              },
                            },
                          }}
                    >
                    </ButtonComponent >
                </View>


            </LinearGradient>


        );
    }
}

var styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
        flexDirection: "column",

    },
    container: {
        justifyContent: 'center',
        padding: 64,
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