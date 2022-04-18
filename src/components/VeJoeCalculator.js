import React, { useEffect, useState, useContext } from "react";
import { useMoralis } from "react-moralis";
import { MainContext } from "../context/Provider";
import BoostPoolDashboard from "./veJoeCalc/BoostPoolDashboard";
import { getBoostedMasterchef } from "../web3/veJoeSubgraph";
import NumInputComponent from "./NumInputComponent";
import { CalculateBoostedFarmAPY } from "../calculators/veJoeAPYCalculator";

export default function VeJoeCalculator() {
  const { isAuthenticated } = useMoralis();
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
    setState((state) => ({
      ...state,
      boostedFarms,
    }));
    context.setBoostedFarms(boostedFarms);
  }, []);

  //on Authentication change
  useEffect(() => {
    if (isAuthenticated) {
      console.log(context);
      setState((state) => ({
        ...state,
        farmInputMaxValue: 0.0,
        veJoeInputMaxValue: 0.0,
      }));
    } else {
      setState((state) => ({
        ...state,
        farmInputMaxValue: 0.0,
        veJoeInputMaxValue: 0.0,
      }));
    }
  }, [isAuthenticated]);

  //on input value change
  useEffect(() => {
    //calculate the new APYs and update state
    setState((state) => ({
      ...state,
      boostedFarmAPYMap: CalculateBoostedFarmAPY(
        state.farmInputValue,
        state.veJoeInputValue
      ),
    }));
  }, [state.farmInputValue, state.veJoeInputValue]);

  // on selected farm change
  useEffect(() => {}, [state.selectedBoostedFarm]);

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
