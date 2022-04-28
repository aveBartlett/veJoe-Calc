import { BigNumber, Contract, getDefaultProvider } from "ethers";
import { MORALIS_MAINNET_RPC } from "../Constants";
import FarmLens_abi from "./abis/FarmLens_abi.json";
import { FARMLENS_ADDRESS } from "../Constants";

const provider = getDefaultProvider(MORALIS_MAINNET_RPC);

const farmLensContract = new Contract(FARMLENS_ADDRESS, FarmLens_abi, provider);

export const getTokenPrice = async (address) => {
  const data = await farmLensContract.getTokenPrice(address);

  return data / 10 ** 18;
};
