/**
 * Created by Shimo on 2018/5/29.
 * 分离页面组件，创建组件代码模板。
 */
import React from 'react';
import {StyleSheet, View, Image, DeviceEventEmitter} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import MyPage from './MyPage';
import FavoritePage from './FavoritePage';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'popular'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'popular'}
                        title="最热"
                        selectedTitleStyle={{color: '#63B8FF'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../asset/images/ic_popular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                                                         source={require('../asset/images/ic_popular.png')}/>}
                        onPress={() => this.setState({selectedTab: 'popular'})}>
                        {/*<View style={{backgroundColor: 'red', flex: 1}}></View>*/}
                        {/*<PopularPage />*/}
                        <PopularPage {...this.props} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'trending'}
                        title="趋势"
                        selectedTitleStyle={{color: '#63B8FF'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../asset/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                                                         source={require('../asset/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'trending'})}>
                        {/*<View style={{backgroundColor: 'yellow', flex: 1}}></View>*/}
                        <TrendingPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'favorite'}
                        title="收藏"
                        selectedTitleStyle={{color: '#63B8FF'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../asset/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                                                         source={require('../asset/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'favorite'})}>
                        {/*<View style={{backgroundColor: 'green', flex: 1}}></View>*/}
                        <FavoritePage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'my'}
                        title="我的"
                        selectedTitleStyle={{color: '#63B8FF'}}
                        renderIcon={() => <Image style={styles.icon} source={require('../asset/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#63B8FF'}]}
                                                         source={require('../asset//images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'my'})}>
                        {/*<View style={{backgroundColor: 'blue', flex: 1}}></View>*/}
                        {/*<MyPage />*/}
                        <MyPage {...this.props} />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    };

    componentDidMount() {
        //添加事件监听
        this.listener = DeviceEventEmitter.addListener('HOMEPAGE_RELOAD', (n) => {
            //主页重新加载
            //跳转到新的场景，并且重置整个路由栈
            this.props.navigator.resetTo({
                component: HomePage
            });
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 26,
        height: 26
    }
});
