import * as React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { GioiThieuScreen } from '../screens/gioi-thieu/GioiThieuScreen'
import { TrangChuScreen } from '../screens/trang-chu/TrangChuScreen'
import { TuyenSinhScreen } from '../screens/tuyen-sinh/TuyenSinhScreen'
const App = createStackNavigator(
  {
    GioiThieuScreen,
    TrangChuScreen,
    TuyenSinhScreen,
  },{
    initialRouteName: 'GioiThieuScreen',
    headerMode: 'none',
  },
)

export const AppNavigator = createAppContainer(App)