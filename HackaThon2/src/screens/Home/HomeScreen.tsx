import * as React from 'react'
import { View, Text } from 'react-native'
import {NavigationInjectedProps} from "react-navigation";
import {AppContextState} from "../App/AppContainer";
import {AppContext} from "../App/AppContext";
import {withContext} from "../../shared/withContext";

type Props = Partial<{}> &
    AppContextState &
    NavigationInjectedProps<{
      name: string,
        Tuoi: number
    }>

type State = Readonly<{}>

@withContext(AppContext.Consumer)
export class HomeScreen extends React.PureComponent<Props, State> {

  readonly state: State = {}

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}