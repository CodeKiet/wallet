import {View, Text, StyleSheet, TouchableHighlight, TextInput, BackAndroid} from  'react-native';
var tcomb = require('tcomb-form-native');
import React, {Component} from 'react';
import Button from 'react-native-button';
import {Actions} from 'react-native-redux-router';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import {API} from '../configs';
import Commons from "../commons"
//import SmartScrollView from 'react-native-smart-scroll-view';
import {connect} from 'react-redux'

var I18n = require('react-native-i18n');

var Demo = React.createClass({
    render: function () {
        return (
            <Text>{I18n.t('greeting')}</Text>
        )
    }
});

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

I18n.translations = {
    en: {
        greeting: 'Hi!'
    },
    fr: {
        greeting: 'Bonjour!'
    }
};

var Form = tcomb.form.Form;
var Gender = tcomb.enums({
    M: 'مرد',
    F: 'زن',
    NA: 'مشخص نشده است'
});

var Positive = tcomb.refinement(tcomb.Number, function (n) {
    return n >= 0;
});

var PersonFields = {
    username: tcomb.String,              // a required string
    password: tcomb.String,              // a required string
    gender: Gender,
    firstname: tcomb.String,              // a required string
    mobile: tcomb.Number,
    lastname: tcomb.String,  // an optional string
    email: tcomb.String,
    birth: tcomb.Date,
}

// here we are: define your domain model
var Person = tcomb.struct(PersonFields);


var options = {
    fields: {
        username: {
            placeholder: 'نام کاربری',
            label: 'نام کاربری',
            error: 'نام کاربری معتبر نیست'
        }, password: {
            placeholder: 'گذرواژه',
            label: 'گذرواژه',
            error: 'گذرواژه معتبر نیست'
        }, firstname: {
            placeholder: 'نام',
            label: 'نام',
            help: 'مثلا حامد',
            error: 'نام معتبر نیست'
        }, lastname: {
            placeholder: 'نام خانوادگی',
            label: 'نام خانوادگی',
            help: 'مثلا محمدی',
            error: 'نام خانوادگی معتبر نیست'
        }, email: {
            placeholder: 'you@server.com',
            label: 'ایمیل',
            error: 'آین آدرس معتبر نیست',
        }, mobile: {
            help: '09126136545 یا 989126136545',
            placeholder: '09126136545',
            label: 'شماره موبایل',
            error: 'این شماره معتبر نیست',
        }, birth: {
            placeholder: 'you@server.com',
            label: 'تاریخ تولد',
            error: 'تاریخ تولد نادرست است'
        }, gender: {
            placeholder: 'you@server.com',
            label: 'آقا یا خانم؟',
            error: 'جنسیت انتخاب نشده است'
        },
        captcha: {
            placeholder: 'کد امنیتی',
            label: 'کد  امنیتی',
            error: 'کد امنیتی صحیح نیست'
        }
    }
};

var Person_with_captcha = tcomb.struct({...PersonFields, captcha: tcomb.Number,});


@connect(
    (state) => ({
        auth: state.auth,
        captcha: state.captcha
    }),
    (dispatch) => ({
        dispatch: dispatch,
    })
)
class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            forceFocusField: undefined,
            value: {},
            text: "hames"
        });


    }

    onChange(value) {
        this.setState({value: value});
    }

    onRegister() {
        const {dispatch} =  this.props;

        var captact = Commons.BuildNamedAction("CAPTCHA_RECORD", "register");
        var url = `http://${API}/users?lang=${"fa"}`
        if (this.props.captcha.register) {
            url = `http://${API}/users?lang=${"fa"}&captcha=${this.state.value.captcha}`
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.value)
        }).then(function (response) {
            switch (response.status) {
                case 201:
                    return;
                    break;
                case 429:

                    response.json().then((json)=> {
                        console.log(json);
                        dispatch(captact(`http://${API}/captchas/${json.meta.captcha}.png?nounce=${Math.random()}`));
                    });

                    break;
                case 403:
                    response.json().then((json)=> {
                        console.log(json);
                    });

                    break;
                case 406:
                    response.json().then((json)=> {
                        
                        console.log(json);
                    });

                    break;
                default:
                    console.log('parsed json', response);
            }

        }).catch(function (ex) {
            console.log('parsing failed', ex)
        });


    }


    render() {
        console.log(this.props.captcha);
        var captcha = this.props.captcha.register;
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>

                    <Demo/>
                    <Form
                        ref="form"
                        type={captcha?Person_with_captcha:Person}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />

                    {((captcha)=> {
                        return captcha ? <Image
                            source={{ uri: captcha }}
                            indicator={ProgressBar}
                            style={{width: 320,height: 100,}}/> : <View></View>;
                    })(captcha)
                    }

                    <TouchableHighlight style={styles.button} onPress={this.onRegister.bind(this)}
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


module.exports = Register;