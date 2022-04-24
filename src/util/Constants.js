// -------------------------
// CHAIN CONSTANTS
//--------------------------

export const AVALANCHE_MAINNET_PARAMS = {
  chainId: "0xA86A",
  chainName: "Avalanche Mainnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io/"],
};

export const AVALANCHE_TESTNET_PARAMS = {
  chainId: "0xA869",
  chainName: "Avalanche Testnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};

export const AVALANCHE_LOCAL_PARAMS = {
  chainId: "0xA868",
  chainName: "Avalanche Local C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://localhost:9650/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};

export const AVALANCHE_MORALIS_PARAMS = {
  chainId: "0xA868",
  chainName: "Avalanche Local C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: [
    "https://speedy-nodes-nyc.moralis.io/543b50e7bb5ca4f50c9df822/avalanche/mainnet",
  ],
  blockExplorerUrls: ["https://snowtrace.io/"],
};

export const networks = [
  AVALANCHE_LOCAL_PARAMS,
  AVALANCHE_MAINNET_PARAMS,
  AVALANCHE_MORALIS_PARAMS,
  AVALANCHE_TESTNET_PARAMS,
];

export const SECONDS_IN_YEAR = 60 * 60 * 24 * 365;

export const VEJOE_TOKEN_ADDRESS = "0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456";

export const VEJOE_SHARE = 0.4;

export const BOOSTED_MASTERCHEF_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/boosted-master-chef";

export const MASTERCHEF_V2_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/masterchefv2";

export const VEJOE_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/vejoe";

export const EXCHANGE_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange";
