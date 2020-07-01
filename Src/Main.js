import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icons from 'react-native-vector-icons/Feather';

import Home from './Screens/Home/Home';
import Name from './Screens/Name/Name';
import Word from './Screens/Word/Word';
import History from './Screens/History/History';

const tabBarIcon = name => ({ tintColor }) => (
    <Icons style={{ backgroundColor: 'transparent' }} name={name} color={tintColor} size={25} />
);

const BottomNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: tabBarIcon('home'),
            title: "Anasayfa",

        })
    },
    History: {
        screen: History,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: tabBarIcon('repeat'),
            title: "Geçmiş"
        })
    },
}, {
    backBehavior: 'history',
    initialRouteName: 'Home',
    shifting: true,
});

const MainNavigator = createStackNavigator({
    BottomNavigator: {
        screen: BottomNavigator,
        path: 'home',
        navigationOptions: ({ navigation }) => ({ headerShown: false, })
    },
    Name: {
        screen: Name,
        navigationOptions: {
            title: 'İsim Sorgula',
        }
    },
    Word: {
        screen: Word,
        navigationOptions: {
            title: 'Sözcük Sorgula',
        }
    },
}, {
    backBehavior: 'history',
    initialRouteName: 'BottomNavigator',
    defaultNavigationOptions: {
        headerShown: true,
    }
});

export default createAppContainer(MainNavigator);