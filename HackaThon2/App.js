import { AppContainer } from './src/screens/App/AppContainer'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Module RNFetchBlob',
  'Setting a timer',
])

export default AppContainer
