import React from "react";

function Drag({ handleSetSelected, selected, drag }) {
  return (
    <span
      className={`icon is-large is-clickable nk-sideBarIcon ${
        selected === "state" ? "nk-selected" : ""
      }`}
      ref={drag}
      onClick={handleSetSelected("state")}
    >
      <i className="fa-regular fa-circle fa-lg"></i>
    </span>
  );
}

export default Drag;
