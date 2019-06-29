import * as React from 'react'
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'
import { HomeScreen } from "../screens/Home/HomeScreen";
import { WelcomeScreen } from "../screens/Welcome/WelcomeScreen";
import { SettingScreen } from "../screens/Setting/SettingScreen";
import { MoreScreen } from "../screens/more/MoreScreen";
import { colors } from "../vars";
import { TabBar } from "./Tabbar/Tabbar";
import { LoginScreen } from "../screens/Login/LoginScreen";

const AppTabBar = createStackNavigator(
    {
        HomeScreen,
        SettingScreen,
        MoreScreen,
    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none'
    }
);

const Login = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                title: 'Sign In',
                header: null,
            },
        },
    },
    {
        initialRouteName: 'LoginScreen',
        navigationOptions: {
            header: null,
        },
    }
);

const App = createSwitchNavigator(
    {
        AppTabBar,
        Login,
        WelcomeScreen,
    },
    {
        initialRouteName: 'WelcomeScreen',
    }
);

export const AppNavigator = createAppContainer(App);