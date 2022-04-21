export const CalculateBoostedFarmAPY = (
  boostedFarms,
  selectedBoostedFarm,
  farmInputValue,
  veJoeInputValue
) => {
  console.log(boostedFarms);
  for (const farm of boostedFarms.pools) {
    const emmissionshare = farm.allocPoint / boostedFarms.totalAllocPoint;
    const joePerSec = (emmissionshare * boostedFarms.joePerSec) / 1e18;
    const tvl = (farm.jlpBalance / result.poolTotalSupply) * result.poolTVL;

    if (farm.id === selectedBoostedFarm) {
      // add user input tokens
    } else {
    }
  }
};
