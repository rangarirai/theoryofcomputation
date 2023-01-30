import React from "react";
import { useContext } from "react";
import { myContext } from "../App";

function DisplayString() {
  const context = useContext(myContext);
  return (
    <div className="is-flex is-justify-content-center">
      <DisplayCharacter character={"?"} value={-10} context={context} />
      {context.string.map((ch, i) => (
        <DisplayCharacter character={ch} key={i} context={context} value={i} />
      ))}
    </div>
  );
}

export default DisplayString;

function DisplayCharacter({ character, value, context }) {
  return (
    <div className="is-flex is-flex-direction-column">
      <span
        className={`icon nk-selected is-large is-clickable nk-sideBarIcon 
          ${context.inputPos === value ? "" : "is-invisible"}`}
      >
        <i className="fa-solid fa-arrow-down-long  fa-lg "></i>
      </span>
      <div
        style={{ border: "solid", padding: "5px" }}
        className="mx-1 is-flex  is-justify-content-center"
      >
        <span>{character}</span>
      </div>
    </div>
  );
}
