/**
 * Created by Song on 2018/6/5.
 * 行组件ProjectRow的实现。
 * 行组件ProjectRow的数据展示，数据格式要一致。
 */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class ProjectRow extends React.Component {
    static defaultProps = {
        items: {}
    };
    render() {
        const items = this.props.item;
        {/*<View style={styles.container}>*/}
        {/*<Text>{item.full_name}</Text>*/}
        {/*</View>*/}
        return (
        <TouchableOpacity
            onPress = {this.props.onSelect}
            activeOpacity={0.5}>
            <View style={styles.container}>

                <Text style={styles.title}>{items.full_name}</Text>
                <Text style={styles.description}>{items.description}</Text>

                <View style={styles.bottom}>
                    <View style={styles.bottomTextWrapper}>
                        <Text>Issue 数：</Text>
                        {/*<Image style={{width:22,height:22}} source={{}}/>*/}
                        <Text>{items.open_issues_count}</Text>
                    </View>
                    <View style={styles.bottomTextWrapper}>
                        <Text>Star 星：</Text>
                        <Text>{items.stargazers_count}</Text>
                    </View>
                    <Image source={require("../../app/asset/images/ic_unstar_transparent.png")} style={{width:22,height:22}}/>
                </View>

            </View>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF',
        flexDirection:'column',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:5,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowRadius:1, //阴影半径
        shadowOpacity:0.4,
        elevation:2 //Android 投影
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    },
    bottom:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    bottomTextWrapper:{
        flexDirection:'row',
        alignItems:'center'
    }
});
