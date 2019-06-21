import * as React from 'react'
import { AppContext } from './AppContext'
import { AppNavigator } from '../../navigator/AppNavigator'
export class AppContainer extends React.PureComponent{

  render() {
    return (
         <AppNavigator/>
    )
  }

}