import React from "react";
import { LpPairButton } from "../../util/TokenLogoUtil";

export default function BoostPoolDashboard(props) {
  return (
    <div className=" flex items-center flex-col p-3 align-middle">
      {/* the selected coin info */}
      <div>{LpPairButton(() => {}, props.selectedBoostedFarm)}</div>
      {/* rest of the token APR */}
    </div>
  );
}
