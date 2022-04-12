import React from "react";
import Link from "next/link";
import Coin3D from "../ThreeJs/Coin3D.js";

const Title = () => {
  return (
    <nav className="bg-black font-custom ">
      <div className="max-w-6xl mx-auto pr-2">
        <Link href="/">
          <a className="flex items-center py-4 pr-2">
            <Coin3D />
            {/* <img src="/coin_logo.png" alt="Logo" class="h-12 w-12 mr-4" /> */}
            <span className="text-white overline text-base sm:text-2xl">
              veJoe Calc
            </span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Title;
