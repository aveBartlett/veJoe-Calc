import { MainContext } from "../context/Provider";
import React, { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export const getImgElementFromTokenAddress = (address, size = 6) => {
  const imageClass = `w-${size} h-${size} border-transparent border-solid rounded-xl `;

  //if avax, return local img
  if (address.toLowerCase() === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7") {
    return <img src="/avalanche_token.png" className={imageClass} />;
  }
  //if veJoe, return local img
  if (address === "0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456") {
    return <img src="/veJoe.192d0354.png" className="w-12 h-12" />;
  }

  const alt = address;
  const src = getTokenURI(address);
  return <img className={imageClass} alt={alt} src={src} />;
};

export const LpPairButton = (onClickFunc, onClickVisibility, lpPair) => {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div itemID={lpPair.pair} key={lpPair.pair} className="flex items-center">
      <button
        className="font-light text-transparent font-custom p-2 text-gray-500 hover:text-orange-200 border-transparent hover:border-slate-300 border-solid rounded-md
     border-2 "
        onClick={() => {
          onClickFunc(lpPair);
          onClickVisibility(visibility);
        }}
      >
        <div className="flex justify-center">
          {getImgElementFromTokenAddress(lpPair.pairDetail.token0.id)}
          {getImgElementFromTokenAddress(lpPair.pairDetail.token1.id)}
        </div>
        <h1 className="text-sm font-bold ">{lpPair.baseAPR.toPrecision(4)}%</h1>
        {/* <h1 className="text-xs w-5">{lpPair.pairDetail.name}</h1> */}
      </button>
    </div>
  );
};

const getTokenURI = (address) => {
  const context = useContext(MainContext);
  for (const token of context.main.joeTokenList) {
    if (token.address.toLowerCase() === address.toLowerCase()) {
      return token.logoURI;
    }
  }

  return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/White_dot.svg/64px-White_dot.svg.png";
};
