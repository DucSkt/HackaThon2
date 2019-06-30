import * as React from 'react'
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'
import {HomeScreen} from "../screens/Home/HomeScreen.js";
import {HistoryScreen} from "../screens/History/HistoryScreen.js";
import {MapScreen} from "../screens/Map/MapScreen.js";
import {MoreScreen} from "../screens/more/MoreScreen.js";
import {CameraScreen} from "../screens/camera/CameraScreen";
import {colors} from "../vars";
import {TabBar} from "./Tabbar/Tabbar";
import {LoginScreen} from "../screens/Login/LoginScreen.js";

const AppTabBar = createBottomTabNavigator(
    {
        HomeScreen,
        HistoryScreen,
        CameraScreen,
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