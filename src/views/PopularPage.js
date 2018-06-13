/**
 * Created by Shimo on 2018/5/29.
 * PopularPage的顶部状态栏实现。
 * FlatList组件数据加载过渡效果。
 *
 * 2018/06/05 自定义分类功能的实现。
 */
import React from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, Image, AsyncStorage} from 'react-native';


import ScrollableTabView from 'react-native-scrollable-tab-view'

import NavigationBar from '../components/NavigationBar'
import ProjectRow from '../components/ProjectRow'
import ProjectDetails from './ProjectDetails';

const popular_def_lans = require('../data/popular_def_lans.json');

//添加滚动列表react-native-scrollable-tab-view。

//包含两块内容，状态栏（静），滚动视图（动）
export default class PopularPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dataSource0: ['时间的导师', '干净的字迹', '泡在网上的日子'],
            // dataSource: [{key: '时间的导师'}, {key: '干净的字迹'}, {key: '泡在网上的日子'}],
            dataSource: [],
            languages: []
            // languages: ["Android", "IOS", "Java", "JavaScript"]    //优化滚动列表。
        };
        popular_def_lans.forEach(item => {
            if (item.checked) this.state.languages.push(item);
        })
    };

    getNavRightBtn = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    activeOpacity={0.7}>
                    <Image source={require('../asset/images/ic_search_white_48pt.png')}
                           style={{width: 24, height: 24}}/>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}>
                    <Image source={require('../asset/images/ic_more_vert_white_48pt.png')}
                           style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </View>
        )
    };
    //加载用户设置的语言分类数据
    loadLanguages = () => {
        AsyncStorage.getItem('custom_key')
            .then((value) => {
                // alert(value);
                if (value != null) {
                    this.setState({languages: JSON.parse(value)});
                }
            });
    };

    render() {
        return (
            <View style={styles.container}>
                {/*<View style={{backgroundColor: 'pink', flex:1}}></View>*/}

                {/*<View style={styles.statusBar}>*/}
                {/*<StatusBar*/}
                {/*hidden = {true}*/}
                {/*backgroundColor="blue"*/}
                {/*barStyle="light-content"/>*/}
                {/*</View>*/}
                {/*/!*顶部导航栏*!/*/}
                {/*<View style={styles.navBar}>*/}
                {/*<View style={styles.navBtn}></View>*/}
                {/*<View style={styles.titleWrapper}>*/}
                {/*<Text style={styles.title}>热门</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.rightBtn}>*/}
                {/*<TouchableOpacity*/}
                {/*activeOpacity={0.7}>*/}
                {/*<Image source={require('../asset/images/ic_search_white_48pt.png')} style={styles.navBtn}/>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity*/}
                {/*activeOpacity={0.7}>*/}
                {/*<Image source={require('../asset/images/ic_more_vert_white_48pt.png')} style={styles.navBtn}/>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*<NavigationBar/>*/}
                <NavigationBar title="热门" rightButton={this.getNavRightBtn()}/>
                {/*<View style={{backgroundColor: 'red', flex: 1}}></View>*/}
                {/*使用FlatList展示列表数据。*/}
                {/*<FlatList data={this.state.dataSource}*/}
                {/*renderItem={({item}) => <Text>{item.key}</Text>}/>*/}
                <ScrollableTabView
                    tabBarBackgroundColor="#63B8FF"
                    tabBarActiveTextColor="#006eff"
                    tabBarInactiveTextColor="#F5FFFA"
                    tabBarUnderlineStyle={{backgroundColor: "#E7E7E7", height: 2}}>
                    {/*<PopularTab tabLabel='IOS' />*/}
                    {/*<PopularTab tabLabel='Android'/>*/}
                    {/*<Text tabLabel='Java'>JAVA</Text>*/}
                    {/*<PopularTab tabLabel='Javascript'/>*/}
                    {
                        this.state.languages.map((item, i) => {
                            // return (<PopularTab key={`tab${i}`} tabLabel={item}/>)
                            return (item.checked) ? (<PopularTab {...this.props} key={`tab${i}`} tabLabel={item.name} />) : null
                        })
                    }
                </ScrollableTabView>
            </View>
        );
    }
    componentDidMount = ()=>{
        //读取数据
        this.loadLanguages();
    }
}

class PopularTab extends React.Component {
    static defaultProps = {
        tabLabel: 'JavaScript'
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{key: '时间的导师'}, {key: '干净的字迹'}, {key: '小二'}],
            isLoading: true //FlatList组件数据加载过渡效果。
        }
    }

    //FlatList组件添加key值使用keyExtractor。
    _keyExtractor = (item, index) => ('' + item.id + index);

    //使用fetch拿到github接口数据并列表展示加载数据
    loadData = () => {
        this.setState({isLoading: true});
        //请求网络
        // fetch('https://api.github.com/search/repositories?q=JavaScript&sort=stars')
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`) //动态列表
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                //更新dataSource
                this.setState({
                    dataSource: json.items,
                    isLoading: false //隐藏进度条
                })
            }).catch((error) => {
            console.log(error);
        }).done();
    };
    componentDidMount = () => {
        this.loadData();
    };
    handleRefresh = () => {
        this.loadData();
    };
    //列表拆分的过程。
    // renderRow = ({item}) => <Text>{item.full_name}</Text>;

    // renderRow = ({item}) => <ProjectRow item={item}/>;
    // 项目被选中，跳转到项目详情页面
    handleProjectSelect = (obj) => {
        this.props.navigator.push({
            component: ProjectDetails,
            params:{title:obj.full_name, url:obj.html_url}
        })
    };
    renderRow = ({item}) => <ProjectRow item={item} onSelect={()=>this.handleProjectSelect(item)} />;

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                // renderItem={({item}) => <Text>{item.key}</Text>
                // renderItem={({item}) => <Text>{item.full_name}</Text>}
                renderItem={this.renderRow}

                // refreshing = {this.state.isLoading}
                // onRefresh={this.handleRefresh}

                //同等效果RefreshControl组件，可定制。
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.handleRefresh}
                        tintColor="#63B8FF"
                        title="正在加载..."
                        titleColor="#63B8FF"
                        colors={['red', 'blue', 'yellow']}
                        progressBackgroundColor="green"
                    />
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor:'#63B8FF',
        // padding:5
    },
    // statusBar:{
    //     height:Platform.OS === 'ios' ? 20 : 0
    // },
    // navBar:{
    //     flexDirection:'row',
    //     justifyContent:'space-between',
    //     alignItems:'center'
    // },
    // titleWrapper:{
    //     flexDirection:'column',
    //     justifyContent:'center',
    //     alignItems:'center',
    //     position:'absolute',
    //     left:40,
    //     right:40,
    //     bottom:0
    // },
    // title:{
    //     fontSize:16,
    //     color:'#FFF'
    // },
    // navBtn:{
    //     width:24,
    //     height:24
    // },
    // rightBtn:{
    //     flexDirection:'row',
    //     alignItems:'center',
    //     paddingRight:8
    // }
});

