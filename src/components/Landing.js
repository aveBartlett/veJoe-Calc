import React, { useContext } from "react";
import Joe3D from "../ThreeJs/Joe3D";
import { MainContext } from "../context/Provider";
import { useMoralis } from "react-moralis";
import Link from "next/link";

export default function Landing() {
  const { isAuthenticated } = useMoralis();

  return (
    <div className="flex-col flex-grow flex items-center bg-black justify-center">
      <div className="w-48 h-48 flex justify-center align-middle sm:w-72 sm:h-72">
        <Joe3D />
      </div>
      {!isAuthenticated ? (
        <p1 className="font-light text-white text-lg font-custom">
          Connect your wallet, brother
        </p1>
      ) : (
        <div />
      )}
      <div className="pt-3">
        <div className="font-light text-white text-xs border p-1 font-custom hover:text-orange-200 hover:border-orange-200">
          <Link href="/vejoecalc">
            <a>...continue to app</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
