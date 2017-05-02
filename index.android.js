/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import Button from 'react-native-button';
import Login from "./modules/auth/Login.js";
import Contacts from "./modules/contacts/Contact.js";
//import Notification from 'react-native-system-notification';
import thunk from 'redux-thunk';
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst} from 'react-native-router-flux'
import Commons from "./modules/commons"
import routes from './modules/routeReducer.js';

import {createStore, combineReducers} from 'redux';
import {applyMiddleware, compose} from 'redux';
import {Provider, connect} from 'react-redux';

import Launch from './modules/Launch.js';
import Home from './modules/Home.js';
import Settings from './modules/settings/Settings.js';
import Transfer from './modules/payment/Transfer.js';
import Register from './modules/auth/Register.js';
import CounterReducer from './modules/navbar_reducer';
import VideoPlayer from './modules/Video.js';
import TimeLine from './modules/TimeLine.js';
import Slides from './modules/tutor/Slides.js';
import Faq from './modules/faq/Faq.js';

import {NavBar, NavBarModal} from './modules/NavBar.js';
import {getStoredState, autoRehydrate, createPersistor} from 'redux-persist'
import Icon from 'react-native-vector-icons/FontAwesome';
import LocalizedStrings from 'react-native-localization';
import {
    View, Text, StyleSheet, TouchableHighlight, DrawerLayoutAndroid,
    BackAndroid, TouchableNativeFeedback,
} from  'react-native';

const myIcon = (<Icon name="rocket" size={30} color="#900"/>)

import {
    AppRegistry,
} from 'react-native';

class MenuItemWithIcon extends Component {
    render() {

        var {icon, title, onPress}=this.props;
        return <TouchableNativeFeedback
            delayPressIn={0}
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('#aaa')}>
            <View style={{flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderBottomColor: '#555',
            borderBottomWidth: 1,
            maxHeight: 48

            }}>
                <View
                    style={{flex:1,height: 48,
                    paddingLeft:16,
                    paddingTop:8,
                    paddingRight:16
                    }}>
                    <Text style={{
                    color:"white",
                    fontSize:18,
                    fontFamily:"byekan"
                    }}>{title}</Text>
                </View>
                <View
                    style={{
                    width: 64,
                    height: 48,

                    paddingLeft:16,
                    paddingTop:12,
                    paddingRight:16
                    }}>
                    <Icon name={icon} size={24}
                          color="#EEE"/>

                </View>


            </View>
        </TouchableNativeFeedback>
    }
}


import {reducers} from "./modules/route/config"
import SplashScreen from 'react-native-splash-screen'
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const persistConfig = {whitelist: "test"};
const RouterWithRedux = connect()(Router);
const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

@connect(
    (state) => ({
        auth: state.auth,
        drawer: state.drawer
    }),
    (dispatch) => ({
        dispatch: dispatch,
    })
)
class Main extends Component {

    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings({
            en: {
                video: "Video",
                timeline: "Timeline",
                boiledEgg: "Boiled egg",
                softBoiledEgg: "Soft-boiled egg",
                choice: "How to choose the egg"
            },
            fa: {
                video: "ویدیو",
                timeline: "تایم لاین",
                boiledEgg: "Uovo sodo",
                softBoiledEgg: "Uovo alla coque",
                choice: "Come scegliere l'uovo"
            }
        });
    }

    goToHome = () => {
        Actions.home();
        this._drawer.close();
//            Notification.create({subject: 'Hey', message: 'Yo! Hello world.', smallIcon: 'ic_stat_rasanak_trans',color:"#CC02FF",category:"event"});
        // Listen to notification-clicking events
        /*Notification.addListener('press', function (e) {
         console.log(e);
         });*/

    };

    goToTutor = () => {
        Actions.tutor();
        this._drawer.close();
//            Notification.create({subject: 'Hey', message: 'Yo! Hello world.', smallIcon: 'ic_stat_rasanak_trans',color:"#CC02FF",category:"event"});
        // Listen to notification-clicking events
        /*Notification.addListener('press', function (e) {
         console.log(e);
         });*/

    };

    goToFaq = () => {
        Actions.faq();
        this._drawer.close();


    };


    goToVideo = ()=> {
        Actions.video();
        this._drawer.close();
        // Listen to notification-clicking events

    };

    goToRegister = ()=> {
        // Listen to notification-clicking events
        Actions.register();
        this._drawer.close();
    };

    goToLogin = ()=> {
        Actions.login();
        this._drawer.close();
        // Listen to notification-clicking events

    };

    goToSettings = ()=> {
        Actions.settings();
        this._drawer.close();
        // Listen to notification-clicking events

    };

    goToTransfer = ()=> {
        Actions.transfer();
        this._drawer.close();
        // Listen to notification-clicking events

    };

    goToTimeLine = () => {
        Actions.timeline();
        this._drawer.close();

    };

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };


    render() {

        this.strings.setLanguage('fa');
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#333'}}>
                <View style={{flex: 1, paddingTop:200}}>


                    <MenuItemWithIcon icon="user-plus" title="ورود/ثبت نام" onPress={this.goToLogin}/>
                    <MenuItemWithIcon icon="cloud-download" title="تنظیمات" onPress={this.goToSettings}/>
                    <MenuItemWithIcon icon="cloud-download" title="معرفی" onPress={this.goToTutor}/>
                    <MenuItemWithIcon icon="cloud-download" title="سوالات متداول" onPress={this.goToFaq}/>
                    <MenuItemWithIcon icon="sign-out" title="خروج" onPress={this.goToLogin}/>

                </View>
            </View>);

        var toggle = Commons.BuildNamedAction("DRAWER_RECORD", "open");
        return (

            <Drawer
                open={this.props.drawer? this.props.drawer.open: false}
                type="displace"
                side="right"
                content={navigationView}
                openDrawerOffset={100}
                captureGestures ={false}
                tapToClose={true}
                tweenHandler={Drawer.tweenPresets.parallax}
                styles={drawerStyles}
                onClose={()=>this.props.dispatch(toggle(false))}
                ref={(c) => this._drawer = c}>

                <View
                    style={{flex:1,position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}>
                    <RouterWithRedux sceneStyle={{backgroundColor:'#F7F7F7'}}>
                        <Scene key="root" unmountScenes>
                            <Scene key="login" hideNavBar component={Login} title="ورود/ثبت نام" duration={0}/>
                            <Scene key="transfer" component={Transfer} initial={true} title="واریزک"
                                   duration={0}/>
                            <Scene key="settings" component={Settings} title="تنظیمات" duration={0}/>
                            <Scene key="register" component={Register} title="ثبت نام" duration={0}/>
                            <Scene key="tutor" hideNavBar component={Slides} duration={0}/>
                            <Scene key="faq" component={Faq} duration={0}/>
                            <Scene key="contacts" component={Contacts} duration={0}/>
                        </Scene>
                    </RouterWithRedux>


                </View>
            </Drawer>


        );
    }

}


getStoredState(persistConfig, (err, restoredState) => {
    const store = createStoreWithMiddleware(combineReducers({routes, ...reducers}), restoredState);
    const persistor = createPersistor(store, persistConfig);
    class Varizak extends Component {
        render() {
            return (
                <Provider store={store}>
                    <Main></Main>
                </Provider>
            );
        }
    }
    AppRegistry.registerComponent('Varizak', () => Varizak);
});





