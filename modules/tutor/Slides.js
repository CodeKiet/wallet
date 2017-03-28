import {
    View, Text, StyleSheet, TouchableHighlight, DrawerLayoutAndroid,
    BackAndroid, TouchableNativeFeedback, Image
} from  'react-native';
import React, {Component} from 'react';
import Tabs from 'react-native-tabs';
import Resource from "../resource/Resource.js"
import Auth from "../auth/Auth.js"
var SendIntentAndroid = require('react-native-send-intent');
import {connect} from 'react-redux'

import Button from 'react-native-button';
import Communications from 'react-native-communications';
import {Actions, Router} from 'react-native-redux-router';
var tcomb = require('tcomb-form-native');
var Form = tcomb.form.Form;
import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7f2a',
    }, slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ade4f3',
    },
    text: {
        color: '#555',
        fontSize: 25,
        fontWeight: 'bold',
        height: 50,
    },
    textInverted: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        height: 50,
    },
    images: {
        height: 320,
        width: 320,
    },
})

BackAndroid.addEventListener('hardwareBackPress', function () {
    /*if (!this.onMainScreen()) {
     this.goBack();*/

    if (Router.props.routes.length > 1) {
        Actions.pop();
        return true;
    }
    return false;
});
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
var Hands = require("./13360-NOWT5W.png");
var Buy = require("./buy.png");
var FreeTransfer = require("./freetransfer.png");
var MessageImage = require("./message.png");

class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'send'};

        let auth = new Auth({auth: {}});
        //Resource.LoadByIdPromise(auth,"hamed","/users",{})

        this.options = {
            fields: {
                dst: {
                    placeholder: '0912...',
                    label: 'واریز',
                    error: 'شماره را دوباره چک کنید!'
                }, amount: {
                    placeholder: '۱۰۰۰',
                    label: 'مبلغ',
                    error: 'مبلغ نامعتبر'
                }
            }
        };

        this.Transaction = tcomb.struct({
            dst: tcomb.Number,              // a required string
            amount: tcomb.Number,              // a required string
        });

        this.ChargeForm = tcomb.struct({
            amount: tcomb.Number,              // a required string
        });


    }

    onChange(value) {
        this.setState({...this.state, value: value});
    }

    onPress() {
        SendIntentAndroid.sendPhoneCall(`*788*97*8600*${this.state.value.amount}%23`);
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={true}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>انتقال وجه</Text>
                    <Image resizeMode="contain" source={Hands} style={styles.images}/>
                    <Text style={styles.text}>کارمزد کمتر از کارت</Text>
                </View>
                <View style={styles.slide1}>
                    <Text style={styles.text}>دریافت و پرداخت</Text>
                    <Image resizeMode="contain" source={Buy} style={styles.images}/>
                    <Text style={styles.text}>بدون کارمزد</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.textInverted}>تسویه حساب روزانه</Text>
                    <Image resizeMode="contain" source={FreeTransfer} style={styles.images}/>
                    <Text style={styles.textInverted}>بدون کارمزد</Text>
                </View>
                <View style={styles.slide4}>
                    <Text style={styles.textInverted}>تضمین و تایید پرداخت</Text>
                    <Image resizeMode="contain" source={MessageImage} style={styles.images}/>
                    <Text style={styles.textInverted}>با پیامک</Text>
                    <ButtonComponent
                        onPress={() => {}}
                        
                        text="Button"
                    >
                    </ButtonComponent>
                </View>
            </Swiper>
        )

    }
}

export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({
        dispatch: dispatch,
        addNewCounter: () => dispatch(actions.newCounter()),
        increment: (id) => dispatch(actions.increment(id)),
        decrement: (id) => dispatch(actions.decrement(id)),
        incrementWithDelay: (id) => dispatch(actions.incrementWithDelay(id))
    })
)(Transfer)