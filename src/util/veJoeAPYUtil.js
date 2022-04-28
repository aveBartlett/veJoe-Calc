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

  //------------------------
  // This is possibly wrong, but the documentation was hard.
  // god bless
  const emmissionshare = farm.allocPoint / totalAllocPoint;
  const joePerSec = (totalJoePerSec * emmissionshare) / 1e18;

  const totalFactor = farm.pairDetail.totalFactor;
  const sqrtTokens = Math.sqrt(veJoeAmount * lpAmount) * 1e9;

  const numerator = sqrtTokens * (joePrice * joePerSec) * SECONDS_IN_YEAR * 100;

  const tvl = farm.jlpBalance / farm.pairDetail.totalSupply;

  const denominator = totalFactor * tvl;

  const boostedAPR = numerator / denominator;

  const apr = 0.4 * boostedAPR + 0.6 * farm.baseAPR;

  console.log(apr);

  return apr;
};
