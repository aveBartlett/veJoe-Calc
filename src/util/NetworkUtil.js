import {
  networks,
  AVALANCHE_MAINNET_PARAMS,
  AVALANCHE_TESTNET_PARAMS,
  AVALANCHE_LOCAL_PARAMS,
} from "./Constants";

export const getNetworkFromChainId = (chainId) => {
  if (!chainId) return;

  for (const network of networks) {
    if (chainId.toUpperCase() === network.chainId.toUpperCase()) {
      return network;
    }
  }
};

export const isChainIdValid = (chainId) => {
  for (const network of networks) {
    if (chainId && chainId.toUpperCase() === network.chainId.toUpperCase()) {
      return true;
    }
  }
  return false;
};

export function addAvalancheNetwork(network) {
  window.ethereum
    .request({
      method: "wallet_addEthereumChain",
      params: [
        network === "main"
          ? AVALANCHE_MAINNET_PARAMS
          : network === "test"
          ? AVALANCHE_TESTNET_PARAMS
          : AVALANCHE_LOCAL_PARAMS,
      ],
    })
    .catch((error) => {
      console.log(error);
    });
}
