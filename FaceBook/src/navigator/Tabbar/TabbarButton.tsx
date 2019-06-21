import * as React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'

export class Tabbar extends React.PureComponent {

  render() {
    const { title, source } = this.props
    return (
      <TouchableOpacity>
         <Image source={source} />
         <Text>{title}</Text>
      </TouchableOpacity>
    )
  }
}