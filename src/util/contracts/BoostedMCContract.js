import { BigNumber, Contract, getDefaultProvider } from "ethers";
import { MORALIS_MAINNET_RPC } from "../Constants";
import BoostedLP_abi from "./abis/Boosted_abi.json";
import { BOOSTED_MASTERCHEF_ADDRESS } from "../Constants";

const provider = getDefaultProvider(MORALIS_MAINNET_RPC);

const boostedMCContract = new Contract(
  BOOSTED_MASTERCHEF_ADDRESS,
  BoostedLP_abi,
  provider
);

export const getPoolInfo = async (address) => {
  const data = await boostedMCContract.poolInfo(address);

  return data;
};
