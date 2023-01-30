import React from "react";

function Delete({ selected, handleSetSelected }) {
  return (
    <span
      className={`icon is-large is-clickable  ${
        selected === "delete" ? "nk-selected" : ""
      }`}
      onClick={handleSetSelected("delete")}
    >
      <i className="fa-solid fa-trash fa-lg"></i>
    </span>
  );
}

export default Delete;
