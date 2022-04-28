import React, { useEffect, useState, useContext } from "react";

import { MainContext } from "../context/Provider";
import FarmScrollingList from "./veJoeCalc/FarmScrollingList";
import SelectedPoolStats from "./veJoeCalc/SelectedPoolStats";
import NumInputComponent from "./NumInputComponent";
import Loading3D from "../threeJs/Loading3D";

import { calculateBaseAPR, calculateBoostedAPR } from "../util/veJoeAPYUtil";
import { getTokenBalance } from "../util/AccountUtil";
import { VEJOE_TOKEN_ADDRESS } from "../util/Constants";

import { getBoostedMasterchef } from "../util/subgraphs/BoostedFarmsSubgraph";
import { getPairsDetail } from "../util/subgraphs/LiquidityPairSubgraph";
import { getEmissions } from "../util/subgraphs/EmissionsSubGraph";
import { getJoePrice } from "../util/subgraphs/JoeSubgraph";
import { getPairValue } from "../util/PairPriceUtil";
import { getPoolInfo } from "../util/contracts/BoostedMCContract";

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
    const boostedFarms = await getBoostedMasterchef();

    boostedFarms["joePrice"] = await getJoePrice();

    const emissions = await getEmissions();
    boostedFarms["joePerSecBase"] = emissions.joePerSec;
    boostedFarms["totalAllocPointBase"] = emissions.totalAllocPoint;

    //add more info to boosted farms and calcualte APY
    for (const pool of boostedFarms.pools) {
      const pairDetail = await getPairsDetail(pool.pair);

      pairDetail["pairPrice"] = await getPairValue(pairDetail, context);

      const boostedFarmData = await getPoolInfo(pool.id);
      console.log(boostedFarmData);

      pool["pairDetail"] = pairDetail;
      pool["baseAPR"] = calculateBaseAPR(
        pool,
        emissions.totalAllocPoint,
        emissions.joePerSec / 2,
        boostedFarms.joePrice
      );
      pool["boostedAPR"] = 0.0;
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
      boostedFarmCalculations["boostedAPR"] = calculateBoostedAPR(
        state.selectedBoostedFarm,
        state.boostedFarms.totalAllocPointBase,
        state.boostedFarms.joePerSec,
        state.boostedFarms.joePrice,
        state.veJoeInputValue,
        state.farmInputValue
      );
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
        <div className=" flex items-center flex-col p-3 align-middle w-80">
          {/* the selected coin info */}
          <SelectedPoolStats selectedBoostedFarm={state.selectedBoostedFarm} />
          <NumInputComponent
            fieldName="veJoe"
            maxValue={state.veJoeInputMaxValue}
            onChangeInput={(input) => {
              setState((state) => ({
                ...state,
                veJoeInputValue: input,
              }));
            }}
          />
          <NumInputComponent
            fieldName="farm "
            maxValue={state.farmInputMaxValue}
            onChangeInput={(input) => {
              setState((state) => ({
                ...state,
                farmInputValue: input,
              }));
            }}
          />
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

const onFirstTimeLoad = () => {};
