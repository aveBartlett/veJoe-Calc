import React, { useState, useEffect } from "react";
import { LpPairButton } from "../../util/TokenLogoUtil";

export default function BoostPoolDashboard(props) {
  const [state, setState] = useState({
    farmList: [],
  });

  useEffect(() => {
    let farmList = [];
    for (const farm of props.boostedFarms) {
      if (
        farm.pairDetail.name !== props.selectedBoostedFarm.pairDetail.name &&
        farmList.length < 4
      ) {
        farmList.push(farm);
      }
    }

    farmList.sort((a, b) => {
      if (b.baseAPR < a.baseAPR) {
        return -1;
      }
      if (b.baseAPR > a.baseAPR) {
        return 1;
      }
      return 0;
    });

    setState((state) => ({
      ...state,
      farmList: farmList,
    }));
  }, [props.selectedBoostedFarm]);

  return (
    <div className=" flex items-center flex-col align-middle">
      {/* the selected coin info */}
      <div className="grid grid-cols-4 gap-2">
        {state.farmList.map((farm) =>
          LpPairButton(() => {
            props.onChangeFarmSelection(farm);
          }, farm)
        )}
      </div>
      {/* rest of the token APR */}
    </div>
  );
}
