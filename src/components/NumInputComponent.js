import React, { useState } from "react";

const NumInputComponent = (props) => {
  const [state, setState] = useState({
    investmentValue: "",
    buttonMessage: "Enter an amount",
    buttonDisabled: true,
  });

  const maxInputLength = 10;

  const regex = /^[0-9]*[.,]?[0-9]*$/;

  const validateNumFormat = (evt) => {
    var keyEvent = evt || window.event;

    // Handle paste
    if (keyEvent.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = keyEvent.keyCode || keyEvent.which;
      key = String.fromCharCode(key);
    }
    if (!regex.test(key) || state.investmentValue.length + 1 > maxInputLength) {
      keyEvent.returnValue = false;
      if (keyEvent.preventDefault) keyEvent.preventDefault();
    }
  };

  const fillInputWMaxValue = () => {
    setState((state) => ({
      ...state,
      investmentValue: props.maxValue,
    }));
  };

  const onChangeInput = (evt) => {
    let val = evt.target.value;

    setState((state) => ({
      ...state,
      investmentValue: val,
    }));

    props.onChangeInput(val);
  };

  return (
    <div className="items-center justify-center py-2 flex flex-col ">
      <div className="border-b-2 border-white">
        <label className="font-bold text-white font-custom">
          {props.fieldName}:
        </label>
        <input
          className="text-white font-custom bg-black outline-none appearance-none w-32"
          type="text"
          inputMode="decimal"
          pattern={regex}
          required
          onKeyPress={(evt) => validateNumFormat(evt)}
          onChange={(evt) => onChangeInput(evt)}
          value={state.investmentValue.substring(0, maxInputLength)}
          placeholder={String(props.maxValue).substring(0, maxInputLength)}
          name="investmentValue"
        ></input>

        {props.maxValue && props.maxValue > 0 ? (
          <button
            className="text-slate-500 font-custom font-semibold hover:text-white"
            onClick={() => fillInputWMaxValue()}
          >
            max
          </button>
        ) : (
          <button className="text-transparent font-custom font-semibold">
            max
          </button>
        )}
      </div>
    </div>
  );
};

export default NumInputComponent;
