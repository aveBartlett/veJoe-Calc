import React, { useState, useEffect } from "react";
import { LpPairButton } from "../../util/TokenLogoUtil";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

export default function FarmScrollingList(props) {
  const [state, setState] = useState({
    farmList: [],
  });

  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  useEffect(() => {
    let farmList = [];
    for (const farm of props.boostedFarms) {
      farmList.push(farm);
    }

    farmList.sort((a, b) => {
      if (b.baseAPR < a.baseAPR) {
        return -1;
      }
      if (b.baseAPR > a.baseAPR) {
        return 1;
      }
      return 0;
    });

    setState((state) => ({
      ...state,
      farmList: farmList,
    }));
  }, []);

  const isItemSelected = (farm) => selected.id == farm.id;

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      setSelected(id);
    };

  return (
    <div className=" flex items-center flex-col align-middle w-full">
      {/* rest of the tokens APR */}
      <div className="w-full">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {state.farmList.map((farm) =>
            LpPairButton(
              (selectedFarm) => {
                handleClick(selectedFarm.pair);
                props.onChangeFarmSelection(selectedFarm);
              },
              handleClick(farm),
              farm,
              isItemSelected(farm)
            )
          )}
        </ScrollMenu>
      </div>
    </div>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow
      className="text-white"
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <h1 className="text-white font-custom text-3xl flex flex-column justify-center pr-1">
        {"<"}
      </h1>
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow
      className="text-white"
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <h1 className="text-white font-custom text-3xl flex flex-column justify-center pl-1">
        {">"}
      </h1>
    </Arrow>
  );
}

function Arrow({ children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="disabled:opacity-50"
    >
      {children}
    </button>
  );
}
