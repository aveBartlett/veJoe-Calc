import React, { useContext } from "react";
import Joe3D from "./ThreeJs/Joe3D";
import { MainContext } from "../context/Provider";
import { useMoralis } from "react-moralis";

export default function Main() {
  const context = useContext(MainContext);
  const { isAuthenticated } = useMoralis();

  if (isAuthenticated) {
    console.log(context);
    return <div></div>;
  } else {
    // connect wallet screen
    return (
      <div className="flex-col flex-grow flex items-center bg-black justify-center">
        <div className="w-48 h-48 flex justify-center align-middle sm:w-72 sm:h-72">
          <Joe3D />
        </div>
        <p1 className="font-light text-white text-lg font-custom">
          Connect your wallet bro
        </p1>
      </div>
    );
  }
}
