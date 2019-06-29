import * as React from 'react'
import { View, Image } from 'react-native'
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { metrics, images } from '../../vars';
import LoadingAnimation from './LoadingAnimation';

export class WelcomeScreen extends React.PureComponent {
  state = { appReady: false }
  renderContent = () => {
    return <Container style={{ flex: 5 }}>
      <View style={{ flex: 3 }}>
        <Image style={{ flex: 1, width: null, height: null, backgroundColor: "#E5E9F2" }} source={0} />

      </View>
      <View style={{ flex: 2 }}>
        <Text style={{ color: "#47525E", fontSize: 32, marginTop: 24, marginBottom: 16, textAlign: 'center' }}>Welcome</Text>
        <Text note style={{ textAlign: 'center' }}>{`Healthcare chatbot has created by Team Baby Shark\nThank for using our application`}</Text>
        <Button onPress={() => this.props.navigation.navigate("HomeScreen")} block success style={{ marginTop: 36, marginHorizontal: 80, backgroundColor: "#47525E" }}>
          <Text>Start Chatbot</Text>
        </Button>
      </View>
    </Container >
  }
  componentDidMount() {
    setTimeout(() => this.setState({ appReady: true }), 2000)
  }
  render() {
    return (
      <LoadingAnimation
        isLoaded={this.state.appReady}
        imageSource={images.shark}
        backgroundStyle={{ backgroundColor: "#ffcdd2" }}

      >
        {this.renderContent()}
      </LoadingAnimation>


    )
  }
}