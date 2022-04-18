import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { MainContext } from "../../context/Provider";
import BoostPoolDashboard from "./veJoeCalc/BoostPoolDashboard";
import { getBoostedMasterchef } from "../Web3/veJoeUtil";
import NumInputComponent from "./NumInputComponent";

export default function VeJoeCalculator() {
  const { isAuthenticated } = useMoralis();

  const [state, setState] = useState({
    boostedFarmSelection: null,
    boostedFarms: {},
    farmInputValue: 0.0,
    farmInputMaxValue: 0.0,
    veJoeInputValue: 0.0,
    veJoeInputMaxValue: 0.0,
  });

  //onComponentMount
  useEffect(async () => {
    if (context.boostedFarms !== {}) {
      const boostedFarms = await getBoostedMasterchef();
      setState((state) => ({
        ...state,
        boostedFarms,
      }));
      context.setBoostedFarms(boostedFarms);
      console.log(boostedFarms);
    }
  }, []);

  //on Authentication change
  useEffect(() => {
    if (isAuthenticated) {
    } else {
      setState((state) => ({
        ...state,
        farmInputMaxValue: 0.0,
        veJoeInputMaxValue: 1.0,
      }));
    }
  }, [isAuthenticated]);

  //on input value change
  useEffect(() => {}, [state.farmInputValue, state.veJoeInputValue]);

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
