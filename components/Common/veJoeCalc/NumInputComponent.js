import React, { useState } from "react";

const NumInputComponent = (props) => {
  const [state, setState] = useState({
    investmentValue: "",
    buttonMessage: "Enter an amount",
    buttonDisabled: true,
  });

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
    if (!regex.test(key)) {
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
    <div className="items-center justify-center pt-4 flex flex-col space-y-2">
      <div className="grid-cols-4 border-b-2 border-white pr-2 ">
        <label className="font-bold text-white font-custom">
          {props.fieldName}:
        </label>
        <input
          className="col-span-3 text-white font-custom bg-black outline-none appearance-none"
          type="text"
          inputMode="decimal"
          pattern={regex}
          required
          onKeyPress={(evt) => validateNumFormat(evt)}
          onChange={(evt) => onChangeInput(evt)}
          value={state.investmentValue}
          placeholder={props.maxValue}
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
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NumInputComponent;
