export const getImgElementFromTokenAddress = (address) => {
  const imageClass = "w-8 w-8";

  //if veJoe, return local img
  if (address === "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7") {
    return (
      <img src="/avalanche_token_round.3e178e42.png" className={imageClass} />
    );
  }
  //if veJoe, return local img
  if (address === "0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456") {
    return <img src="/veJoe.192d0354.png" className="w-16 h-16" />;
  }
  const alt = address;
  const src = `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${address}/logo.png`;
  return <img className={imageClass} alt={alt} src={src} />;
};

export const LpPairButton = (onClickFunc, lpPair) => {
  return (
    <div
      key={lpPair.pair}
      className="border-slate-300 border-solid rounded-md
     border-2 flex items-center hover:bg-white p-3"
    >
      <button
        className="font-light text-white text-2xl font-custom px-2 hover:text-black"
        onClick={() => onClickFunc()}
      >
        <div className="flex justify-center">
          {getImgElementFromTokenAddress(lpPair.pairDetail.token0.id)}
          {getImgElementFromTokenAddress(lpPair.pairDetail.token1.id)}
        </div>
        <h1 className="text-base pt-2 ">{lpPair.pairDetail.name}</h1>
        <h1 className="text-base">{lpPair.baseAPR}% APR</h1>
      </button>
    </div>
  );
};
