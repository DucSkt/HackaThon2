import { AppContainer } from './src/screens/App/AppContainer'
import { YellowBox } from 'react-native'
import 'react-native-console-time-polyfill'

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Module RNFetchBlob',
  'Setting a timer',
])

export default AppContainer
