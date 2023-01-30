import React, { useContext } from "react";
import { myContext } from "../App";

export default function Size() {
  const context = useContext(myContext);
  return (
    <input
      className="slider is-fullwidth"
      step="1"
      min="0"
      max="100"
      value={context.stateSize}
      type="range"
      onChange={(e) => {
        context.setStateSize(e.target.value);
      }}
    />
  );
}
