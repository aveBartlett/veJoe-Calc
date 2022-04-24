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
  const emmissionshare = farm.allocPoint / totalAllocPoint;
  const joePerSec = (emmissionshare * totalJoePerSec) / 1e18;

  const farmFactor = Math.sqrt(lpAmount * veJoeAmount);

  const tvl =
    (farm.jlpBalance / farm.pairDetail.totalSupply) *
    farm.pairDetail.reserveUSD;

  const apr = (joePrice * joePerSec * SECONDS_IN_YEAR * 100) / tvl;

  return apr;
};
