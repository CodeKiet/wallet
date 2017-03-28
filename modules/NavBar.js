'use strict';


import {View, Text, StyleSheet, TouchableHighlight,TouchableNativeFeedback} from  'react-native';
import React, {Component} from 'react';

import Button from 'react-native-button';
import {Actions, Router, Route, Animations, Schema} from 'react-native-redux-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';


class BackButton extends React.Component {

    onPressButton() {
        Actions.pop()
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)} >
                <View style={{width:56, padding:5, paddingLeft:16}}>
                    <Icon name="arrow-left" size={30} color="white"/>
                </View>
            </TouchableNativeFeedback>

        )
    }

}

function increment() {
    return {
        type: "INCREMENT"
    };
}



class MenuButton extends React.Component {

    onPressButton() {

    }

    render() {
        console.log(this.props.state)
        return (
        <TouchableNativeFeedback useForeground={true} delayPressIn={0}
            onPress={this.onPressButton.bind(this)}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
            <View style={{width:56, padding:5, paddingLeft:16}}>
                <Icon name="bars" size={30} color="white"/>
            </View>
        </TouchableNativeFeedback>



        )
    }

}

MenuButton = connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(increment, dispatch)
    })
)(MenuButton);



class NavBarBase extends React.Component {
    onPrev() {
        var Actions = this.props.routes;
        if (this.props.onPrev) {
            this.props.onPrev();
            return;
        }
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
            Actions.pop();
        }
    }

    render() {
        var Actions = this.props.routes;
        console.log("Props : " + this.props);
        return <NavigationBar style={styles.navBar}
                              titleColor='#fff'
                              buttonsColor='white'
                              statusBar={{style:'light-content', hidden: false}}
                              title={<Text style={{color:"white", fontSize:18}}>{this.props.title}</Text>}
                              prevTitle={this.props.initial ? " " : null}
                              leftButton={this.props.leftButton ? this.props.leftButton : {title:''}}
                              rightButton={this.props.rightButton ? this.props.rightButton : {title:''}}


        />
    }
}
class NavBar extends React.Component {


    render() {
        var Actions = this.props.routes;
        return <NavBarBase customNext={<View/>} {...this.props} rightButton={<MenuButton/>} leftButton={<BackButton/>}/>
    }
}


class NavBarModal extends React.Component {
    render() {
        var Actions = this.props.routes;
        return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props}
                           rightButton={{title:'Close', handler:this.props.onNext || Actions.pop}}/>
    }
}

var styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#CC02FF'
    },
});


module.exports = {NavBar, NavBarModal};