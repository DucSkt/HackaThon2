import * as React from 'react'
import { View } from 'react-native'
import { Input, Row, Item, Container, Header, Title, CheckBox, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export class SettingScreen extends React.PureComponent {

  render() {
    return (
      <Container style={{ paddingBottom: 16 }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Chatbot</Title>
          </Body>
          <Right >

            <Button transparent onPress={() => this.props.navigation.navigate("SettingScreen")}>
              <Text>
                Setting
            </Text>
            </Button>
          </Right>
        </Header>
      </Container>
    )
  }
}