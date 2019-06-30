import * as React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {AppContext} from "../App/AppContext";
import {withContext} from "../../shared/withContext";
import ImagePicker from 'react-native-image-crop-picker'

@withContext(AppContext.Consumer)
export class HomeScreen extends React.PureComponent {

    handle = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
    }

  render() {
    return (
      <View style={{marginTop: 50}} >
       <TouchableOpacity onPress={()=> {this.handle()}} >
           <Text>Home Screen</Text>
       </TouchableOpacity>

        <Text>{this.props.name}</Text>
      </View>
    )
  }
}