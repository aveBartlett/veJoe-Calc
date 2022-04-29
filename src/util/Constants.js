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

export const BOOSTED_MASTERCHEF_ADDRESS =
  "0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F";

export const FARMLENS_ADDRESS = "0xF16d25Eba0D8E51cEAF480141bAf577aE55bfdd2";

export const BOOSTED_MASTERCHEF_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/boosted-master-chef";

export const MASTERCHEF_V2_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/masterchefv2";

export const VEJOE_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/vejoe";

export const EXCHANGE_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange";

export const JOE_TOKEN_LIST_URL =
  "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json";

export const MORALIS_MAINNET_RPC =
  "https://speedy-nodes-nyc.moralis.io/543b50e7bb5ca4f50c9df822/avalanche/mainnet";

export const MAINNET_RPC = "https://api.avax.network/ext/bc/C/rpc";

export const WAVAX_ADDRESS = "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";

export const WAVAX_USDC_ADDRESS = "0xf4003f4efbe8691b60249e6afbd307abe7758adb";

export const MIM_ADDRESS = "0x130966628846bfd36ff31a822705796e8cb8c18d";

export const USDt_ADDRESS = "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7";

export const USDC_ADDRESS = "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e";

export const USDTe_ADDRESS = "0xc7198437980c041c805a1edcba50c1ce5db95118";

export const USDCe_ADDRESS = "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664";

export const stables = [
  MIM_ADDRESS,
  USDt_ADDRESS,
  USDC_ADDRESS,
  USDTe_ADDRESS,
  USDCe_ADDRESS,
];
