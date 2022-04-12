import { useContext, useEffect } from "react";
import { AVALANCHE_MAINNET_PARAMS } from "../../Util/Constants";
import {
  getNetworkFromChainId,
  isChainIdValid,
  addAvalancheNetwork,
} from "../../Web3/NetworkUtil";
import { MainContext } from "../../../context/Provider";
import { useMoralis } from "react-moralis";

export default function AvaxChainConfirmation() {
  const { chainId, isAuthenticated } = useMoralis();
  const context = useContext(MainContext);
  const { setNetwork } = context;

  useEffect(() => {
    if (
      isAuthenticated &&
      chainId &&
      context.main.network &&
      context.main.network.chainId.toUpperCase() != chainId.toUpperCase()
    ) {
      const network = getNetworkFromChainId(chainId);
      setNetwork(network);
    }
  }, [isAuthenticated, chainId]);

  if (isAuthenticated && chainId && !isChainIdValid(chainId)) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="transition-all fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-80 h-44 border-white border-solid border-2 bg-black z-10">
          <div className=" items-stretch flex flex-col">
            <div className="flex justify-center">
              <h1 className="font-normal font-custom text-white text-2xl py-4 text-center">
                Switch to {AVALANCHE_MAINNET_PARAMS.chainName}
              </h1>
            </div>

            <div className="flex justify-center pt-5">
              <button
                onClick={() => addAvalancheNetwork("main")}
                className="font-normal font-custom text-white hover:text-orange-200 text-lg"
              >
                Switch Networks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
