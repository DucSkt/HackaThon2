import * as React from 'react'
import { TouchableOpacity, KeyboardAvoidingView, Keyboard, Switch, View, ActivityIndicator } from 'react-native'
import { Input, Row, Item, Container, Header, Title, CheckBox, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import { images } from '../../vars/images';
import ImagePicker from 'react-native-image-picker';
import Voice from 'react-native-voice';
import { Tooltip } from 'react-native-elements'
import axios from 'axios'

export class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    Voice.onSpeechResults = this.onSpeechResultsHandler;
  }
  state = {
    messages: [],
    text: "",
    language: "vi-VN"
  }

  options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  componentWillMount() {
    //this.onSendMessageAPI("đau bụng, đau đầu")
    this.setState({
      messages: [
        {
          _id: new Date().getMilliseconds,
          text: 'Xin chào. Hãy cho tôi biết bạn bị triệu chứng gì?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
          },
        },
      ],
    })
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  render() {
    return (
      <Container style={{ paddingBottom: 16 }}>
        <Header>
          <Left>
            <Row>
              <Button transparent>
                <Icon name='information-circle-outline' />
              </Button>
            </Row>
          </Left>
          <Body>
            <Title>Chatbot</Title>
          </Body>
          <Right >

            <Button transparent onPress={null}>
              <Icon name='call' />
            </Button>

            <Tooltip
              width={190}
              backgroundColor="#e0f2f1"
              popover={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ marginRight: 16, textAlign: 'left' }}>{this.state.language == "vi-VN" ? "VietNamese" : "English"}</Text>
                <Switch value={this.state.language == "vi-VN"} onValueChange={(value) => this.setState({ language: value ? "vi-VN" : "en-US" })} />
              </View>}>
              <Button transparent disabled>
                <Icon name='settings' />
              </Button>
            </Tooltip>

          </Right>
        </Header>
        <GiftedChat
          inverted
          renderInputToolbar={(props) => {
            return <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={80} >
              <Row style={{ marginBottom: -16, alignItems: 'center', paddingRight: 16, paddingLeft: 8, borderTopWidth: 0.5, borderTopColor: "#8492A6" }}>
                <Icon name="camera" style={{ fontSize: 30, alignSelf: 'center', padding: 10, color: "#8492A6" }} onPress={this.takePhoto} />
                <Icon name="images" style={{ fontSize: 30, alignSelf: 'center', padding: 10, color: "#8492A6" }} onPress={this.pickImage} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPressOut={this.onSpeechEnd}
                  onPressIn={this.onSpeechStart} >
                  <Icon name="mic" style={{ fontSize: 30, alignSelf: 'center', padding: 10, color: "#8492A6" }} />

                </TouchableOpacity>
                <Input
                  value={this.state.text} placeholder="Type message..." onChangeText={(newText) => this.setState({ text: newText })} />
                <Icon name="send" style={{ fontSize: 30, padding: 4, color: "#8492A6" }} onPress={() => {
                  this.state.text && props.onSend({ text: this.state.text.trim() }, true)
                  this.onSendMessageAPI(this.state.text.trim())

                }

                } />
              </Row>
            </KeyboardAvoidingView>

          }}
          messages={this.state.messages}
          onSend={messages => {

            this.onSend(messages)
          }}
          user={{
            _id: 1,
          }}
        />

      </Container >
    )
  }

  onSpeechResultsHandler = (e) => {
    console.log('onSpeechResults: ', e);
    this.setState({ text: e.value[0] });
  }

  onSpeechEnd = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  onSpeechStart = async () => {
    try {
      await Voice.start(this.state.language);
    } catch (e) {
      console.error(e);
    }
  };

  onSend(messages = []) {
    this.setState(previousState => {
      return ({
        messages: GiftedChat.append(previousState.messages, messages),
      })
    })
  }

  takePhoto = () => {
    Keyboard.dismiss();
    ImagePicker.launchCamera(this.options, this.onGetImageResponse);
  }

  pickImage = () => {
    Keyboard.dismiss();
    // Open Image Library:
    ImagePicker.launchImageLibrary(this.options, this.onGetImageResponse);
  }

  onGetImageResponse = (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.onSend({
        _id: new Date().getMilliseconds(),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        image: response.uri,
      })
    }
  }

  onSendMessageAPI = (text) => {
    if (!text.trim()) return;
    if (text.trim().length < 15) {
      this.setState({
        messages: [
          {
            _id: new Date().getMilliseconds(),
            text: "Bạn vui lòng cung cấp thêm thông tin cho chúng tôi...",
            createdAt: new Date(),
            user: {
              _id: new Date().getMilliseconds(),
              name: 'Bot',
            },
          }, ...this.state.messages
        ],
      })
      return;
    }

    axios.get("https://ptitteam.com/AI_HACKATHON2019/apiChat.php?msg=" + text).then(
      (response) => {
        let { data } = response;
        let benh = ""
        if (data.length > 0) {
          benh = `Chúng tôi tìm thấy ${data.length} kết quả:\n`
        }
        data.forEach((sick, index) => {

          benh += "" + (index + 1) + ". " + sick.content + "\n"
        })
        this.setState({
          messages: [
            {
              _id: new Date().getMilliseconds(),
              text: data.length > 0 ? benh.trim() : "Không tìm thấy bệnh phù hợp",
              createdAt: new Date(),
              user: {
                _id: new Date().getMilliseconds(),
                name: 'Bot',
              },
            }, ...this.state.messages
          ],
          text: ""
        })
        console.log("Success")

        console.log(JSON.stringify(response))
      }
    ).catch((e) => {
      console.log("Error")
      console.log(JSON.stringify(JSON.stringify(e)))
    })
  }
}