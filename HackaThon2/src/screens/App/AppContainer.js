import * as React from "react";
import { AppContext } from "./AppContext";
import { AppNavigator } from "../../navigator/AppNavigator";

export class AppContainer extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            name: "duc skt"
        }
    }
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
