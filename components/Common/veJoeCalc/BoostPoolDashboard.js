import React from "react";
import { getImgElementFromTokenAddress } from "../../Util/ComponentUtil";

export default function BoostPoolDashboard(props) {
  return (
    <div>
      {getImgElementFromTokenAddress(
        "0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456"
      )}
    </div>
  );
}
