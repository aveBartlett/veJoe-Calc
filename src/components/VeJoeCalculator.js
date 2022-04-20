import React, { useEffect, useState, useContext } from "react";
import { useMoralis } from "react-moralis";
import { MainContext } from "../context/Provider";
import BoostPoolDashboard from "./veJoeCalc/BoostPoolDashboard";
import { getBoostedMasterchef } from "../web3/subgraphs/BoostedFarmsSubgraph";
import NumInputComponent from "./NumInputComponent";
import { CalculateBoostedFarmAPY } from "../calculators/veJoeAPYCalculator";
import { getTokenBalance } from "../Web3/AccountUtil";
import { VEJOE_TOKEN_ADDRESS } from "../util/Constants";

export default function VeJoeCalculator() {
  const context = useContext(MainContext);

  const [state, setState] = useState({
    selectedBoostedFarm: "",
    boostedFarms: {},
    boostedFarmAPYMap: {},
    farmInputValue: 0.0,
    farmInputMaxValue: 0.0,
    veJoeInputValue: 0.0,
    veJoeInputMaxValue: 0.0,
  });

  //on first time load
  useEffect(async () => {
    const boostedFarms = await getBoostedMasterchef();
    console.log(boostedFarms);
    setState((state) => ({
      ...state,
      boostedFarms: boostedFarms,
      selectedBoostedFarm: boostedFarms.pools[0].pair,
    }));

    context.setBoostedFarms(boostedFarms);
  }, []);

  //on Authentication change update veJoe Max value
  useEffect(() => {
    const veJoeBalance = context.main.accountDetails.veJoeBalance;
    console.log(context);
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

  //on input value change
  useEffect(() => {
    //calculate the new APYs and update state
    if (state.boostedFarms.data) {
      setState((state) => ({
        ...state,
        boostedFarmAPYMap: CalculateBoostedFarmAPY(
          state.boostedFarms.data.masterChefs[0].pools,
          state.farmInputValue,
          state.veJoeInputValue
        ),
      }));
    }
  }, [state.farmInputValue, state.veJoeInputValue]);

  // on selected farm change update max value
  useEffect(() => {
    const boostedFarmBalance = getTokenBalance(
      context,
      state.selectedBoostedFarm
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

  return (
    <div className="flex justify-center items-center flex-grow">
      <div className=" flex items-center flex-col p-3 align-middle">
        <BoostPoolDashboard
          boostedFarmList={state.boostedFarmList}
          veJoeAmount={state.veJoeInputValue}
          farmAmount={state.farmInputValue}
          onChangeFarmSelection={(selection) => {
            setState((state) => ({
              ...state,
              boostedFarmSelection: selection,
            }));
          }}
        />
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
          fieldName="pool"
          maxValue={state.farmInputMaxValue}
          onChangeInput={(input) => {
            setState((state) => ({
              ...state,
              farmInputValue: input,
            }));
          }}
        />
      </div>
    </div>
  );
}
