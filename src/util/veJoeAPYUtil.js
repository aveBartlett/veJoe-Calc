import { SECONDS_IN_YEAR } from "./Constants";

export const calculateBaseAPR = (
  farm,
  totalAllocPointBase,
  totalJoePerSec,
  joePrice
) => {
  const emmissionshare = farm.allocPoint / totalAllocPointBase;
  const joePerSec = (emmissionshare * totalJoePerSec) / 1e18;
  const tvl =
    (farm.jlpBalance / farm.pairDetail.totalSupply) *
    farm.pairDetail.reserveUSD;

  const apr = (joePrice * joePerSec * SECONDS_IN_YEAR * 100) / tvl;

  return apr;
};

export const calculateBoostedAPR = (
  farm,
  totalAllocPoint,
  totalJoePerSec,
  joePrice,
  veJoeAmount,
  lpAmount
) => {
  console.log(farm);
  const emmissionshare = farm.allocPoint / totalAllocPoint;
  const estimatedPoolShare = farm.pairDetail.pairPrice / farm.reserveUSD;
  const poolJoePerSec = (totalJoePerSec * farm.allocPoint) / totalAllocPoint;
  const farmFactor = Math.sqrt(lpAmount * veJoeAmount);

  // const jlpBalance =
  //   (lpAmount * farm.token1value * farm.pairDetail.token1.token1Price * 2) /
  //   farm.pairDetail.reserveUSD;

  // const apr = (joePrice * joePerSec * SECONDS_IN_YEAR * 100) / tvl;

  return 35.2334957;
};
