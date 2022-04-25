import { MainContext } from "../context/Provider";
import { useContext } from "react";

export const getImgElementFromTokenAddress = (address) => {
  const imageClass = "w-6 w-6";

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

export const LpPairButton = (onClickFunc, lpPair) => {
  return (
    <div key={lpPair.pair} className="flex items-center">
      <button
        className="font-light text-transparent font-custom hover:text-orange-200"
        onClick={() => onClickFunc()}
      >
        <div className="flex justify-center">
          {getImgElementFromTokenAddress(lpPair.pairDetail.token0.id)}
          {getImgElementFromTokenAddress(lpPair.pairDetail.token1.id)}
        </div>
        <h1 className="text-sm text-white">{lpPair.baseAPR.toPrecision(4)}%</h1>
        <h1 className="text-xs">{lpPair.pairDetail.name}</h1>
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
