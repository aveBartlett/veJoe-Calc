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

  const sqrtTokens = Math.sqrt(veJoeAmount * lpAmount);
  console.log(sqrtTokens);

  const poolJoePerSec = totalJoePerSec * (farm.allocPoint / totalAllocPoint);
  console.log(poolJoePerSec);

  const JoePerYear = ((sqrtTokens * poolJoePerSec) / 1e9) * SECONDS_IN_YEAR;
  console.log(JoePerYear);

  const boostedApr =
    (((JoePerYear * joePrice) /
      ((farm.pairDetail.reserveUSD * lpAmount) / farm.jlpBalance)) *
      100) /
    10 ** 10;
  const apr = 0.4 * boostedApr + 0.6 * farm.baseAPR;

  return apr;
};
