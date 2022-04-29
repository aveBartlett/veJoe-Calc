import { WAVAX_ADDRESS, stables } from "./Constants";

export const convertUsdToJLP = (selectedBoostedFarm, avaxPrice, amount) => {
  console.log(selectedBoostedFarm);
  if (isUsdStable(selectedBoostedFarm.pairDetail.token0.id)) {
    return (
      2 *
      (amount / selectedBoostedFarm.pairDetail.reserve0) *
      selectedBoostedFarm.pairDetail.totalSupply
    );
  } else if (isUsdStable(selectedBoostedFarm.pairDetail.token1.id)) {
    return (
      2 *
      (amount / selectedBoostedFarm.pairDetail.reserve0) *
      selectedBoostedFarm.pairDetail.totalSupply
    );
  }

  if (selectedBoostedFarm.pairDetail.token0.id === WAVAX_ADDRESS) {
    const avaxAmount = amount / avaxPrice;
    return (
      2 *
      (avaxAmount / selectedBoostedFarm.pairDetail.reserve0) *
      selectedBoostedFarm.pairDetail.totalSupply
    );
  } else {
    const avaxAmount = amount / avaxPrice;
    return (
      2 *
      (avaxAmount / selectedBoostedFarm.pairDetail.reserve1) *
      selectedBoostedFarm.pairDetail.totalSupply
    );
  }
};

export const convertJLPtoUsd = (selectedBoostedFarm, avaxPrice, amount) => {
  if (isUsdStable(selectedBoostedFarm.pairDetail.token0.id)) {
    return (
      (2 * (amount * selectedBoostedFarm.pairDetail.reserve0)) /
      selectedBoostedFarm.pairDetail.totalSupply
    );
  } else if (isUsdStable(selectedBoostedFarm.pairDetail.token1.id)) {
    return (
      (2 * (amount * selectedBoostedFarm.pairDetail.reserve1)) /
      selectedBoostedFarm.pairDetail.totalSupply
    );
  }

  if (selectedBoostedFarm.pairDetail.token0.id === WAVAX_ADDRESS) {
    const avaxAmount = amount / avaxPrice;
    return (
      (2 * (avaxAmount * selectedBoostedFarm.pairDetail.reserve0)) /
      selectedBoostedFarm.pairDetail.totalSupply
    );
  } else {
    const avaxAmount = amount / avaxPrice;
    return (
      2 *
      ((avaxAmount * selectedBoostedFarm.pairDetail.reserve1) /
        selectedBoostedFarm.pairDetail.totalSupply)
    );
  }
};

const isUsdStable = (address) => {
  for (const stableAddress of stables) {
    if (stableAddress === address) {
      return true;
    }
  }
};
