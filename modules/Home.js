import {View, Text, StyleSheet, TouchableHighlight, TextInput, BackAndroid} from  'react-native';
var tcomb = require('tcomb-form-native');
import React, {Component} from 'react';
import Button from 'react-native-button';
import {Actions} from 'react-native-redux-router';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
//import SmartScrollView from 'react-native-smart-scroll-view';


var I18n = require('react-native-i18n');

var Demo = React.createClass({
    render: function () {
        return (
            <Text>{I18n.t('greeting')}</Text>
        )
    }
});

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
    M: 'Male',
    F: 'Female'
});

var Positive = tcomb.refinement(tcomb.Number, function (n) {
    return n >= 0;
});


// here we are: define your domain model
var Person = tcomb.struct({
    name: tcomb.String,              // a required string
    surname: tcomb.maybe(tcomb.String),  // an optional string
    email: tcomb.String,
    age: Positive,               // a required number
    birthDate: tcomb.Date,
    gender: Gender,
    rememberMe: tcomb.Boolean        // a boolean
});


var options = {
    fields: {
        name: {
            placeholder: 'Your placeholder here',
            label: 'Insert your name',
            help: 'Your help message here',
            error: 'Insert a valid email'
        }
    }
};

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            forceFocusField: undefined,
            value: {
                name: 'Giulio',
                surname: 'Canti'
            },
            text: "hames"
        });


    }

    onChange(value) {
        this.setState({value});
    }

    onPress() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
    }


    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Demo/>
                   
                        <Form
                            ref="form"
                            type={Person}
                            options={options}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}
                        />

                        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)}
                                            underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableHighlight>

                        <Button onPress={Actions.pop}>Back</Button>


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
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

module.exports = Register;