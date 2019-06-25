import * as React from 'react'
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'
import {HomeScreen} from "../screens/Home/HomeScreen";
import {HistoryScreen} from "../screens/History/HistoryScreen";
import {MapScreen} from "../screens/Map/MapScreen";
import {MoreScreen} from "../screens/more/MoreScreen";
import {colors} from "../vars";
import {TabBar} from "./Tabbar/Tabbar";
import {LoginScreen} from "../screens/Login/LoginScreen";

const AppTabBar = createBottomTabNavigator(
    {
        HomeScreen,
        HistoryScreen,
        MapScreen,
        MoreScreen,
    },
    {
        initialRouteName: 'HomeScreen',
        tabBarOptions: {
            activeTintColor: colors.label_blue_light,
            inactiveTintColor: colors.light_blue_grey,
        },
        tabBarComponent: props => <TabBar {...props} />,
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
        Login
    },
    {
        initialRouteName: 'AppTabBar',
    }
);

export const AppNavigator = createAppContainer(App);