import React, { useState, useEffect } from "react";
import { getImgElementFromTokenAddress } from "../../util/TokenLogoUtil";

export default function SelectedPoolStats(props) {
  const [state, setState] = useState({
    name: "",
    token0Address: "",
    token1Address: "",
    veJoeShare: 0,
    baseAPR: 0,
    baseBoostedAPR: 0,
    boostedAPR: 0,
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      name: props.selectedBoostedFarm.pairDetail.name,
      token0Address: props.selectedBoostedFarm.pairDetail.token0.id,
      token1Address: props.selectedBoostedFarm.pairDetail.token1.id,
      veJoeShare:
        props.selectedBoostedFarm.veJoeShare >= 0.01
          ? props.selectedBoostedFarm.veJoeShare
          : 0,
      baseAPR: props.selectedBoostedFarm.baseAPR,
      baseBoostedAPR: props.selectedBoostedFarm.baseBoostedAPR,
      boostedAPR: props.selectedBoostedFarm.boostedAPR,
    }));
  }, [
    props.selectedBoostedFarm.boostedAPR,
    props.selectedBoostedFarm.veJoeShare,
  ]);

  return (
    <div className="flex flex-col items-center font-custom">
      <div
        className="flex justify-center p-1 border-slate-300 border-solid rounded-3xl
     border-2"
      >
        {getImgElementFromTokenAddress(state.token0Address, 8)}
        {getImgElementFromTokenAddress(state.token1Address, 8)}
      </div>
      <h1 className="text-white font-extrabold text-lg">{state.name}</h1>
      <div className="flex flex-col text-center pt-2">
        <h1 className="text-gray-200 text-xs">EST BOOSTED APR</h1>
        <h1 className="text-white font-extrabold text-4xl">
          {state.boostedAPR.toPrecision(4)}%
        </h1>
      </div>
      <div className="flex justify-center text-center items-center space-x-2">
        <div className="flex flex-col text-center pl-2 pt-2">
          <h1 className="text-gray-200 text-xs">BOOSTED APR</h1>
          <h1 className="text-white font-extrabold text-lg">
            {state.baseBoostedAPR.toPrecision(4)}%
          </h1>
        </div>
        <div className="flex flex-col text-center pt-2">
          <h1 className="text-gray-200 text-xs">veJOE SHARE</h1>
          <h1 className="text-white font-extrabold text-lg">
            {String(state.veJoeShare).substring(0, 4)}%
          </h1>
        </div>
        <div className="flex flex-col text-center pl-2 pt-2">
          <h1 className="text-gray-200 text-xs">BASE APR</h1>
          <h1 className="text-white font-extrabold text-lg">
            {state.baseAPR.toPrecision(4)}%
          </h1>
        </div>
      </div>
    </div>
  );
}
