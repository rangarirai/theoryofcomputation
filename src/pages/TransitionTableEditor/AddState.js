import React from "react";

function AddState({setHandleAddState}) {
  return (
    <span
      className="icon is-large is-clickable	"
      onClick={() => {
        setHandleAddState(true);
      }}
    >
      <i class="fa-solid fa-plus fa-lg"></i>
    </span>
  );
}

export default AddState;
