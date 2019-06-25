import * as React from "react";
import { AppContext } from "./AppContext";
import { AppNavigator } from "../../navigator/AppNavigator";
import { NavigationScreenProp } from "react-navigation";

// default props
const defaultProps = {};

// define type
type DefaultProps = typeof defaultProps;

type AppProps = Partial<{
  navigation: NavigationScreenProp<any, any>;
  children: JSX.Element | JSX.Element[];
}> &
  DefaultProps;

export type AppState = Partial<{
  name: string;
}>;

export type AppContextState = Partial<{}> & AppState;

const initialState = {
  name: "duc"
};

export class AppContainer extends React.PureComponent<AppProps, AppState> {
  readonly state: AppState = initialState;
  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state
        }}
      >
        <AppNavigator />
      </AppContext.Provider>
    );
  }
}
