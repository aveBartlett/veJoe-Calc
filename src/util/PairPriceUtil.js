import { pointFromVector } from "popmotion";
import { WAVAX_ADDRESS, stables } from "./Constants";
import { getTokenPrice } from "./contracts/FarmLensContract";

export const getPairValue = async (pairDetail) => {
  const token0id = pairDetail.token0.id;

  const token0Price = await getTokenPrice(token0id);
  console.log();

  return token0Price * pairDetail.token0Price * 2;
};

// export const revertUsdToJLP = (selectedBoostedFarm, amount, reserves) => {
//   if (isUsdStable(selectedBoostedFarm.pairDetail.token0.id)) {
//     return amount /reserves *
//   }
//   const liquidity = Math.min(
//     (amount0 * 10 ** Number.parseInt(pool_data.token0Decimals)) / reserves[0],
//     (amount1 * 10 ** Number.parseInt(pool_data.token1Decimals)) / reserves[1]
//   );
//   return liquidity * pool_data.totalSupply;
// };

// const isUsdStable = (address) => {
//   for (const stableAddress of stables) {
//     if (stableAddress === address) {
//       return true;
//     }
//   }
// };
