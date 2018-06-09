/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 代码拆分，便于扩展。
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet} from 'react-native';

import Root from './app/views/Root'


export default class MyApp extends Component {
    render() {
        return (
            <Root />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

AppRegistry.registerComponent('MyApp', () => MyApp);
