import { colors, images, metrics } from '../../vars'
import * as React from 'react'
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { TabBarButton } from './TabbarButton'
import { Dimension, Orientation } from '../../services/dimension'
import { Subscription } from 'rxjs'

type TabBarProps = {
  activeTintColor: string
  inactiveTintColor: string
  jumpTo(key: string): void
  navigation: NavigationScreenProp<any, any>
}

export class TabBar extends React.PureComponent<TabBarProps> {
  _subscription: Subscription
  marginBottom = 62

  readonly state = {
    dimension: Dimension.isPortrait
      ? Orientation.Portrait
      : Orientation.Landscape,
    cameraButtonLeft: Dimensions.get('window').width / 2 - 32.5,
  }

  componentDidMount() {
    this._subscription = Dimension.onChange().subscribe((value: any) => {
      if (this.state.dimension !== value) {
        const dim = Dimensions.get('screen')
        // @ts-ignore
        this.setState({
          dimension: value,
          cameraButtonLeft: dim.width / 2 - 32.5,
        })
      }
    })
  }

  componentWillUnmount() {
    this._subscription && this._subscription.unsubscribe()
  }

  render() {
    const {
      activeTintColor,
      inactiveTintColor,
      jumpTo,
      navigation,
    } = this.props
    const { cameraButtonLeft } = this.state
    const currentIndex = navigation.state.index

    const setTintColor = (currentIndex: number, screenIndex: number) =>
      currentIndex === screenIndex ? activeTintColor : inactiveTintColor

    return (
      <>
        <View style={styles.container}>
          <TabBarButton
            title="Home"
            source={images.home}
            tintColor={setTintColor(currentIndex, 0)}
            onPress={() => jumpTo('HomeScreen')}
          />

          <TabBarButton
            title="History"
            source={images.product}
            tintColor={setTintColor(currentIndex, 1)}
            onPress={() => jumpTo('HistoryScreen')}
          />

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[styles.buttonCamera, { left: cameraButtonLeft }]}
            onPress={() => navigation.navigate('CameraScreen')}
          >
            <Image source={images.camera} style={styles.camera} />
          </TouchableOpacity>

          <TabBarButton
            title="Map"
            source={images.company}
            tintColor={setTintColor(currentIndex, 2)}
            onPress={() => jumpTo('MapScreen')}
          />

          <TabBarButton
            title="More"
            source={images.project}
            tintColor={setTintColor(currentIndex, 3)}
            onPress={() => jumpTo('MoreScreen')}
            // onPress={() => jumpTo('ProfileScreen')}
            // onPress={() => this.props.navigation.openDrawer()}
          />
        </View>
        {/*<AToast height={this.marginBottom} />*/}
      </>
    )
  }
}

const styles = StyleSheet.create<any>({
  container: {
    height: 62,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 0.7,
    borderTopColor: colors.pale_grey,
  },
  buttonCamera: {
    position: 'absolute',
    top: '-25%',
    height: metrics.home_footer_camera_size,
    width: metrics.home_footer_camera_size,
    backgroundColor: colors.label_blue_light,
    borderRadius: metrics.home_footer_camera_size,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: colors.camera_button,
        shadowOpacity: 1.0,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  camera: {
    height: metrics.home_footer_camera_height,
    width: metrics.home_footer_camera_width,
    tintColor: colors.white,
  },
})
