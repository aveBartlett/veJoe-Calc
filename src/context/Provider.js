import React, { createContext } from "react";
import { AVALANCHE_MAINNET_PARAMS } from "../util/Constants";

export const MainContext = createContext();

class MainProvider extends React.Component {
  state = {
    main: {
      network: AVALANCHE_MAINNET_PARAMS,
      accountDetails: {},
      boostedFarms: {},
      joeTokenList: {},
    },
  };

  render() {
    return (
      <MainContext.Provider
        value={{
          main: this.state.main,
          setNetwork: (network) => {
            this.setState((prevState) => ({
              main: {
                ...prevState.main,
                network,
              },
            }));
          },
          setAccountDetails: (accountDetails) => {
            this.setState((prevState) => ({
              main: {
                ...prevState.main,
                accountDetails,
              },
            }));
          },
          setBoostedFarms: (boostedFarms) => {
            this.setState((prevState) => ({
              main: {
                ...prevState.main,
                boostedFarms,
              },
            }));
          },
          setJoeTokenList: (joeTokenList) => {
            this.setState((prevState) => ({
              main: {
                ...prevState.main,
                joeTokenList,
              },
            }));
          },
        }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

export default MainProvider;
