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
import Camera from 'react-native-camera';
import QRCode from 'react-native-qrcode';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';
//const myIcon = (<Icon name="rocket" size={30} color="#900"/>)
import Collapsible from 'react-native-collapsible';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: 48,


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
        backgroundColor: '#ff6f00',
        borderColor: '#e65100',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }, preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
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


import {TabNavigator} from "react-navigation";

class BuyScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'خرید',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ({tintColor}) => (
                <Icon name="cart"
                      size={24}/>
            ),
        },
    }

    constructor(props) {
        super(props);
        this.state = {page: 'send', value: {}};

        this.options = {
            fields: {
                dst: {
                    placeholder: 'شماره مقصد',
                    label: ' ',
                    error: 'شماره را دوباره چک کنید!',
                    help: '09124002000 یا 989124002000',
                }, amount: {
                    placeholder: 'مبلغ',
                    label: ' ',
                    error: 'مبلغ نامعتبر'
                }
            }
        };

        this.ChargeForm = tcomb.struct({
            amount: tcomb.Number,              // a required string
        });
    }

    onChange(value) {
        this.setState({...this.state, value: value});
    }

    render() {
        return <View name="buy" style={styles.container}>

            <View style={{width: 200}}>


                <Form
                    ref="form3"
                    type={this.ChargeForm}
                    options={ this.options}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}

                />
            </View>

            <QRCode
                value={`tester:${this.state.value.amount}`}
                size={200}
                bgColor='#ff6f00'
                fgColor='white'/>
        </View>;
    }
}

class SellScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'فروش',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ({tintColor}) => (
                <Icon name="camera"
                      size={24}/>
            ),
        },
    }

    constructor(props) {
        super(props);
        this.state = {page: 'send', value: {}};

        this.options = {
            fields: {
                dst: {
                    placeholder: 'شماره مقصد',
                    label: ' ',
                    error: 'شماره را دوباره چک کنید!',
                    help: '09124002000 یا 989124002000',
                }, amount: {
                    placeholder: 'مبلغ',
                    label: ' ',
                    error: 'مبلغ نامعتبر'
                }
            }
        };

        this.ChargeForm = tcomb.struct({
            amount: tcomb.Number,              // a required string
        });
    }

    onChange(value) {
        this.setState({...this.state, value: value});
    }

    barcodeRead(event) {

        if (event.type == "QR_CODE") {
            var code = event.data
            console.log(code);
        }


    }

    render() {
        return <View name="sell" style={styles.container}>
            <View style={{width: 200}}>
                <Form
                    ref="form4"
                    type={this.ChargeForm}
                    options={ this.options}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}

                />
            </View>

            <View style={{width:200,height:200}}>
                <Camera
                    ref={(cam) => {
                            this.camera = cam;
                          }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    onBarCodeRead={this.barcodeRead.bind(this)}
                >
                </Camera>
            </View>


        </View>;
    }
}

class SendScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'ارسال وجه',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ({tintColor}) => (
                <Icon name="envelope"
                      size={24}/>
            ),
        },
    }

    constructor(props) {
        super(props);
        this.state = {page: 'send', value: {}};

        this.options = {
            fields: {
                dst: {
                    placeholder: 'شماره مقصد',
                    label: ' ',
                    error: 'شماره را دوباره چک کنید!',
                    help: '09124002000 یا 989124002000',
                }, amount: {
                    placeholder: 'مبلغ',
                    label: ' ',
                    error: 'مبلغ نامعتبر'
                }
            }
        };

        this.Transaction = tcomb.struct({
            dst: tcomb.Number,              // a required string
            amount: tcomb.Number,              // a required string
        });


    }

    onChange(value) {
        this.setState({...this.state, value: value});
    }

    barcodeRead(event) {

        if (event.type == "QR_CODE") {
            var code = event.data
            console.log(code);
        }


    }

    render() {
        return <View name="send">
            <Text style={styles.welcome}>
                انتقال وجه به آشنایان
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
        ;
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return <Text>List of all contacts</Text>
    }
}

const MainScreenNavigator = TabNavigator({
    Buy: {screen: BuyScreen},
    Sell: {screen: SellScreen},
}, {
    tabBarPosition: "bottom",
    tabBarOptions: {
        showIcon: true,
        style: {backgroundColor: "white"},
        labelStyle: {color: "#333"},
        iconStyle: {padding: 10},

    }
});

import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
    {
        title: 'نرخ کارمزد؟',
        content: 'کلیه خدمات رایگان است',
    },
    {
        title: 'سقف میزان تراکنش چقدر است؟',
        content: '۵۰ میلیون تومان',
    }
];

class AccordionView extends Component {
    _renderHeader(section) {
        return (
            <View style={{backgroundColor:"#EEEEEE"}}>
                <Text style={{fontFamily:"iransans",fontSize:20}}>{section.title}</Text>
            </View>
        );
    }

    _renderContent(section) {
        return (
            <View >
                <Text style={{fontFamily:"iransans",fontSize:16}}>{section.content}</Text>
            </View>
        );
    }

    render() {
        return (
            <Accordion
                sections={SECTIONS}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            />
        );
    }
}
class Transfer extends React.Component {
    static renderNavigationBar(props) {
        return <LinearGradient
            start={{x: 0.25, y: 0.5}} end={{x: 0.75, y: 0.5}}
            locations={[0,0.23,1]}
            colors={['#ffffff', '#f6f6f6', '#ededed']}
            style={{position: 'absolute',
                left:     0,
                right:     0,
                top:      0,
                height:48,
                flex:1,
                flexDirection:"row",
                justifyContent: 'center',
                alignItems: 'center',
                }}>
            <View>
                <Text>
                    <Icon name="navicon"
                          size={24}/>
                </Text>
            </View>
        </LinearGradient>
    }

    constructor(props) {
        super(props);
        this.state = {page: 'send', value: {}};

        let auth = new Auth({auth: {}});
        //Resource.LoadByIdPromise(auth,"hamed","/users",{})

        this.options = {
            fields: {
                dst: {
                    placeholder: 'شماره مقصد',
                    label: ' ',
                    error: 'شماره را دوباره چک کنید!',
                    help: '09124002000 یا 989124002000',
                }, amount: {
                    placeholder: 'مبلغ',
                    label: ' ',
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

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }

    barcodeRead(event) {

        if (event.type == "QR_CODE") {
            var code = event.data
            console.log(code);
        }


    }

    render() {


        return <AccordionView style={{paddingTop:100}}/>
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