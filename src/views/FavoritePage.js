/**
 * Created by Shimo
 * https://github.com/shiheng2016
 * @author shimo
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from '../components/Button'
import {Demo1} from '../components/Demo1';
import {Demo2} from '../components/Demo2';

export default class FavoritePage extends React.Component {
    constructor(props) {
        super(props);
    }

    onPressDemo1 = () => {
        this.props.navigator.push({
            component: Demo1
        })
    };
    onPressDemo2 = () => {
        this.props.navigator.push({
            component: Demo2
        })
    };

    render() {
        return (
            <View style={styles.container}>
                {/*<Text>RN开发组件模板</Text>*/}
                <Button text={'Demo1'} onPress={this.onPressDemo1}/>
                <Button text={'Demo2'} style={styles.btn} onPress={this.onPressDemo2}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        marginTop: 20
    }
});