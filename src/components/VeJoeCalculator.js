import React, { useEffect, useState, useContext } from "react";

import { MainContext } from "../context/Provider";
import FarmScrollingList from "./veJoeCalc/FarmScrollingList";
import SelectedPoolStats from "./veJoeCalc/SelectedPoolStats";
import NumInputComponent from "./veJoeCalc/NumInputComponent";
import Loading3D from "../threeJs/Loading3D";

import { calculateBaseAPR, calculateBoostedAPR } from "../util/veJoeAPYUtil";
import { getTokenBalance } from "../util/AccountUtil";

import { getBoostedMasterchef } from "../util/subgraphs/BoostedFarmsSubgraph";
import { getPairsDetail } from "../util/subgraphs/LiquidityPairSubgraph";
import { getEmissions } from "../util/subgraphs/EmissionsSubGraph";
import { getJoePrice } from "../util/subgraphs/JoeSubgraph";
import { getVeJoeSupply } from "../util/subgraphs/VeJoeSubgraph";

import {
  getPairValue,
  convertUsdToJLP,
  convertJLPtoUsd,
} from "../util/PairPriceUtil";
import {
  getJoePerSecBoosted,
  getPoolInfo,
} from "../util/contracts/BoostedMCContract";

export default function VeJoeCalculator() {
  const context = useContext(MainContext);

  const [state, setState] = useState({
    loaded: false,
    selectedBoostedFarm: {},
    boostedFarms: {},
    farmInputValue: 0.0,
    farmInputMaxValue: 0.0,
    veJoeInputValue: 0.0,
    veJoeInputMaxValue: 0.0,
  });

  //on first time load
  useEffect(async () => {
    setState((state) => ({
      ...state,
      loaded: false,
    }));
    //setup all information to make VeJoe Calculations
    const [boostedFarms, joePrice, emissions, joePerSecBoosted, veJoeSupply] =
      await Promise.all([
        getBoostedMasterchef(),
        getJoePrice(),
        getEmissions(),
        getJoePerSecBoosted(),
        getVeJoeSupply(),
      ]);

    boostedFarms["joePrice"] = joePrice;
    boostedFarms["joePerSecBase"] = emissions.joePerSec;
    boostedFarms["joePerSecBoosted"] = joePerSecBoosted;
    boostedFarms["totalAllocPointBase"] = emissions.totalAllocPoint;
    boostedFarms["veJoeSupply"] = veJoeSupply;

    boostedFarms.pools = await Promise.all(
      boostedFarms.pools.map((pool) =>
        buildPoolData(pool, emissions, boostedFarms)
      )
    );

    for (const pool of boostedFarms.pools) {
      console.log(pool);
      if (pool.pair === "0xf4003f4efbe8691b60249e6afbd307abe7758adb") {
        boostedFarms["avaxPrice"] = pool.pairDetail.token1Price;
      }
    }

    setState((state) => ({
      ...state,
      boostedFarms: boostedFarms,
      selectedBoostedFarm: boostedFarms.pools[0],
    }));

    context.setBoostedFarms(boostedFarms);

    setState((state) => ({
      ...state,
      loaded: true,
    }));
  }, []);

  //on Authentication change update veJoe Max value
  useEffect(() => {
    const veJoeBalance = context.main.accountDetails.veJoeBalance;
    if (veJoeBalance > 0) {
      setState((state) => ({
        ...state,
        veJoeInputMaxValue: veJoeBalance,
      }));
    } else {
      setState((state) => ({
        ...state,
        veJoeInputMaxValue: 0.0,
      }));
    }
  }, [context.main.accountDetails]);

  // calculate the APR of the selected pool
  useEffect(() => {
    if (state.loaded) {
      const boostedFarmCalculations = state.selectedBoostedFarm;
      boostedFarmCalculations["veJoeShare"] =
        state.veJoeInputValue / state.boostedFarms.veJoeSupply;
      boostedFarmCalculations["boostedAPR"] = calculateBoostedAPR(
        state.selectedBoostedFarm,
        state.boostedFarms.totalAllocPoint,
        state.boostedFarms.joePerSecBoosted,
        state.boostedFarms.joePrice,
        state.veJoeInputValue || 0,
        state.farmInputValue || 0
      );
      setState((state) => ({
        ...state,
        selectedBoostedFarm: boostedFarmCalculations,
      }));
    }
  }, [
    state.selectedBoostedFarm,
    state.farmInputValue,
    state.veJoeInputValue,
    state.loaded,
  ]);

  // on selected farm change update max value
  useEffect(() => {
    const boostedFarmBalance = getTokenBalance(
      context,
      state.selectedBoostedFarm.pair
    );

    if (boostedFarmBalance > 0) {
      setState((state) => ({
        ...state,
        farmInputMaxValue: boostedFarmBalance,
      }));
    } else {
      setState((state) => ({
        ...state,
        farmInputMaxValue: 0.0,
      }));
    }
  }, [state.selectedBoostedFarm, context.main.accountDetails]);

  if (!state.loaded) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <div className=" flex items-center flex-col p-3 align-middle">
          <Loading3D />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center flex-grow">
        <div className=" flex items-center flex-col p-3 w-80 space-y-2">
          {/* the selected coin info */}
          <SelectedPoolStats selectedBoostedFarm={state.selectedBoostedFarm} />
          <div className="flex flex-col">
            <NumInputComponent
              fieldName="veJoe:"
              maxValue={state.veJoeInputMaxValue}
              onChangeInput={(input) => {
                setState((state) => ({
                  ...state,
                  veJoeInputValue: input,
                }));
              }}
            />
            <NumInputComponent
              fieldName="farm:$"
              maxValue={convertJLPtoUsd(
                state.selectedBoostedFarm,
                state.boostedFarms.avaxPrice,
                state.farmInputMaxValue
              )}
              onChangeInput={(input) => {
                input = convertUsdToJLP(
                  state.selectedBoostedFarm,
                  state.boostedFarms.avaxPrice,
                  input
                );
                setState((state) => ({
                  ...state,
                  farmInputValue: input,
                }));
              }}
            />
          </div>
          <FarmScrollingList
            boostedFarms={state.boostedFarms.pools}
            selectedBoostedFarm={state.selectedBoostedFarm}
            onChangeFarmSelection={(selection) => {
              setState((state) => ({
                ...state,
                selectedBoostedFarm: selection,
              }));
            }}
          />
        </div>
      </div>
    );
  }
}

const buildPoolData = async (pool, emissions, boostedFarms) => {
  const pairDetail = await getPairsDetail(pool.pair);

  const boostedFarmData = await getPoolInfo(pool.id);
  pairDetail["totalFactor"] = +boostedFarmData.totalFactor;

  pool["pairDetail"] = pairDetail;
  pool["baseAPR"] = calculateBaseAPR(
    pool,
    emissions.totalAllocPoint,
    emissions.joePerSec / 2,
    boostedFarms.joePrice
  );
  pool["baseBoostedAPR"] = calculateBoostedAPR(
    pool,
    boostedFarms.totalAllocPoint,
    boostedFarms.joePerSecBoosted,
    boostedFarms.joePrice,
    0,
    0
  );
  pool["boostedAPR"] = 0.0;

  return pool;
};
