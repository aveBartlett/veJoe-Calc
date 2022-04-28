import React, { useState, useEffect } from "react";
import { getImgElementFromTokenAddress } from "../../util/TokenLogoUtil";

export default function SelectedPoolStats(props) {
  const [state, setState] = useState({
    name: "",
    token0Address: "",
    token1Address: "",
    veJoeShare: 0,
    baseAPR: 0,
    boostedAPR: 0,
  });

  useEffect(() => {
    console.log(props.selectedBoostedFarm.boostedAPR);
    setState((state) => ({
      ...state,
      name: props.selectedBoostedFarm.pairDetail.name,
      token0Address: props.selectedBoostedFarm.pairDetail.token0.id,
      token1Address: props.selectedBoostedFarm.pairDetail.token1.id,
      veJoeShare: props.selectedBoostedFarm.veJoeShare,
      baseAPR: props.selectedBoostedFarm.baseAPR,
      boostedAPR: props.selectedBoostedFarm.boostedAPR,
    }));
  }, [props.selectedBoostedFarm.boostedAPR]);

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
        <h1 className="text-gray-200 text-xs">BOOSTED APR</h1>
        <h1 className="text-white font-extrabold text-3xl">
          {state.boostedAPR.toPrecision(4)}%
        </h1>
      </div>
      <div className="flex justify-center text-center items-center">
        <div className="flex flex-col text-center pt-2">
          <h1 className="text-gray-200 text-xs">veJOE SHARE</h1>
          <h1 className="text-white font-extrabold text-2xl">0.2%</h1>
        </div>
        <div className="flex flex-col text-center pl-2 pt-2">
          <h1 className="text-gray-200 text-xs">BASE APR</h1>
          <h1 className="text-white font-extrabold text-2xl">
            {state.baseAPR.toPrecision(4)}%
          </h1>
        </div>
      </div>
    </div>
  );
}
