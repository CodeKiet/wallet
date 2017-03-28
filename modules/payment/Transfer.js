import {
    View, Text, StyleSheet, TouchableHighlight, DrawerLayoutAndroid,
    BackAndroid, TouchableNativeFeedback,
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
    }, buttonText: {
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

BackAndroid.addEventListener('hardwareBackPress', function () {
    /*if (!this.onMainScreen()) {
     this.goBack();*/

    if (Router.props.routes.length > 1) {
        Actions.pop();
        return true;
    }
    return false;
});


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

        var {username} =  this.props.auth;

        var page;
        switch (this.state.page) {
            case "send":
                page = <View name="send">
                    <Text style={styles.welcome}>
                        Welcome to React Native
                    </Text>
                    <Text style={styles.instructions}>
                        Selected page: {this.state.page}
                    </Text>

                    <Form
                        ref="form1"
                        type={this.Transaction}
                        options={ this.options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>انتقال</Text>
                    </TouchableHighlight>

                </View>;
                break;

            case "put":
                page = <View name="put">
                    <Form
                        ref="form2"
                        type={this.ChargeForm}
                        options={ this.options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>افزایش اعتبار</Text>
                    </TouchableHighlight>

                </View>;
                break;
            case "buy":
                page = <View name="buy">
                    <Form
                        ref="form3"
                        type={this.ChargeForm}
                        options={ this.options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>پرداخت</Text>
                    </TouchableHighlight>

                </View>;
                break;
            case "sell":
                page = <View name="sell">
                    <Form
                        ref="form4"
                        type={this.ChargeForm}
                        options={ this.options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>درخواست پرداخت</Text>
                    </TouchableHighlight>

                </View>;
                break;
            case "withdraw":
                page = <View name="withdraw">
                    <Text>{username}</Text>
                    <Form
                        ref="form5"
                        type={this.ChargeForm}
                        options={ this.options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>انتقال به حساب</Text>
                    </TouchableHighlight>

                </View>;
                break;
            default:
                page = <View style={styles.container}>
                    <Text>Launch page</Text>
                </View>;
                break;
        }

        return (
            <View style={styles.container}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                      selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
                    <Text name="send" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>انتقال</Text>
                    <Text name="withdraw" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>برداشت</Text>
                    <Text name="put" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>واریز</Text>
                    <Text name="buy" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>پرداخت</Text>
                    <Text name="sell" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>دریافت</Text>

                </Tabs>
                {page}
            </View>
        );
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