/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * WebView的onNavigationStateChange显示自身的控制权限范围。
 * 项目详情页WebView使用，以及状态提升，ProjectRow使用onSelect。
 * @flow
 * 代码拆分，便于扩展。
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, WebView, TouchableOpacity, Image} from 'react-native';
import NavigationBar from '../components/NavigationBar';


export default class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.state= {canGoBack: false}
    }
    handleBack = () => {
        if(this.state.canGoBack){
            this.refs.webview.goBack();
        }else{
            this.props.navigator.pop();
        }
    };
    getNavLeftBtn = ()=>{
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../app/asset/images/ic_arrow_back_white_36pt.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
        </View>;
    };
    getNavRightBtn = ()=>{
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={0.5}>
                <Image
                    style={{width:20,height:20,marginRight:10,tintColor:'#FFF'}}
                    source={require('../../app/asset/images/ic_share.png')}/>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
                <Image
                    style={{width:20,height:20,marginRight:10,tintColor:'#FFF'}}
                    source={require('../../app/asset/images/ic_unstar_transparent.png')}/>
            </TouchableOpacity>
        </View>;
    };
    handleNavStateChange = (s) => {
        //当前WebView是否能够返回,存入状态
        this.setState({canGoBack: s.canGoBack})
    };
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.title}
                    leftButton={this.getNavLeftBtn()}
                    rightButton={this.getNavRightBtn()}/>

                <WebView
                    ref="webview"
                    startInLoadingState={true}
                    source={{uri:this.props.url}}
                    onNavigationStateChange={this.handleNavStateChange}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
