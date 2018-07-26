/**
 * Copyright: Felix Bello
 */

import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import Routes from './src/config/Routes';

import {colors} from './src/config/colors'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor={colors.primary} barStyle={'light-content'}/>
                <Routes />
            </View>
        )
    }
}

