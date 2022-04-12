export const getImgElementFromTokenAddress = (address) => {
  //if wavax, return the local avax token
  if (address === "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7") {
    return (
      <img src="/avalanche_token_round.3e178e42.png" className="w-8 h-8" />
    );
  }
  const alt = address;
  const src = `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${address}/logo.png`;
  return <img className="w-8 h-8" alt={alt} src={src} />;
};

export const LpPairButton = (onClickFunc, lpPair) => {
  return (
    <div
      key={lpPair.pair.address}
      className="border-slate-300 border-solid rounded-md
     border-2 flex items-center hover:bg-white p-3"
    >
      <button
        className="font-light text-white text-2xl font-custom px-2 hover:text-black"
        onClick={() => onClickFunc()}
      >
        <div className="flex justify-center">
          {getImgElementFromTokenAddress(lpPair.pair.token1.address)}
          {getImgElementFromTokenAddress(lpPair.pair.token2.address)}
        </div>
        <h1 className="text-base pt-2 ">
          {lpPair.pair.token1.name}-{lpPair.pair.token2.name}
        </h1>
        <h1 className="text-base">{lpPair.pair.apy * 100}% APY</h1>
        <h1 className="pt-2 font-bold">{lpPair.pair.riskLevel}</h1>
      </button>
    </div>
  );
};
